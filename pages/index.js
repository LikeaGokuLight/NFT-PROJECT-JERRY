import React, {useEffect, useState} from "react";
import axios from "axios";
import Dashboard from "../components/Layout/Dashboard";
import Typography from "@mui/material/Typography";
import styles from "../styles/dashboard/dashboardContainer.module.scss";
import CardNft from "../components/Card/Card-Nft";
import {Container} from "@mui/material";
import Link from "next/link";
import LinearIndeterminate from "../components/UI/LinearIndeterminate";
import AlertMessageEnd from "../components/UI/AlertMessageEnd";
import InfiniteScroll from "react-infinite-scroll-component";

const PAGE_NUMBER = 2;

const Index = ({data}) => {

  const [state, setState] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [hasMore, setHasMore] = useState(true);

  const headerTitle = {
    title: 'The #1 source for NFT rarity',
    subtitle: 'Rarity Sniper is the best way to check the rarity of 1307 NFT collections on Ethereum, Solana & more'
  }

  useEffect(() => {
    setState(data.items)
  }, [])

  const fetchDataOnScroll = async () => {

    try {
      const res = await axios.get(`https://api.nfolio.io/collection_metadata/?page=${PAGE_NUMBER}&size=10`);
      const {data} = res;

      if (data.items.length === 0) setHasMore(false);

      setState([...state, ...data.items]);
      setPage(page + 1)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <Link href={'/azuki'}>
        <a>
          <button>CLICK ME PLEASE TO SEE COLLECTION AZUKI</button>
        </a>
      </Link>
      <Dashboard title={headerTitle}>
        <Container maxWidth="hg" sx={{pb: '2rem'}}>
          <Typography color={'primary'} variant="h4" noWrap component="div" sx={{pb: 2, fontWeight: 'bold'}}>
            Explore the available collections
          </Typography>

          {/*INFINITY SCROLL*/}
          <InfiniteScroll
            next={fetchDataOnScroll}
            hasMore={hasMore}
            loader={<LinearIndeterminate/>}
            dataLength={state.length}
            endMessage={<AlertMessageEnd/>}
          >
            <div className={styles.container}>
              {
                state.map((nft) => <CardNft data={nft} key={nft.token_address}/>)
              }
            </div>

          </InfiniteScroll>
          {/*INFINITY SCROLL*/}

        </Container>


    </Dashboard>
</div>
)
  ;
};

Index.getInitialProps = async () => {
  const res = await axios.get(`https://api.nfolio.io/collection_metadata/?page=1&size=10`);
  const {data} = res;
  return {data};
};

export default Index;
