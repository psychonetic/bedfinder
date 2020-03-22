import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { ReactComponent as LC } from "../../../icons/LC_orange.svg"
import { ReactComponent as HC } from "../../../icons/HC_orange.svg"
import { ReactComponent as LCEcmo } from "../../../icons/LCEcmo_orange.svg"
import { ReactComponent as HCEcmo } from "../../../icons/HCEcmo_orange.svg"
import { ReactComponent as Bed } from "../../../icons/bed-empty_orange.svg"
import CardContent from "@material-ui/core/CardContent"
import Box from "@material-ui/core/Box"
import CircularProgress from "@material-ui/core/CircularProgress"
import { CardHeader } from "@material-ui/core"


const styles = theme => (
  {
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '3vh',
      boxShadow: theme.shadows[2]
    },
    cardTitle: {
      color: theme.palette.secondary.grey,
      fontWeight: '600',
    },
    cardDescription: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      width: '100%'
    },
    capacity: {
      paddingTop: '0.75rem',
      display: 'flex',
    },
    capacityTitle: {
      color: theme.palette.secondary.grey,
      fontWeight: '600',
    },
    capacityContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '5rem',
    },
    capacityCount: {
      color: theme.palette.secondary.orange,
      fontSize: '1rem',
      paddingLeft: '0.5rem',
      paddingTop: '0.25rem'
    },
    logo: {
      marginRight: '1rem'
    },
    description: {
      fontSize: '0.75rem',
      paddingLeft: '1rem',
      color: theme.palette.secondary.grey,
    },
    wFull: {
      width: '100%',
    },
    distance: {
      paddingTop: '0.5rem',
    },
    distanceText: {
      color: theme.palette.primary.main,
      paddingTop: '0.5rem',
      fontWeight: '600'
    },
    update: {
      marginTop: '0.5rem',
    },
    lastChange: {
      paddingLeft: '0.5rem',
      fontSize: '0.75rem'
    }
  }
)

function getDescription(type) {
  switch (type) {
    case 'lc':
      return 'lc';
    case 'lcecmo':
      return 'lcecmo';
    case 'hc':
      return 'hc';
    case 'hcecmo':
      return 'hcecmo';
  }
}

function getTypeText(type) {
  switch (type) {
    case 'lc':
      return 'Low Care';
    case 'lcecmo':
      return 'Low Care Ecmo';
    case 'hc':
      return 'High Care';
    case 'hcecmo':
      return 'High Care Ecmo';
  }
}

const BedCard = props => {
  const { classes } = props;

  const description = getDescription(props.type);
  const category = getTypeText(props.type);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.wFull}>


        <CardHeader subheader={category} title={<Typography variant="subtitle1" className={classes.cardTitle}>Bettkatgorie:</Typography>} dense avatar={
          <>
            {props.type === 'lc' ? <LC width="35" height="auto" /> : <Fragment />}
            {props.type === 'lcecmo' ? <LCEcmo width="35" height="auto" /> : <Fragment />}
            {props.type === 'hc' ? <HC width="35" height="auto" /> : <Fragment />}
            {props.type === 'hcecmo' ? <HCEcmo width="35" height="auto" /> : <Fragment />}
          </>
        }>

        </CardHeader>
        <CardContent>
          <Box display="flex" alignItems="baseline">
            <Typography style={{ marginRight: '20px' }} variant="h3" color="secondary" gutterBottom>
              {props.count}

            </Typography>
            <Bed width="30" height="auto" />
          </Box>


         
        </CardContent>



        <div className={classes.lastChange}>
          Letztes Update:  <br />
                vor 2 Tagen
              </div>
      </CardContent>
    </Card>
  )
}

BedCard.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  count: PropTypes.number,
};

export default withStyles(styles)(BedCard)
