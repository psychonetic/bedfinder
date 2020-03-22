import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import CapacityMarker from './CapacityMarker/CapacityMarker'

import lcImageOrange from '../../../../images/HC-LC/LC_orange.png'
import lcImageGray from '../../../../images/HC-LC/LC_grau.png'
import hcImageOrange from '../../../../images/HC-LC/HC_orange.png'
import hcImageGray from '../../../../images/HC-LC/HC_grau.png'
import lcPlusImageOrange from '../../../../images/HC-LC/LC+_orange.png'
import lcPlusImageGray from '../../../../images/HC-LC/LC+_grau.png'
import hcPlusImageOrange from '../../../../images/HC-LC/HC+_orange.png'
import hcPlusImageGray from '../../../../images/HC-LC/HC+_grau.png'

const styles = theme => (
    {   
        circlesContainer: {
            display: 'flex',
            flexStart: 'start',
            margin: '10px 0px'
        }
    }
)

const CapacityMarkers = props => {
    const { classes } = props;
    
    
    let lcActive
    let lcImage
    let hcActive
    let hcImage
    let lcPlusActive
    let lcPlusImage
    let hcPlusActive
    let hcPlusImage

    if (props.availability.icu_low_care > 0) {
        lcActive = true
        lcImage = lcImageOrange
    } else {
        lcActive = false
        lcImage = lcImageGray
    }

    if (props.availability.icu_high_care > 0) {
        hcActive = true
        hcImage = hcImageOrange
    } else {
        hcActive = false
        hcImage = hcImageGray
    }
    
    if (props.availability.ecmo_icu_low_care > 0) {
        lcPlusActive = true
        lcPlusImage = lcPlusImageOrange
    } else {
        lcPlusActive = false
        lcPlusImage = lcPlusImageGray
    }

    if (props.availability.ecmo_icu_high_care > 0) {
        hcPlusActive = true
        hcPlusImage = hcPlusImageOrange
    } else {
        hcPlusActive = false
        hcPlusImage = hcPlusImageGray
    }

    return (
        <div className={classes.circlesContainer}>
            <CapacityMarker src={lcImage} active={lcActive}/>
            <CapacityMarker src={hcImage} active={hcActive}/>
            <CapacityMarker src={lcPlusImage} active={lcPlusActive}/>
            <CapacityMarker src={hcPlusImage} active={hcPlusActive}/>
        </div>
    )
}
  
CapacityMarkers.propTypes = {
    classes: PropTypes.object.isRequired,
    availability: PropTypes.object.isRequired
};

export default  withStyles(styles)(CapacityMarkers)