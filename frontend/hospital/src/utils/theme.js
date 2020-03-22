import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    background: 'white',
    primary: {
      main: '#4492a5'
    },
    secondary: {
      main: "#94265f",
      grey: '#7f7f7f',
      orange: '#f0522e'
    },
  },
  status: {
    danger: 'orange',
  },
});
