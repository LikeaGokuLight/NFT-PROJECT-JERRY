import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../components/Layout/Dashboard";
import Typography from "@mui/material/Typography";
import styles from "../styles/dashboard/dashboardContainer.module.scss";
import CardNft from "../components/Card/Card-Nft";
import {Container} from "@mui/material";

const Index = ({ data }) => {

  const headerTitle = {
    title: 'The #1 source for NFT rarity',
    subtitle: 'Rarity Sniper is the best way to check the rarity of 1307 NFT collections on Ethereum, Solana & more'
  }

  return (
    <div>
      <Dashboard title={headerTitle}>
        <Container maxWidth="hg" sx={{pb:'2rem'}}>
          <Typography color={'primary'} variant="h4" noWrap component="div" sx={{pb:2, fontWeight:'bold'}}>
            Explore the available collections
          </Typography>
          <div className={styles.container}>
            {
              data.map((nft) => <CardNft data={nft} key={nft[1].token_address} />)
            }
          </div>
        </Container>
      </Dashboard>
    </div>
  );
};

Index.getInitialProps = async () => {
  const res = await axios.get(` https://api.nfolio.io/collection_metadata`);
  const {data} = res;
  return {data};
};

export default Index;
