import * as React from 'react';
import Link from "next/link";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Chip, Grid} from '@mui/material';
import {motion} from "framer-motion";
import {FaDiscord, FaTwitter, FaConnectdevelop, FaEthereum} from "react-icons/fa";
import stylesCard from "../../styles/card/card-nft.module.scss";
import Stack from "@mui/material/Stack";
import DiamondIcon from '@mui/icons-material/Diamond';


const CardNft = ({data}) => {


  return (
    <motion.div
      whileHover={{y: -15}}
    >
      <Card >
        <CardActionArea>
          <Stack direction="row" spacing={1} sx={{ position:'absolute', p:1 }}>
            <Chip icon={<DiamondIcon  />} label="FEATURED" color="primary" size="small" />
          </Stack>
          <Link href={`/${data.collection_slug}`}>
            <a>
              <CardMedia
                component="img"
                height="180"
                image={data[1]?.image_url ? data.image_url : data.image_url_2}
                alt="green iguana"
              />
            </a>
          </Link>
          <CardContent sx={{ maxHeight: '10rem' }}>

            <Typography
              sx={{
                width: '150px', clear: 'both', fontWeight: 'bold',
                display: 'inline-block', overflow: 'hidden',
                whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                textTransform: 'uppercase'
              }}
              gutterBottom
              variant="p"
              component="div"
            >
              {data.name}
            </Typography>

            <Grid container spacing={.5}>
              <Grid item xs={6}>
                <div className={stylesCard.eth}>
                  <div className={stylesCard.eth_content}>
                    <FaEthereum/>ETH
                  </div>

                </div>
              </Grid>
              <Grid item xs={6}>
                <Link href={ data.twitter_username.length > 1 ? `https://twitter.com/${data.twitter_username}` : '/' }>
                  <a target={'_blank'}>
                    <div className={stylesCard.card}>
                      Twitter
                      <FaTwitter className={stylesCard.twitter}/>
                    </div>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href={data.external_link.length > 1 ? data.external_link : '/'}>
                  <a target={'_blank'}>
                    <div className={stylesCard.card}>
                      Website
                      <FaConnectdevelop/>
                    </div>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href={data.discord_url.length > 1 ? data.discord_url : '/' }>
                  <a target={'_blank'}>
                    <div className={stylesCard.card}>
                        Discord
                      <FaDiscord className={stylesCard.discord}/>
                    </div>
                  </a>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>

  );
};

export default CardNft;
