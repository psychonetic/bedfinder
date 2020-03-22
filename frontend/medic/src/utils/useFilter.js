import React from 'react'
import { withAPI } from "../utils/withAPI"
import { LoadingContext } from './useLoading'

export const FilterContext = React.createContext({ hospitals: [], filterFn: null })

const api = withAPI()

function applySeverityFilters(severityFilters, hospitals) {
  
  return hospitals.filter((hospital) => {
    
    for(var filterName in severityFilters) {
      
      let filter = severityFilters[filterName]
      
      if(!filter.active)
        continue

      if(hospital.info[filterName] === 0){
        return false
      }
      
    }
    return true
  })
}

export default function FilterOverlayProvider({ children }) {
  const loading = React.useContext(LoadingContext)
  const [hospitals, setHospitals] = React.useState([])
  const [apiFilters, setApiFilters] = React.useState({})
  const [severityFilters, setSeverityFilters] = React.useState({
    icu_low_care: { name: "icu_low_care", active: false },
    ecmo_icu_low_care: { name: "ecmo_icu_low_care", active: false },
    icu_high_care: { name: "icu_high_care", active: false },
    ecmo_icu_high_care: { name: "ecmo_icu_high_care", active: false },})
  
  async function filterFn(apiF) {
    try {

      loading.start()
      console.log(apiFilters)
      let hospitals = await api.searchHospitals(apiF)
      
      hospitals = hospitals.data.data

      if (severityFilters)
        hospitals = applySeverityFilters(severityFilters, hospitals)


      setHospitals(hospitals)
    } catch (error) {
      console.log(error);
    } finally {
      loading.stop()
    }

  }

  return (
    <FilterContext.Provider value={{
      hospitals,
      severityFilters,
      setApiFilters,
      setSeverityFilters,
      setHospitals,
      filterFn
    }}>{children}</FilterContext.Provider>
  )
}
