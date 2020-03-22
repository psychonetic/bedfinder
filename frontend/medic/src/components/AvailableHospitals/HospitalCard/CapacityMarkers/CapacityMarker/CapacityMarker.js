import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => (
    {   
        image: {
            height: '50px',
            width: '50px 5px 0px'
        }
    }
)

const CapacityMarker = props => {
    const { classes } = props;
    return (
        <img className={classes.image} src={props.src}></img>
    )
}
  
CapacityMarker.propTypes = {
    classes: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired
};

export default  withStyles(styles)(CapacityMarker)