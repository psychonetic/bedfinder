import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FilterOverlayContext } from '../../utils/useFilterOverlay'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';

import logo from '../../images/Logo_v1.3.png'

const styles = theme => ({
  overlay: {
    position: 'fixed',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1001,
    width: '100%',
    color: 'white',
    paddingTop: '10px',
    paddingBottom: '10px',
    
    margin: '0 auto',
    minHeight: '30%',
    backgroundColor: theme.palette.primary.main
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})
const FilterOverlay = ({ classes, children }) => {
  const { active, close } = React.useContext(FilterOverlayContext);
  if (!active) {
    return null;
  }
  return (
    <Container maxWidth={'sm'} className={classes.overlay}>
      <div className={classes.closeButton}>
        <img src={logo} width="60"/>
        <IconButton size={'small'} onClick={close} color={'inherit'} className={classes.closeButton} >
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </Container>
  )
}

export default withStyles(styles)(FilterOverlay)