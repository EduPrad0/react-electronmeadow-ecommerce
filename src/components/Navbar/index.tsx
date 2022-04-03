import { Grid, Typography } from '@mui/material'
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoBlack from '../../assets/img/logoB.svg'
import { links } from './links';
import { GridLogin } from '../GridLogin';
import { useOrders } from '../../hooks/useOrder';
import { Modal } from '../Modal';
import { ModalLogin } from '../Modal/ModalLogin';
import { useAuth } from '../../hooks/useAuth';

const styleModal = {
  marginTop: '-80px',
  width: '360px',
  height: '380px',
  border: '0'
}

export function Navbar() {
  const [ openModal, setOpenModal ] = useState(false);
  const { user } = useAuth();
  const [logged, setLogged] = useState(user ? true : false);
  const navigation = useNavigate()
  const { products } = useOrders()

  useEffect(() => {
    setLogged(user ? true : false)
  }, [user])
  
  const LogoMeadow = () => (
    <Grid
      container
      alignItems="center"
      maxWidth="300px"
      minWidth="250px"
      bgcolor="white!important"
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
    <>
    <Modal 
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      children={<ModalLogin closeModal={() => setOpenModal(false)}/>}
      stylesModal={styleModal}
    />

      <Grid
        boxShadow="1px 1px 10px rgba(0,0,0,0.5)"
        padding="1rem"
        display="flex"
        flexWrap="wrap-reverse"
        justifyContent="space-around"
        alignItems="center"
      >
        <LogoMeadow />
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
          onClick={() => navigation('/orders')}
        >
          <AddShoppingCartIcon />
          <Typography
            variant="body1"
            color="blue"
            ml="0.5rem"
            sx={{ cursor: 'pointer' }}
          >{products.length} items</Typography>
        </Grid>

        <GridLogin  isLogged={logged} onClick={() => !user && setOpenModal(true)}/>
      </Grid>
    </>
  );
}