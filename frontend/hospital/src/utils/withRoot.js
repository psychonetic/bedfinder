import React from 'react'
import Layout from '../components/layout'
import theme from '../utils/theme';
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles';
import { LoadingProvider } from './useLoading';
import FilterOverlayProvider from './useFilterOverlay';
import { DataProvider } from './useLoadData';
import FilterComponentProvider from './useFilterComponent';



export default function withRoot(Component) {
  return class extends React.Component {
    render() {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LoadingProvider>
            <FilterOverlayProvider>
              <FilterComponentProvider>
                <DataProvider>
                  <Layout>
                    <Component {...this.props} />
                  </Layout>
                </DataProvider>
              </FilterComponentProvider>
            </FilterOverlayProvider>
          </LoadingProvider>
        </ThemeProvider>

      )
    }
  }
}
