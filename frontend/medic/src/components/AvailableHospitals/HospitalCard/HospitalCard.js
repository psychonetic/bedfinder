import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography';
import { Button, FormHelperText, CardActions } from '@material-ui/core';
import { withPusher } from '../../../utils/withPusher';

import CapacityMarkers from './CapacityMarkers/CapacityMarkers';
import HospitalImage from '../../../images/Krankenhaus.png'

const styles = theme => (
    {
        hospitalCard: {
            height: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            padding: '3vh',
            margin: '2vh 0vh',
            boxShadow: theme.shadows[2]
        },
        upperWrapper: {
            width: '75%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        hospitalImage: {
            height: '50px',
            width: '50px',
            marginRight: '20px'
        },
        lowerWrapper: {
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginLeft: '75px'
        },
        horizontalFlex: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 'auto',
            fontSize: '15px',
            lineHeight: '15px'
        },
        typographyDiv: {
            height: 'auto',
            width: '100%',
            fontSize: '10px',
            overflow: 'hidden'
        },
        hospitalName: {
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'block'
        },
        hospitalDescription: {
            fontSize: '12px'
        },
        hospitalDistance: {
            color: 'rgb(162,17,96)'
        },
        availability: {
            marginLeft: '20px'
        },
        address: {
            height: 'auto',
            margin: '2vh 0vh'
        },
        callButton: {
            backgroundColor: 'rgb(162,17,96)',
            color: 'white',
            textShadow: '1px 1px 1px black'
        }
    }
)

const HospitalCard = props => {
    const { classes, pusher } = props;
    const [info, setInfo] = React.useState(props.hospital.info)
    const channel = pusher.subscribe(`hospital${props.hospital.id}`)
    channel.bind('bed-update', (data) => {
        setInfo(data)
    })
    return (
        <Card className={classes.hospitalCard}>
            <div className={classes.upperWrapper}>
                <img className={classes.hospitalImage} src={HospitalImage}></img>
                <div className={classes.typographyDiv}>
                    <span className={classes.hospitalName}>{props.hospital.name}</span>
                    <span className={classes.hospitalDescription}>{props.hospital.description}</span>
                    <div className={classes.address}>
                        <div>{props.hospital.address.street}</div>
                        <div>{props.hospital.address.postal_code} {props.hospital.address.city}</div>
                    </div>
                </div>

            </div>

            <div className={classes.lowerWrapper}>
                <CapacityMarkers className={classes.availability} availability={info} />
                <div className={classes.horizontalFlex}>
                    <span className={classes.hospitalDistance}>Distanz: {Math.round(props.hospital.address.distance * 10) / 10}km</span>
                    <Button onClick={e => window.location.href = `tel://${props.hospital.contact.phone_1}`} className={classes.callButton}>Anrufen</Button>
                </div>
            </div>
        </Card>
    )
}

HospitalCard.propTypes = {
    classes: PropTypes.object.isRequired,
    hospital: PropTypes.object.isRequired
};

export default withStyles(styles)(withPusher(HospitalCard))