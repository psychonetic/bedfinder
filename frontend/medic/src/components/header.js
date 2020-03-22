import PropTypes from "prop-types"
import React from "react"
import MenuItem from './menu/menuitem'

import logo from '../images/Logo_v1.1.png';
import hc_icon from '../images/hc_icon.png';
import location_icon from '../images/location_icon.png';
import umkreis_icon from '../images/umkreis_icon.png';
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles';
import { FilterOverlayContext } from "../utils/useFilterOverlay";
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
  header: {
    // backgroundColor: theme.palette.common.white
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
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
  subHeaderItem: {
    alignItems: 'center'
  },
  
  headline: {
    justifySelf: 'left',
    textAlign: 'left',
  }
})
const Header = ({ classes }) => {
  const { open, active } = React.useContext(FilterOverlayContext)

  return (
    <header
      className={classes.header}
    >
      <Container maxWidth={'sm'}>
        <div className={classes.innerHeader} >
          <div className={classes.item}>
            <img width="80" src={logo} />
          </div>
          <div className={classes.item}>
            <Typography className={classes.headline} component="h5" variant="h5" >Bedfinder</Typography>
          </div>

        </div>
        <div onClick={open} className={classes.subHeader}>
          <div className={classes.subHeaderItem}>
            <MenuItem image={hc_icon} text="Location" />
          </div>
          <div className={classes.subHeaderItem}>
            <MenuItem image={location_icon} text="Schweregrad" />
          </div>
          <div className={classes.subHeaderItem}>
            <MenuItem image={umkreis_icon} text="Umkreis" />
          </div>
          
        </div>
      </Container>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default withStyles(styles)(Header)
