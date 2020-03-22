import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';

import HospitalCard from './HospitalCard/HospitalCard'

const styles = theme => {

}

const AvailableHospitals = props => {
    const { classes } = props;
    let availableHospitals = [];

    for ( const hospital in props.hospitals ) {
        availableHospitals.push(
            <HospitalCard 
                name={props.hospitals[hospital].name}
                distance={props.hospitals[hospital].distance}
                address={props.hospitals[hospital].address}
                key={props.hospitals[hospital].name + props.hospitals[hospital].address}
            />
        )
    }

    return (
        <List>
            {availableHospitals}
        </List>
    )
}
  
AvailableHospitals.propTypes = {
    classes: PropTypes.object.isRequired,
    hospitals: PropTypes.array.isRequired
};

export default  withStyles(styles)(AvailableHospitals)