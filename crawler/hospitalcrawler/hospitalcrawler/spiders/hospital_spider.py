import scrapy
import re
from scrapy.http import FormRequest
from scrapy.http import JsonRequest
import logging
import json

class HospitalSpider(scrapy.Spider):
    name = "hospital"

    def __init__(self, api_key=None, fetch_all=False, *args, **kwargs):
        # List which specify which data we want to request to the API
        # fields = ['price_level', 'rating', 'types', 'name', 'formatted_address', 'geometry', 'place_id', 'photos']
        fields = ['name', 'geometry']

        # create a query for API
        self.basic_query = f'fields={",".join(fields)}&key={api_key}'        
        self.fetch_fall = fetch_all

    def start_requests(self):
        if self.fetch_fall:
            yield FormRequest('https://divi.de/register/intensivregister?view=items',
                                formdata={'list[fullordering]':'a.title+ASC','list[limit]': '0', 'list[limit]': '0', 'limitstart': '0'},
                            )
        else:
            yield scrapy.Request(url='https://divi.de/register/intensivregister', callback=self.parse)

    def parse(self, response):
        for hospital in response.css('table#dataList tbody tr'):
            data = {
                'contact-text': self.removeWhiteSpace(self.trySafeIndexAccess(hospital.xpath('./td[2]/text()').extract(), 0)),
                'contact-website': self.trySafeIndexAccess(hospital.xpath('./td[2]//a/@href').extract(), 0),
                'region-abbreviation': self.translateBundesland(self.removeWhiteSpace(hospital.xpath('./td[3]/text()').extract()[0])),
                'icu-low-care': self.translateStatus(hospital.xpath('./td[4]//span/@class').extract()[0]),
                'icu-high-care': self.translateStatus(hospital.xpath('./td[5]//span/@class').extract()[0]),
                'ecmo': self.translateStatus(hospital.xpath('./td[6]//span/@class').extract()[0]),
                'date-of-information': self.removeWhiteSpace(hospital.xpath('./td[7]/text()').extract()[0]),
                'time-of-information': self.removeWhiteSpace(hospital.xpath('./td[7]/text()').extract()[1]),
            }
            
            data['hospital-name'] = self.removeWhiteSpace(hospital.xpath('./td[1]/text()').extract()[0])

            additional_hopsital_data = hospital.xpath('./td[1]/small/text()').extract()
            if len(additional_hopsital_data) == 2:
                data['hospital-street'] = self.removeWhiteSpace(additional_hopsital_data[0])
                splitted_data = additional_hopsital_data[1].split()
                data['hospital-postalcode'] = splitted_data.pop(0)
                data['hospital-city'] = " ".join(splitted_data)

            if len(additional_hopsital_data) == 3:
                data['hospital-department'] = additional_hopsital_data[0]
                data['hospital-street'] = self.removeWhiteSpace(additional_hopsital_data[1])
                splitted_data = additional_hopsital_data[2].split()
                data['hospital-postalcode'] = splitted_data.pop(0)
                data['hospital-city'] = " ".join(splitted_data)

            self.query = f'{self.basic_query}&inputtype=textquery&input={data["hospital-street"]} {data["hospital-postalcode"]} {data["hospital-city"]}'
            yield JsonRequest(url=f'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?{self.query}', cb_kwargs=dict(hospital=data), callback=self.parseGoogleResponse)
    
    def parseGoogleResponse(self, response, hospital):
            returned_data = json.loads(response.body)
            if returned_data['status'] == 'OK':
                # Populate items using places data
                for place in returned_data['candidates']:
                    if 'geometry' in place:
                        hospital['location'] = place['geometry']['location']
            yield hospital
            
    def removeWhiteSpace(self, string):
        return re.sub('\s+',' ', string).strip()


    def translateBundesland(self, string):
        switcher = {
            "BW":"Baden-Württemberg",
            "BY":"Bayern",
            "BE":"Berlin",
            "BB":"Brandenburg",
            "HB":"Bremen",
            "HH":"Hamburg",
            "HE":"Hessen",
            "MV":"Mecklenburg-Vorpommern",
            "NI":"Niedersachsen",
            "NRW":"Nordrhein-Westfalen",
            "RP":"Rheinland-Pfalz",
            "SL":"Saarland",
            "SN":"Sachsen",
            "ST":"Sachsen-Anhalt",
            "SH":"Schleswig-Holstein",
            "TH":"Thüringen"
        }
        return self.trySafeIndexAccess(switcher, string)

    def translateStatus(self, string):
        switcher = {
            "hr-icon-unavailable": "0",
            "hr-icon-green":"1",
            "hr-icon-yellow":"2",
            "hr-icon-red": "3"
        }
        return switcher[string]

    def trySafeIndexAccess(self, array, index):
        try:
            return array[index]
        except (IndexError, KeyError):
            return ''