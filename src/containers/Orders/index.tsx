import { Divider, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar'
import { IProduct } from '../../components/Products';
import { useOrders } from '../../hooks/useOrder';
import api from '../../services/api';
import { OrdersProducts as ContainerOrders} from './OrdersProducts';

export interface IProductOrder extends IProduct {
  quantitySelected: number;
}

export function Orders() {
  const [ isCart, setIsCart ] = useState(true);
  const [ ordersProducts, setOrdersProducts ] = useState<IProductOrder[]>([]) 
  const { products } = useOrders();

  useEffect(() => {
    if(products.length > 0) {
      (async () => {
        const ids = products.map(item => item.id);
        const { data } = await api.post('/api/get_orders', ids);
        const newOrder = data?.map((item:IProduct) => {
          const quantitySelected = products.find(i => i.id === item.id)?.quantity;
          return {
            ...item,
            quantitySelected
          }
        })

        setOrdersProducts(newOrder);
      })()
    }
  }, [products])
  

  const textType = () => {
    if(isCart) {
      return {
        noItems: 'O seu carrinho está vazio',
        descriptionsNoItems: 'Não sabe o que comprar? Milhões de produtos esperam por você!'
      }
    } 

    return {
      noItems: true ? 'Você não tem produtos salvos' : 'Você precisa estar logado!',
      descriptionsNoItems: 'Se ainda não decidiu comprar algum produto do seu carrinho, você pode deixá-lo aqui.'
    }
  }

  const NotProducts = () => (
    <Grid
      mt="5rem"
    >
      <Typography
      color="#666"
      variant="body1"
      fontSize="32px"
      textAlign="center"
      >
      {textType().noItems}
    </Typography>
      <Typography
        color="#999"
        variant="body1"
        fontSize="18px"
        textAlign="center"
      >
        {textType().noItems}
      </Typography>
    </Grid>
  )

  return (
    <Grid>
      <Navbar />
      <Grid
        bgcolor="#ededed"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="0 5rem 5rem"
      >
        <Grid
          mt="1rem"
          bgcolor="white"
          borderRadius="10px"
          minHeight="550px"
          container
          display="flex"
          flexDirection="column"
          width="100%"
        >
          <Grid
            display="flex"
            width="100%"
            padding="3.4rem 6rem 2rem"
          >
            <Typography
              variant="h5"
              fontSize="17px"
              style={{cursor: 'pointer' }}
              color={!isCart ? "#5158fb" : 'black'}
              onClick={() => setIsCart(true)}
              >
              Carrinho ({products.length})
            </Typography>
            <Typography
              variant="h5"
              fontSize="17px"
              ml="2rem"
              style={{cursor: 'pointer' }}
              color={isCart ? "#5158fb" : 'black'}
              onClick={() => setIsCart(false)}
            >
              Salvos (0)
            </Typography>
          </Grid>
          <Grid>
          <Typography 
            variant="body1"
            width="100px"
            border="1px solid black"
            ml={isCart ? '6rem' : '13rem'}
            style={{transition: 'all 0.5s'}}
          />
          <Divider />
         </Grid>

          <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
              {
                products.length < 1 || !isCart
                ? <NotProducts />
                : <ContainerOrders data={ordersProducts} />
              }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}