import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import logo_overlay from '../../images/Logo_v1.2.png';
import { FilterOverlayContext } from '../../utils/useFilterOverlay'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Icon } from '@material-ui/core';

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
    paddingBottom: '20px',
    
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
        <img width="80" src={logo_overlay} /> 
        <IconButton size={'small'} color="inherit" onClick={close} >
          <CloseIcon />
        </IconButton>
      </div>

      <div>
        {children}
      </div>
    </Container>
  )
}

export default withStyles(styles)(FilterOverlay)