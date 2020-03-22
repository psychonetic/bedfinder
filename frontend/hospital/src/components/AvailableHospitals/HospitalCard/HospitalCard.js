import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'

import Typography from '@material-ui/core/Typography';
import { Button, FormHelperText } from '@material-ui/core';
import LCDisabled from '../../../icons/LC_grau.svg';
import LCEnabled from '../../../icons/LC_orange.svg';
import HCEnabled from '../../../icons/HC_orange.svg';
import HCDisabled from '../../../icons/HC_grau.svg';
import LCEcmoEnabled from '../../../icons/LCEcmo_orange.svg';
import LCEcmoDisabled from '../../../icons/LCEcmo_grau.svg';
import HCEcmoEnabled from '../../../icons/HCEcmo_orange.svg';
import HCEcmoDisabled from '../../../icons/HCEcmo_grau.svg';
import Hospital from '../../../icons/Krankenhaus.svg';
import CardContent from "@material-ui/core/CardContent"
import Box from "@material-ui/core/Box"



const styles = theme => (
    {
        card: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '3vh',
            boxShadow: theme.shadows[2]
        },
        cardTitle: {
          color: theme.palette.secondary.grey,
          fontWeight: '600',
        },
        cardDescription: {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '0.5rem',
        },
        capacity: {
          paddingTop: '1.25rem',
        },
        capacityItems: {
          paddingTop: '0.5rem',
          width: '100%',
        },
        capacityItem: {
          marginRight: '0.25rem',
        },
        logo: {
          marginRight: '1rem'
        },
        address: {
          fontSize: '0.75rem',
          color: theme.palette.secondary.grey,
        },
        wFull: {
          width: '100%',
        },
        distance: {
          paddingTop: '0.5rem',
        },
        distanceText: {
          color: theme.palette.primary.main,
          paddingTop: '0.5rem',
          fontWeight: '600'
        }
    }
)

const HospitalCard = props => {
    const { classes } = props;
    return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="subtitle1" className={classes.cardTitle}>{props.name}</Typography>
            <Box display="flex" className={classes.cardDescription}>
              <Hospital width="35" height="auto" className={classes.logo}/>
              <div className={classes.address}>
                {props.address.street}, {props.address.postal_code} {props.address.city}<br/>
                Telefon: {props.phone}
              </div>
            </Box>

            <Box display="flex" flexDirection="column" className={classes.capacity}>
              <Typography variant="subtitle2" className={classes.wFull}>Kapazität</Typography>
              <div className={classes.capacityItems}>
                {props.info.icu_low_care === 0 ? <LCDisabled width="30" height="auto" className={classes.capacityItem}/> : <LCEnabled width="30" height="auto" className={classes.capacityItem}/> }
                {props.info.icu_high_care === 0 ? <HCDisabled width="30" height="auto" className={classes.capacityItem}/> : <HCEnabled width="30" height="auto" className={classes.capacityItem}/> }
                {props.info.ecmo_icu_low_care === 0 ? <LCEcmoDisabled width="30" height="auto" className={classes.capacityItem}/> : <LCEcmoEnabled width="30" height="auto" className={classes.capacityItem}/> }
                {props.info.ecmo_icu_high_care === 0 ? <HCEcmoDisabled width="30" height="auto" className={classes.capacityItem}/> : <HCEcmoEnabled width="30" height="auto" className={classes.capacityItem}/> }
              </div>
            </Box>

            <Box display="flex" flexDirection="column" className={classes.distance}>
              <Typography variant="subtitle2" className={classes.wFull}>Distanz</Typography>
              {props.hasGeo === true ?
                <div className={classes.distanceText}>{Math.round(props.address.distance * 10) / 10} KM </div>
                : <></>
              }
            </Box>
          </CardContent>
        </Card>
    )
}
  
HospitalCard.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    phone: PropTypes.string,
    hasGeo: PropTypes.bool,
    info: PropTypes.object
};

export default  withStyles(styles)(HospitalCard)


/*<div className={classes.logoWrapper}>
             <Hospital width="50"/>
           </div>
           <div className={classes.rightWrapper}>
               <div>
                   <Typography variant="subtitle1">{props.name}</Typography>
                   <Typography variant="caption">{props.address.street}</Typography>
                   <Typography variant="caption">{props.address.postal_code} {props.address.city}</Typography>
               </div>
               <div>
                 <Typography variant="body1">Kapazität</Typography>
                 {props.info.icu_low_care === 0 ? <LCDisabled width="50"/> : <LCEnabled width="50"/> }
                 {props.info.icu_high_care === 0 ? <HCDisabled width="50"/> : <HCEnabled width="50"/> }
                 {props.info.ecmo_icu_low_care === 0 ? <LCEcmoDisabled width="50"/> : <LCEcmoEnabled width="50"/> }
                 {props.info.ecmo_icu_high_care === 0 ? <HCEcmoDisabled width="50"/> : <HCEcmoEnabled width="50"/> }
               </div>
               <div className={classes.horizontalFlex}>
                 {props.hasGeo === true ?
                   <Typography variant="h6" color="primary" display="inline">{Math.round(props.address.distance * 10) / 10} km entfernt </Typography>
                   : <></>
                 }

                   <Button className={classes.callButton}>Anrufen</Button>
               </div>
           </div>*/
