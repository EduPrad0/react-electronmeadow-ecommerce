import { Grid, Typography } from '@mui/material'
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoBlack from '../../assets/img/logoB.svg' 
import Bag from '../../assets/img/bag.svg' 
import { links } from './links';
import { GridLogin } from '../GridLogin';
import { useOrders } from '../../hooks/useOrder';

export function Navbar () {
  const navigation = useNavigate()
  const { products } = useOrders()
  const LogoMeadow = () => (
    <Grid
      container
      alignItems="center"
      maxWidth="500px"
      minWidth="250px"
    >
      <img
        width="40px" 
        src={LogoBlack} 
        alt="logo"
      />
      <Typography
        variant='h5'
        fontWeight="bold"
        marginLeft="1rem"
      >
        Electron Meadow
      </Typography>
    </Grid>
  )
  
  return (
    <Grid
      boxShadow="1px 1px 10px rgba(0,0,0,0.5)"
      padding="1rem"
      display="flex"
      flexWrap="wrap-reverse"
      justifyContent="space-around"
      alignItems="center"
    >
      <LogoMeadow/>
     <Grid
      display="flex"
      flexWrap="wrap"
     >
     {
        links.map((item, key) => {
          return (
            <Fragment key={key}>
              <Typography
                variant="h6"
                textTransform="capitalize"
                onClick={() => navigation(item.path)}
                marginX="1rem"
                sx={{
                  cursor: 'pointer',
                  transition: 'all .5s',
                  '&:hover': {
                    transform: "scale(1.2)",
                 },
                }}
              >
                {item.name}
              </Typography>
            </Fragment>
          )
        })
      }
     </Grid>

     <Grid
      display="flex"
      alignItems="center"
     >
      <img style={{cursor: 'pointer'}} src={Bag} alt="bag"/>
      <Typography
        variant="body1"
        color="blue"
        ml="0.5rem"
        sx={{cursor: 'pointer'}}
      >{products.length} items</Typography>
     </Grid>

     <GridLogin />
    </Grid>
  );
}