import React from 'react'
import Layout from '../components/layout'
import theme from '../utils/theme';
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles';
import { LoadingProvider } from './useLoading';
import FilterOverlayProvider from './useFilterOverlay';
import FilterProvider from './useFilter';


export default function withRoot(Component) {
  return class extends React.Component {
    render() {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LoadingProvider>
            <FilterOverlayProvider>
              <FilterProvider>
                <Layout>
                  <Component {...this.props} />
                </Layout>
              </FilterProvider>
            </FilterOverlayProvider>

          </LoadingProvider>

        </ThemeProvider>

      )
    }
  }
}
