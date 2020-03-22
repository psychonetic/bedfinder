import React from 'react'
import { withAPI } from '../../utils/withAPI'
import Container from '@material-ui/core/Container'
import { Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { ReactComponent as BedEmptyIcon } from '../../icons/bed-empty_weiss.svg'
import { ReactComponent as LCEnabled } from '../../icons/LC_orange.svg'
import { ReactComponent as HCEnabled } from '../../icons/HC_orange.svg'
import { Button } from '@material-ui/core';
import { LoadingContext } from '../../utils/useLoading'
import { DataContext } from '../../utils/useLoadData'
import { FilterOverlayContext } from '../../utils/useFilterOverlay';

const icons = {
  low_care: require('../../images/LC_orange.png'),
  high_care: require('../../images/HC_orange.png'),
}


function BedInput(props) {
  return (
    <div style={{ width: '100%', marginTop: '50px' }}>
      <Typography variant={'h4'}>{props.care} Care</Typography>
      <div>
        {props.care === 'Low' ? (
          <LCEnabled height="35" width="35" />
        ) : (
          <HCEnabled height="35" width="35" />
        )} 
        <div style={{ display: 'inline-block'}}>Schweregrad</div>      
      </div>
      <TextField id="postal-code" variant="outlined" color="secondary" fullWidth placeholder="Anzahl Betten insgesamt" margin="normal" />
      <TextField id="postal-code" variant="outlined" color="secondary" fullWidth placeholder="Anzahl belegter Betten" margin="normal"/>
  </div>
  )
}



export default function ManageBeds() {
  const api = withAPI()

  const { reloadfn, hid } = React.useContext(DataContext)
  const { close } = React.useContext(FilterOverlayContext)
  const loading = React.useContext(LoadingContext)

  async function createBeds() {
    try {
      loading.start()
      await api.releaseBed({}, hid).then(async _ => {
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
        <div style={{ textAlign: 'center'}}>
        <BedEmptyIcon height="50" width="50" />
        <Typography variant={'h6'} >Betten verwalten:</Typography>
        </div>
        <BedInput care={'Low'} />
        <Button onClick={createBeds} color="secondary" variant={'contained'} fullWidth>Speichern</Button>
        <BedInput care={'High'}/>
      </div>

    </Container>
  )
}
