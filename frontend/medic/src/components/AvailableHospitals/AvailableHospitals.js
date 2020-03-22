import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';

import HospitalCard from './HospitalCard/HospitalCard'
import HospitalImage from '../../images/Krankenhaus.png'
const styles = theme => (
    {
        hospitalList: {
            justifyContent: 'start',
            alignItems: 'center',
            flexDirection: 'column'
        }
    }
)

const AvailableHospitals = props => {
    const { classes } = props;
    let availableHospitals = [];

    for ( const hospital in props.hospitals ) {
        availableHospitals.push(
            <HospitalCard
                hospital={props.hospitals[hospital]}
                key={props.hospitals[hospital].name + props.hospitals[hospital].address}
            />
        )
    }

    return (
        <div className={classes.hospitalList}>
            <h2>Krankenhäuser in der Nähe</h2>
            {availableHospitals}
        </div>
    )
}
  
AvailableHospitals.propTypes = {
    classes: PropTypes.object.isRequired,
    hospitals: PropTypes.array.isRequired
};

export default  withStyles(styles)(AvailableHospitals)