import React, { useContext, useEffect } from "react"
import withRoot from "./utils/withRoot"

import FilterOverlay from "./components/filter/overlay"
import { geolocated } from "react-geolocated"
import { Container, Typography } from "@material-ui/core"
import BedCard from "./components/AvailableHospitals/HospitalCard/BedCard"
import { SwitchFilterComponent } from "./utils/filterComponentSwitch"
import { DataContext } from "./utils/useLoadData"
import { withAPI } from "./utils/withAPI"
import { LoadingContext } from "./utils/useLoading"
import { FilterComponentContext } from './utils/useFilterComponent'
const IndexPage = (props) => {
  const { data, reloadfn } = useContext(DataContext)
  const { currentComponent } = useContext(FilterComponentContext)
  const { loading, start, stop } = React.useContext(LoadingContext)

  useEffect(() => {
    let didCancel = false

    const api = withAPI();

    async function fetch(coords) {

      try {
        const res = await api.searchHospitals({ lat: coords.latitude, lng: coords.longitude });
        if (res.data.data.length > 0) {
          return res.data.data[0].id;
        }
      } catch (e) {
        console.error(e);
      } finally {

      }

      return -1;
    }

    if (props.coords) {
      start()
      fetch(props.coords).then((id) => {
        if (id && id !== -1) {
          reloadfn(id)
        }
        stop();
      })
    }

    return () => {
      didCancel = true
    }
  }, [props.coords])

  if (!props.isGeolocationAvailable) {
    return null
  }

  return (
    <>
      <FilterOverlay>
        <SwitchFilterComponent comp={currentComponent}></SwitchFilterComponent>
      </FilterOverlay>
      {
        data !== null ? <Container maxWidth={'sm'}>
          <Typography style={{marginBottom: '1rem'}} variant={'h6'}>{data.name}</Typography>
          <BedCard type="lc" count={data.info.icu_low_care} />
          <BedCard type="lcecmo" count={data.info.ecmo_icu_low_care} />
          <BedCard type="hc" count={data.info.icu_high_care} />
          <BedCard type="hcecmo" count={data.info.ecmo_icu_high_care} />
        </Container> : <></>
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
