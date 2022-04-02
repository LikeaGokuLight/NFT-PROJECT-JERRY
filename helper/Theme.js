import {createTheme} from "@mui/material/styles";

const mainPurple = `#ff2dbc`

const Theme = createTheme({
  palette: {
    common: {
      purple: `${mainPurple}`
    },
    primary: {
      main: `${mainPurple}`
    }
  },


});

export default Theme;