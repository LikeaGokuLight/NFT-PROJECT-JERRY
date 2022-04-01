import {createTheme} from "@mui/material/styles";

const mainPurple = `#8A39E1`

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