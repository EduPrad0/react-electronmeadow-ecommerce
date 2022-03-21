import { Fragment, useState } from "react";
import { Grid, Typography } from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';


export interface ICardItemProps {
  data : {
    id: string;
    is_favorited: boolean;
    url_image: string;
    description: string;
    pricing: string;
    how_many_times: string | number;
    avaliation: number;
    total_avaliation: number;
    comments?: string;
  }
}


export function CardItem({data}: ICardItemProps) {
  const [checkProduct, setCheckProduct] = useState(false);

  const StarsProduct = () => {
    const vPS = {
      oneS: data.total_avaliation / 5,
      twoS: data.total_avaliation / 4,
      threeS: data.total_avaliation / 3,
      fourS: data.total_avaliation / 2,
    }

    const avaliationCalc = data.avaliation / data.total_avaliation;
    const arrayF = (n: number) => new Array(n);
    let nvalue = 1;
    if (avaliationCalc < vPS.oneS) {
      nvalue = 5;
    }

    if (avaliationCalc > vPS.twoS) {
      nvalue = 4;
    }

    if (avaliationCalc > vPS.threeS) {
      nvalue = 3;
    }

    if (avaliationCalc > vPS.fourS) {
      nvalue = 2;
    }

    return (
      <Grid
        container
        color="yellow"
        alignItems="center"
        justifyContent="center"
      >

        {
          arrayF(nvalue).fill('1').map((item, index) => (
            <Fragment key={index}>
              <StarsRoundedIcon />
            </Fragment>
          ))
        }
      </Grid>
    )
  }

  return (
    <Grid
      border="1px solid #e6e6e6"
      padding="4px"
      borderTop="0"
      onMouseEnter={() => setCheckProduct(true)}
      onMouseLeave={() => setCheckProduct(false)}
      style={{ cursor: 'pointer' }}
      maxWidth="305px"
    >

      <Grid
        position="relative"
      >
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="center"

          position="absolute"
          borderRadius="100%"
          overflow="hidden"
          height="30px"
          width="30px"
          bgcolor="#e0e0e0"
        >
          {
            data.is_favorited
              ? <FavoriteIcon color="error" />
              : <FavoriteBorderIcon />
          }
        </Grid>

        <img
          width="299px"
          height="299px"
          src={data.url_image}
          alt="url"
        />
        {
          checkProduct && (
            <Grid
              color="#00aae0"
              border="1px solid #00aae0"

              position="absolute"
              bottom="0"
              left="30%"
              right="30%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="5px"

            >
              <Typography
                variant="body1"
                color="inherit"
              >
                Conferir
              </Typography>
            </Grid>
          )
        }
      </Grid>

      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h6"
          textAlign="center"
          height="90px"
        >
          {data.description}
        </Typography>
        {
          <StarsProduct />
        }

      <Typography
        variant="body1"
        color="#04d483"
        fontWeight="bold"
      >
        FRETE GRATIS
      </Typography>

      <Typography
        variant="h6"
        fontWeight="bold"
      >
        R$ {data.pricing}
      </Typography>
      <Typography
        variant="body1"
      >
        ou {data.how_many_times}x 
        R$ {
          ( 
            Number(data.pricing.replace(',','.')) 
              / 
            Number(data.how_many_times)
          )
          .toFixed(2)
            .replace('.', ',')
        }
      </Typography>
    </Grid>
    </Grid >
  )
}