import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
const styles = theme => ({
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
  },
  text: {
    display: 'block'
  }
})
function MenuItem({ image, classes, text, clickfn }) {
  return (
    <ButtonBase style={{ display: 'block' }} onClick={clickfn} centerRipple className={classes.menuItem}>
      <div className={classes.text}>
        <PersonAddIcon size={'large'} />
        <div>{text}</div>
      </div>
    </ButtonBase>
  )
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
}

export default withStyles(styles)(MenuItem)

