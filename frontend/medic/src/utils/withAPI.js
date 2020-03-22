import { create } from 'axios';

export const API = create({
  baseURL: process.env.API_HOST || 'https://api.olezierau.de/api'
})

function errorHandling(err) {
  // TODO: Error Handling
  return null;
}


export function withAPI() {
  return {
    searchHospitals({ lat, lng, distance, postal_code, city  }) {
      return API.get(`/hospitals`, { params : {lat, lng, distance, postal_code, city, with:"info" }}).catch(errorHandling)
    },
    getHospital(hid) {
      return API.get(`/hospitals/${hid}`).catch(errorHandling)
    }
  }
}

