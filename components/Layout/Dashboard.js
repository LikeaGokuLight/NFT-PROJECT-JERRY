import {useState, useEffect} from "react";
import Link from 'next/link';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CampaignIcon from '@mui/icons-material/Campaign';
import StairsIcon from '@mui/icons-material/Stairs';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TwitterIcon from '@mui/icons-material/Twitter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import {Autocomplete, Collapse, ListItem, Stack, TextField} from "@mui/material";
import Theme from "../../helper/Theme";
import {ThemeProvider} from "@emotion/react";
import {useRouter} from "next/router";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {
  sortByNameAZ, sortByNameZA,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
  sortByRarityRankHighToLow,
  sortByRarityRankLowToHigh
} from "../../helper/sort";
import axios from "axios";


const drawerWidth = 280;

// OPEN
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#15141d',
});

// CLOSE
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#15141d',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// HEADER
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// LINKS
const NFTCOLLECTIONS = `/nft-collections`;
const NFTDROPSCALENDAR = `/nft-drop-calendar`;
const NFTNEWS = `/nft-news`;
const GETLISTED = `/get-listed`;
const TWITTER = `https://twitter.com/RaritySniperNFT`;
const DISCORD = `https://discord.com/invite/raritysniper`;


const getLinks = (text) => {
  if (text === 'NFT COLLECTIONS') return NFTCOLLECTIONS;
  if (text === 'NFT DROP CALENDAR') return NFTDROPSCALENDAR;
  if (text === 'NFT NEWS') return NFTNEWS;
  if (text === 'GET LISTED') return GETLISTED;
}

// ICONS
const getIcons = (text) => {
  if (text === 'NFT COLLECTIONS') return <BookIcon/>;
  if (text === 'NFT DROP CALENDAR') return <CalendarMonthIcon/>;
  if (text === 'NFT NEWS') return <CampaignIcon/>;
  if (text === 'GET LISTED') return <ListAltIcon/>;
}

// SOCIAL LINKS
const getSocialLinks = (text) => {
  if (text === 'TWITTER || 406K') return TWITTER;
  if (text === 'DISCORD || 126K') return DISCORD;
}

// Sort by List
const sortByList = [
  {id: 1, title: 'Name: A-Z'},
  {id: 2, title: 'Name: Z-A'},
  {id: 3, title: 'Price: High to low'},
  {id: 4, title: 'Price: Low to high'},
  {id: 5, title: 'Rarity: Rank High'},
  {id: 6, title: 'Rarity: Rank Low'},
];

// SEARCH COLLECTIONS
const namesCollection = [];


////// DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD
////// HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE
////// DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD

