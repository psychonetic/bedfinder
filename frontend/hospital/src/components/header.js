import React from "react"

import logo from "../images/Logo_v1.1.png"
import logoWVV from "../images/Logo_Projekt_02.png"


import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { FilterOverlayContext } from "../utils/useFilterOverlay"
import { Container } from "@material-ui/core"
import { FilterComponentContext } from '../utils/useFilterComponent'
import classes from './header.module.css';
import MenuItem from "./menu/menuItem"



const styles = theme => ({
  header: {
    position: 'fixed',
    background: 'white',
    width: '100vw',
    maxHeight: '140px',
    display: 'flex',
    zIndex: 1000,
    justifyContent: 'center',
    top: 0,
    left: 0,
  },
  innerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flex: '1 1 0px',
  },
  subHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px',
    height: '70px',
  },
  headline: {
    justifySelf: 'center',
    textAlign: 'center',
  }
})
const Header = ({ classes }) => {
  const { setCurrentComponent } = React.useContext(FilterComponentContext)
  const { open, active } = React.useContext(FilterOverlayContext)

  function openFilter(key) {
    setCurrentComponent(key)
  }

  return (
    <header
      className={classes.header}
    >
      <Container maxWidth={'sm'}>

        <div
          className={classes.innerHeader}
        >
          <div className={classes.item}>
            <img width="60" height="auto" src={logo} />
          </div>
          <div className={classes.item}>
            <Typography className={classes.headline} component="h5" variant="h5" >Bedfinder</Typography>
          </div>
          <div className={classes.item}>
            <img width="120" height="auto" src={logoWVV} />
          </div>
        </div>
        <div onClick={open} className={classes.subHeader}>
          <MenuItem clickfn={e => openFilter('beds')} text="Betten verwalten" />
          <MenuItem clickfn={e => openFilter('patients')} text="Patienten hinzufügen" />
        </div>
      </Container>

    </header>
  )
}



export default withStyles(styles)(Header)
