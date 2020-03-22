import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
  },
  text: {
    color: "#a41161",
    fontWeight: "bold"
  },
  image: {
      display: "block",
      marginLeft: "20px"
  }
})
function MenuItem({ image, classes, text, clickfn }) {
  return (
    
    <ButtonBase onClick={clickfn} centerRipple className={classes.menuItem}>
        <img className={classes.image} src={image} ></img>
        <div className={classes.text}>{text}</div>
    </ButtonBase>

  )
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
}

export default withStyles(styles)(MenuItem)

