import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Grid} from '@mui/material';
import {motion} from "framer-motion";
import stylesCard from "../../styles/card/card-nft.module.scss";
import {FaConnectdevelop, FaDiscord, FaEthereum, FaTwitter} from "react-icons/fa";
import Link from "next/link";

const noPicture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfDKQDSy8e-KJIHnylQr4ZnTNQtAA-xs986A&usqp=CAU'

const CardNftCollection = ({data, takeId}) => {

  console.log(data)

  const onNftClickTakeIdHandle = (token_id, name) => {
    takeId(token_id, name);
  }

  return (

    <motion.div
      whileHover={{y: -15}}
    >
      <Card>
        <CardActionArea onClick={() => onNftClickTakeIdHandle(data.token_id, data.collection_slug)}>
          <CardMedia
            component="img"
            height="180"
            image={data?.image_url ? data.image_url : noPicture}
            alt="green iguana"
          />
          {/*<CardContent>*/}
          {/*  <Grid container spacing={2}>*/}
          {/*    <Grid item xs={6}>*/}
          {/*      <Typography sx={{fontWeight:'bold'}} gutterBottom variant="h6" component="div" color={"secondary"}>*/}
          {/*        Rank {data.rarity_rank}*/}
          {/*      </Typography>*/}
          {/*    </Grid>*/}
          {/*    <Grid item xs={6}>*/}
          {/*      <Typography sx={{fontWeight:'bold'}} gutterBottom variant="h6" component="div">*/}
          {/*        {data.name.split(' ').splice(1)}*/}
          {/*      </Typography>*/}
          {/*    </Grid>*/}
          {/*    <Grid item xs={7}>*/}
          {/*      <Typography sx={{fontWeight:'bold'}} gutterBottom variant="p" component="div">*/}
          {/*        score {data.total_rarity.toString().slice(0,7)}*/}
          {/*      </Typography>*/}
          {/*    </Grid>*/}
          {/*    <Grid item xs={5}>*/}
          {/*      <Typography sx={{fontWeight:'bold'}} gutterBottom variant="p" component="div">*/}
          {/*        $ {data.total_rarity.toString().slice(0,6)}*/}
          {/*      </Typography>*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}

          {/*</CardContent>*/}
          <CardContent sx={{maxHeight: '10rem'}}>

            {/*<Typography*/}
            {/*  sx={{*/}
            {/*    width: '150px', clear: 'both', fontWeight: 'bold',*/}
            {/*    display: 'inline-block', overflow: 'hidden',*/}
            {/*    whiteSpace: 'nowrap', textOverflow: 'ellipsis',*/}
            {/*    textTransform: 'uppercase'*/}
            {/*  }}*/}
            {/*  gutterBottom*/}
            {/*  variant="p"*/}
            {/*  component="div"*/}
            {/*>*/}
            {/*  {data.name}*/}
            {/*</Typography>*/}

            <Grid container spacing={.5}>
              <Grid item xs={6}>
                <div className={stylesCard.card_collection}>
                  <Typography
                    sx={{
                      clear: 'both', fontWeight: 'bold',
                      color:'#ff2dbc', overflow: 'hidden',
                      whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                      textTransform: 'uppercase'
                    }}
                    gutterBottom
                    variant="p"
                    component="div"
                  >
                    Rank {data.rarity_rank}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    float:'right'
                  }}
                  gutterBottom
                  variant="p"
                  component="div"
                >
                  {data.name.split(' ').splice(-1)}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  sx={{
                    float:'left'
                  }}
                  gutterBottom
                  variant="p"
                  component="div"
                >
                  Score {Math.floor(data.total_rarity)}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <div className={stylesCard.buy}>
                  <div className={stylesCard.buy_content}>
                    BUY<FaEthereum/>{ Math.round(data.avg)}
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>


  );
};

export default CardNftCollection;
