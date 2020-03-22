# Hospital Crawler

This Crawler fetches hospitals from the website: https://divi.de/register/intensivregister

## Data to be fetched

This is how the crawled data will look like:
```
[
  {
    "hospital-name": "Kliniken des Landkreises Neumarkt i.d.OPf. / Klinikum Neumarkt",
    "hospital-department": "Klinik f\u00fcr An\u00e4sthesiologie und Intensivmedizin",
    "hospital-street": "N\u00fcrnberger Stra\u00dfe 5",
    "hospital-postalcode-city": "92318 Neumarkt i.d.OPf.",
    "contact-text": "Intensivstation 1A",
    "contact-website": "https://www.klinikum-neumarkt.de",
    "region-abbreviation": "Bayern",
    "icu-low-care": "3",
    "icu-high-care": "1",
    "ecmo": "0",
    "date-of-information": "21.03.2020",
    "time-of-information": "15:03",
    "location": { "lat": 49.2832143, "lng": 11.4552742 }
  },
  ...
]
```

### Prerequisites

* Python version 3.5 or greater
* Scrapy 
* API Key for Google Places API

To install scrapy:
```
pip install Scrapy
```

### Usage

Fetch hospital data with 20 rows and save into hospital.json
```
scrapy crawl hospital -o hospital.json -a api_key="<api key>"
```

Fetch all hospital data and save into hospital.json
```
scrapy crawl hospital -o hospital.json -a api_key="<api key>" -a fetch_all="true"
```
