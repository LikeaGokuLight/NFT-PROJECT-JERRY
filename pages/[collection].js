import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Dashboard from "../components/Layout/Dashboard";
import Typography from "@mui/material/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearIndeterminate from "../components/UI/LinearIndeterminate";
import AlertMessageEnd from "../components/UI/AlertMessageEnd";
import CardNftCollection from "../components/Card/Card-Nft-Collection";
import styles from "../styles/dashboard/dashboardContainer.module.scss";
import stylesModal from "../styles/modal/modal.module.scss";
import Theme from "../helper/Theme";
import {ThemeProvider} from "@emotion/react";
import {Backdrop, Container, Fade, Grid, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import DiamondIcon from '@mui/icons-material/Diamond';
import SailingIcon from '@mui/icons-material/Sailing';
import PreviewIcon from '@mui/icons-material/Preview';
import TableTraits from "../components/Table/TableTraits";
import {router} from "next/client";

const PAGE_NUMBER = 2;


const Collection = ({data}) => {

  const [state, setState] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [hasMore, setHasMore] = useState(true);
  // SORT DATA
  const [isDataSorted, setIsDataSorted] = useState(false);
  // MODAL
  const [openModal, setOpenModal] = useState(false);
  const [nftModal, setNftModal] = useState([]);
  // MODAL
  const {query} = useRouter();

  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    console.log(data.items)
    if ( data.items.length < 1 ) {
      return router.push('/')
    }
    setState(data.items);
  }, [])


  useEffect(async () => {
      const res = await axios.get(`  https://api.nfolio.io/collections/${query.collection}/?page=1&size=30 `);
      const {data} = res;

      if (data.items.length === 0) setHasMore(false);

      setState([...data.items]);

    console.log(router, 'router works')
    console.log(router.asPath, currentPath, 'CHECK')
  }, [query])

  // HEADER TITLE
  const headerTitle = {
    title: 'NFT Collections',
    subtitle: `${state?.length > 1 ? state.length : 'Loading...'} collections`
  }

  const fetchDataOnScroll = async () => {

    try {
      const res = await axios.get(`  https://api.nfolio.io/collections/${query.collection}/?page=${page}&size=30 `);
      const {data} = res;

      if (data.items.length === 0) setHasMore(false);

      setState([...state, ...data.items]);
      setPage(page + 1)
    } catch (err) {
      console.log(err.message)
    }
  }

  // MODAL
  const takeIdHandle = async (token_id, collection_name) => {
    const res = await axios.get(`https://api.nfolio.io/nft_details/?collection_slug=${collection_name}&ID=${token_id}&method=avg`);
    const {data} = res;
    setNftModal(data);
    setOpenModal(true);
  }

  const handleCloseModal = () => setOpenModal(false);

  // MODAL

  const getDataSorted = (dataSorted) => {
    setIsDataSorted(true);
    console.log( dataSorted.map(n => n))
    console.log('worked')
    setState([...dataSorted])
    setIsDataSorted(false)
  }


  return (
    <>
      <ThemeProvider theme={Theme}>
        <Dashboard data={state} getDataSorted={getDataSorted} title={headerTitle}>
          <Typography color={'primary'} variant="h5" noWrap component="div" sx={{pb: 1, ml:3, fontWeight: 'bold'}}>
            Collections #{query.collection.toUpperCase()} || items { state?.length > 1 ? state.length : '' }
          </Typography>

          {/*MODAL*/}

          {
            nftModal.map((data, index) => (
              <div key={index}>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openModal}
                  onClose={handleCloseModal}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openModal}>
                    <Box className={stylesModal.box}>
                      <Grid container>
                        <Grid item xs={6}>
                          <div>
                            <img src={data.image_url} alt="images" />
                          </div>
                        </Grid>
                        <Grid item xs={6}>

                          <Grid container spacing={2} sx={{padding:'.3rem 1rem'}}>
                            <Grid item xs={6}>
                              <div>
                                <Typography color={'primary'} sx={{fontWeight: 'bold'}} variant="h4" component="h1">
                                  RANK {data.rarity_rank}
                                </Typography>
                                <div>
                                  <h1>
                                    #2152 ??
                                    <DiamondIcon sx={{ fontSize: 25 }} />
                                    <SailingIcon sx={{ fontSize: 25 }} />
                                    <PreviewIcon sx={{ fontSize: 25 }} />
                                  </h1>
                                </div>
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div className={stylesModal.floatRight}>
                                <Typography color={'primary'} sx={{fontWeight: 'bold'}} variant="h4" component="h1">
                                  Rarity Rank {data.rarity_rank}
                                </Typography>
                                <div>
                                  <h3>
                                    Rarity Score {data.estimated_price}
                                  </h3>
                                  <h3>
                                    estimated_price <span className={stylesModal.estimatedPrice}>{data.estimated_price}</span>
                                  </h3>
                                </div>
                              </div>
                            </Grid>
                          </Grid>

                          <div className={stylesModal.traits}>
                            <h2>TRAITS({data.traits_details.length} categories)</h2>
                          </div>

                          <TableTraits nftTraits={data.traits_details} />
                        </Grid>


                      </Grid>
                    </Box>
                  </Fade>
                </Modal>
              </div>
            ))
          }

          {/*MODAL*/}

          <Container maxWidth="hg">

            <InfiniteScroll
              next={fetchDataOnScroll}
              hasMore={hasMore}
              loader={<LinearIndeterminate/>}
              dataLength={state.length}
              endMessage={<AlertMessageEnd/>}
            >

              <div className={styles.container}>
                {
                  state.map((nft) => <CardNftCollection
                    data={nft}
                    key={nft.token_id}
                    takeId={takeIdHandle}
                  />)
                }
              </div>


            </InfiniteScroll>

          </Container>
        </Dashboard>

      </ThemeProvider>
    </>
  );
};

Collection.getInitialProps = async ({query}) => {
  try {
    const collection = query.collection;
    const res = await axios.get(` https://api.nfolio.io/collections/${collection}/?page=1&size=30`);
    const {data} = res;
    return {data};
  } catch (err) {
    return router.push('/')
  }
}


export default Collection;
