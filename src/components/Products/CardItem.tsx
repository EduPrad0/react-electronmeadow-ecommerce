import { useState } from "react";
import { Grid, Typography } from "@mui/material";


import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SaveHeart } from "../SaveHeart";


export interface ICardItemProps {
  data: {
    id: number;
    url_image: string;
    description: string;
    pricing: string;
    how_many_times: number;
    total_avaliation: number;
    quantity: number;
  }
}


export function CardItem({ data }: ICardItemProps) {
  const [checkProduct, setCheckProduct] = useState(false);
  const navigation = useNavigate()

 


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
          zIndex={999}
          position="absolute"
          borderRadius="100%"
          overflow="hidden"
          height="30px"
          width="30px"
          bgcolor="#e0e0e0"
          >
          <SaveHeart id_product={data.id} />
        </Grid>

        <img
          onClick={() => navigation(`/product/${window.location.pathname.replace('/', '')}/${data.id}`)}
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
                onClick={() => navigation(`/product/${window.location.pathname.replace('/', '')}/${data.id}`)}

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
        <Grid
          container
          color="yellow"
          alignItems="center"
          justifyContent="center"
        >

          <StarsRoundedIcon />
          <StarsRoundedIcon />
          <StarsRoundedIcon />
          <StarsRoundedIcon />
          <StarsRoundedIcon />
        </Grid>

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
              Number(data.pricing.replace(',', '.'))
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