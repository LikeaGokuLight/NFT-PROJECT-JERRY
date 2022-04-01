import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const NftNews = () => {
  return (
    <Stack spacing={2} sx={{width: 300}}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={sortByList.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo"/>}
      />
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={sortByList.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const sortByList = [
  {id: 1, title: 'Name: A-Z'},
  {id: 2, title: 'Name: Z-A'},
  {id: 3, title: 'Price: High to low'},
  {id: 4, title: 'Price: Low to high'},
  {id: 5, title: 'Rarity: Rank High'},
  {id: 6, title: 'Rarity: Rank Low'},
];

export default NftNews;