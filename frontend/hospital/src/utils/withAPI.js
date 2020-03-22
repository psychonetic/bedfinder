import { create } from 'axios';

export const API = create({
  baseURL: process.env.GATSBY_API_URL || 'https://api.olezierau.de/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
})


export function withAPI() {
  return {
    searchHospitals({ lat, lng, distance, postal_code, city }) {
      return API.get(`/hospitals`, {params: { lat, lng, distance, postal_code, city, with: 'info' }});
    },
    getHospital(hid) {
      return API.get(`/hospitals/${hid}`);
    },
    getHospitalInfo(hid) {
      return API.get(`/hospitals/${hid}/beds/info`);
    },
    blockBed(type, hid) {
      return API.patch(`/hospitals/${hid || '1'}/beds/reserve`, type)
    },
    releaseBed(type, hid) {
      return API.patch(`/hospitals/${hid || '1'}/beds/free`, type)
    },
    createBedBatch(type, hid) {
      return API.post(`/hospitals/${hid || '1'}/beds/btach`, type)
    }
  }
}

