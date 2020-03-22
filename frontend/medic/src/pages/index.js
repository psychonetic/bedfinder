import React, { useEffect, useContext } from "react"
import withRoot from "../utils/withRoot"
import { withAPI } from "../utils/withAPI"
import { geolocated } from "react-geolocated";
import { LoadingContext } from "../utils/useLoading";
import Filter from "../components/filter/filter";
import AvailableHospitals from "../components/AvailableHospitals/AvailableHospitals";
import { FilterContext } from '../utils/useFilter'

const IndexPage = (props) => {
  const { loading, start, stop } = useContext(LoadingContext)

  const api = withAPI()

  // useEffect(() => {

  //   try {
  //     start()
  //     const data = api.searchHospitals({}).then((res) => {
  //       console.log(data);
  //     })
  //   } catch (error) {

  //   } finally {
  //     // stop()
  //   }

  // }, [])

  function selectFilter(filterKey) {
    switch (filterKey) {
      case 'location':
        return;
      case 'bed-type':
        return;
      case 'perimeter':
        return;
      default:
        return null;
    }
  }

  const filterContext = React.useContext(FilterContext)
  let hospitals = filterContext.hospitals


  useEffect(() => {
    let didCancel = false

    if (!props.coords)
      return

    const severityFilters = {
      icu_low_care: { name: "icu_low_care", active: false },
      ecmo_icu_low_care: { name: "ecmo_icu_low_care", active: false },
      icu_high_care: { name: "icu_high_care", active: false },
      ecmo_icu_high_care: { name: "ecmo_icu_high_care", active: false },
    }

    filterContext.setApiFilters({ lat: props.coords.latitude, lng: props.coords.longitude })
    filterContext.setSeverityFilters(severityFilters)   
    filterContext.filterFn()

    return () => {
      didCancel = true
    }
  }, [props.coords])

  if (!props.isGeolocationAvailable) {
    return null
  }
  return (
    <>
      {/* <Filter></Filter>
      <AvailableHospitals hospitals={hospitals} /> */}


      {props.coords &&
        <>
          <div>{props.coords.latitude} lat</div>
          <div>{props.coords.longitude} long</div>

        </>

      }
    </>
  )
}

export default withRoot(geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(IndexPage))