const Dashboard = ({data, getDataSorted, title, children}) => {
  const theme = useTheme();


  // DATA
  const [dataSorted, setDataSorted] = useState([]);

  const [open, setOpen] = useState(false);
  const [openNestedList, setOpenNestedList] = useState(true);

  useEffect(async () => {

    if (namesCollection.length <= 0) {
      const res = await axios.get(`https://api.nfolio.io/collection_metadata/?page=1&size=10`);
      const {data} = res;
      console.log(data)
      data.items.map(n => {
        return namesCollection.push({title: n.collection_slug})
      })

    }

  }, [])


  const handleClick = () => {
    setOpenNestedList(!openNestedList);
  };

  const router = useRouter()
  const {pathname} = router;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const SortCollections = ({onSortHandle}) => {
    return (
      <SortBy onSortHandle={onSortHandle}/>
    )
  }

  const SortBy = ({onSortHandle}) => {

    return (
      <Stack spacing={1} sx={{width: 300, display: open ? 1 : 'none', backgroundColor: 'lightGrey',}}>
        <Autocomplete
          freeSolo
          id="free-solo"
          disableClearable
          onChange={(e) => onSortHandle(e, data)}
          options={sortByList.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Sort By"
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

  const onSortHandle = (e, array) => {
    const choiceSortBy = e.target.innerHTML;
    if (choiceSortBy === 'Price: High to low') {
      const res = sortByPriceHighToLow(array);
      return getDataSorted(res);
    } else if (choiceSortBy === 'Price: Low to high') {
      const res = sortByPriceLowToHigh(array);
      return getDataSorted(res);
    } else if (choiceSortBy === 'Rarity: Rank Low') {
      const res = sortByRarityRankLowToHigh(array);
      return getDataSorted(res);
    } else if (choiceSortBy === 'Rarity: Rank High') {
      const res = sortByRarityRankHighToLow(array);
      return getDataSorted(res);
    } else if (choiceSortBy === 'Name: A-Z') {
      const res = sortByNameAZ(array);
      return getDataSorted(res);
    } else if (choiceSortBy === 'Name: Z-A') {
      const res = sortByNameZA(array);
      return getDataSorted(res);
    }
  }

  const searchCollectionHandle = (e) => {
    const choiceSearch = e.target.innerHTML;
    router.push(`/${choiceSearch}`);
    console.log('ROUTER PUSH')
    setOpen(false)
  }

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{display: 'flex', background: '#313338'}}>
        <CssBaseline/>
        <AppBar position="fixed" open={open} sx={{padding: '1rem'}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && {display: 'none'}),
              }}
            >
              <MenuIcon/>
            </IconButton>
            <div>
              <div>
                <Typography variant="h5" noWrap component="div">
                  {title.title?.length > 1 ? title.title : 'NFT #1 '}
                </Typography>
              </div>
              <Typography variant="h6" noWrap component="div">
                {title.subtitle?.length > 1 ? title.subtitle : 'collections'}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{margin: '.5rem 0'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Link href={'/'}>
                <a>
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="" width={80}/>{' '}
                </a>
              </Link>
              <Link href={'/'}>
                <a>
                  <Typography variant="h5" noWrap component="div"
                              sx={{marginLeft: '10px', color: 'white', lineHeight: 1, fontWeight: 'bold'}}>
                    NFT <br/> JERRY
                  </Typography>
                </a>
              </Link>
            </div>
            <IconButton onClick={handleDrawerClose} sx={{color: 'white'}}>
              {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
            </IconButton>
          </DrawerHeader>
          <Divider/>
          {
            pathname === '/'
              ? (
                <List sx={{mt:3}}>
                  {['NFT COLLECTIONS', 'NFT DROP CALENDAR', 'NFT NEWS', 'STATS', 'GET LISTED'].map((text) => {
                      if (text === 'STATS') {
                        return (
                          <ListItemButton
                            disabled
                            key={text}
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: '#ff2dbc'
                              }}
                            >
                              <StairsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{opacity: open ? 1 : 0, color: 'white'}}/>
                          </ListItemButton>
                        )
                      } else {
                        return (
                          <Link key={text} href={`${getLinks(text)}`}>
                            <a>
                              <ListItemButton
                                sx={{
                                  minHeight: 48,
                                  justifyContent: open ? 'initial' : 'center',
                                  px: 2.5,
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                    color: '#ff2dbc'
                                  }}
                                >
                                  {getIcons(text)}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{opacity: open ? 1 : 0, color: 'white'}}/>
                              </ListItemButton>
                            </a>
                          </Link>

                        )
                      }

                    }
                  )}
                </List>
              )
              : (
                <List
                  sx={{width: '100%', maxWidth: 360, mt:3, bgcolor: '#212328', color: 'white'}}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon sx={{color: '#ff2dbc'}}>
                      <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="MENU" sx={{color: '#ff2dbc'}}/>
                    {openNestedList ? <ExpandLess sx={{color: '#ff2dbc'}}/> : <ExpandMore sx={{color: '#ff2dbc'}}/>}
                  </ListItemButton>
                  <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {
                        ['NFT COLLECTIONS', 'NFT DROP CALENDAR', 'NFT NEWS', 'STATS', 'GET LISTED'].map((text) => {
                          if (text === 'STATS') {
                            return (
                              <ListItemButton disabled key={text}>
                                <ListItemIcon sx={{color: '#ff2dbc'}}>
                                  <StairsIcon/>
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                              </ListItemButton>
                            )
                          } else {
                            return (
                              <ListItemButton key={text}>
                                <ListItemIcon sx={{color: '#ff2dbc'}}>
                                  {getIcons(text)}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                              </ListItemButton>
                            )
                          }
                        })
                      }
                    </List>
                  </Collapse>
                </List>
              )
          }

          <Divider/>
          <List>
            <ListItem
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: '#212328'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: '#ff2dbc'
                }}
              >
                <LocationSearchingIcon/>
              </ListItemIcon>
              <Stack spacing={1} sx={{width: 300, display: open ? 1 : 'none', backgroundColor: 'lightGrey',}}>
                <Autocomplete
                  sx={{display: open ? 1 : 'none',}}
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  onChange={(e) => searchCollectionHandle(e)}
                  options={namesCollection.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      sx={{
                        display: open ? 1 : 'none',
                      }}
                      {...params}
                      label="Search collection"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
              </Stack>
            </ListItem>
          </List>
          <Divider/>
          {/* SORT */}
          {
            pathname !== '/' && (
              <List>
                <ListItem
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: '#212328'
                  }}
                >
                  <SortByAlphaIcon
                    sx={{
                      minWidth: 30,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                      color: '#ff2dbc',
                    }}
                  >
                    <LocationSearchingIcon/>
                  </SortByAlphaIcon>
                  <SortCollections onSortHandle={onSortHandle}/>
                </ListItem>
              </List>
            )
          }
          <Divider/>
          <List>
            {['TWITTER || 406K', 'DISCORD || 126K'].map((text, index) => (
              <Link key={text} href={`${getSocialLinks(text)}`}>
                <a target={"_blank"}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {index % 2 === 0 ? <TwitterIcon style={{color: 'dodgerblue'}}/> :
                        <EmojiEmotionsIcon color={'primary'}/>}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{opacity: open ? 1 : 0, color: 'white'}}/>
                  </ListItemButton>
                </a>
              </Link>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{flexGrow: 1, pt: 8, pl: 2}}>
          <DrawerHeader/>

          {children}

        </Box>
      </Box>
    </ThemeProvider>
  );
};


export default Dashboard;






