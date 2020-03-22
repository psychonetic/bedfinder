/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import { withStyles } from "@material-ui/core/styles"
import Header from "./header";
import Loading from "./loading";
import { LoadingContext } from "../utils/useLoading";

const styles = theme => ({
  container: {
    marginTop: '150px',
    overflowY: 'auto',
  }
});
const Layout = ({ children, classes }) => {
  const { loading } = React.useContext(LoadingContext)


  return (
    <>
      <CssBaseline />
      {loading && <Loading />}
      <Header />
      <Divider />
      <Container maxWidth="sm" className={classes.container}>
        {children}
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Layout)
