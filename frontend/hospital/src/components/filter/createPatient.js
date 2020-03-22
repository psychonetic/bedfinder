import React from 'react'
import { withAPI } from '../../utils/withAPI'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio';
import { Button } from '@material-ui/core';
import { LoadingContext } from '../../utils/useLoading';
import { DataContext } from '../../utils/useLoadData';
import { FilterOverlayContext } from '../../utils/useFilterOverlay';

const icons = {
  low_care: require('../../images/LC_orange.png'),
  low_care_plus: require('../../images/LC+_orange.png'),
  high_care: require('../../images/HC_orange.png'),
  high_care_plus: require('../../images/HC+_orange.png'),

}
function PatientButton(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img style={{ marginRight: '10px' }} src={icons[props.care]} width="40" height="40" />
      <div> {props.name} </div>
      <div style={{ flex: 1 }} />
      <Radio checked={props.checked} value={props.care} onChange={e => props.selectfn(props.care)} style={{ justifySelf: 'flex-end' }} />
    </div>
  )
}

const bedTypeMap = {
  low_care: {
    is_low_care: true,
    has_ecmo: false
  },
  high_care: {
    is_high_care: true,
    has_ecmo: false,
  },
  high_care_plus: {
    is_high_care: true,
    has_ecmo: true
  },
  low_care_plus: {
    is_low_care: true,
    has_ecmo: true
  }
}

export default function CreatePatient() {
  const api = withAPI()
  const { reloadfn, hid } = React.useContext(DataContext)
  const { close } = React.useContext(FilterOverlayContext)

  const loading = React.useContext(LoadingContext)
  const [selected, setSelected] = React.useState('low_care')
  async function free() {
    try {
      loading.start()
      await api.releaseBed(bedTypeMap[selected], hid).then(async _ => {
        await reloadfn(hid)
        close()
        return _
      })
    } catch (error) {
      console.log(error);
    } finally {
      loading.stop()
    }
  }
  async function block() {
    console.log(hid)
    try {
      loading.start()
      await api.blockBed(bedTypeMap[selected], hid).then(async _ => {
        await reloadfn(hid)
        close()
        return _
      })
    } catch (error) {
      console.log(error);
    } finally {
      loading.stop()
    }
  }
  return (
    <Container>
      <div>
        <Typography variant={'h6'} >Benötigtes Bett:</Typography>

        <div style={{ width: '100%' }}>
          <PatientButton checked={selected === 'low_care'} name="Low Care" selectfn={e => setSelected(e)} care="low_care" />
          <PatientButton checked={selected === 'low_care_plus'} name="Low Care+" selectfn={e => setSelected(e)} care="low_care_plus" />
          <PatientButton checked={selected === 'high_care'} name="High Care" selectfn={e => setSelected(e)} care="high_care" />
          <PatientButton checked={selected === 'high_care_plus'} name="High Care+" selectfn={e => setSelected(e)} care="high_care_plus" />
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button onClick={block} variant={'contained'} color="secondary">Bett blockieren</Button>
          <Button onClick={free} variant={'contained'} color="secondary">Bett freigeben</Button>

        </div>
      </div>

    </Container>
  )
}
