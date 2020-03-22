import React from 'react'
import withOverlay from "../../utils/withOverlay"
import FilerList from './filterlist/filterlist'
import Typography from "@material-ui/core/Typography"
import Container from '@material-ui/core/Container'
import hc_logo from '../../images/HC_grau.png'

const styles = theme => ({})

const Filter = props => {
    const { classes } = props;
    return (
        <Container>
            <div>
                {/* <img width="40" src={hc_logo} ></img> */}
                <Typography variant={'h6'} >Schweregrad</Typography>
                <FilerList></FilerList>
            </div>
        </Container>
    )
}

export default withOverlay(Filter)