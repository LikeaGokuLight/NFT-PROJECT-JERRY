import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";


const LinearIndeterminate = () => {
  return (
    <Box sx={{width: '100%'}}>
      <LinearProgress/>
      <LinearProgress/>
      <LinearProgress/>
    </Box>
  );
}

export default LinearIndeterminate;