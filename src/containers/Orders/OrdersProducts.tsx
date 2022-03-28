import { Grid, Divider, Typography, Button } from '@mui/material'
import { Fragment, useEffect, useState } from 'react';
import { IProductOrder } from '.';
import { CardOrder } from './CardOrder';

interface IOrdersProducts {
  data: IProductOrder[];
}

interface ICard {
  item: IProductOrder
}


export function OrdersProducts({ data }: IOrdersProducts) {
  const [ total, setTotal ] = useState(0)

  useEffect(() => {
    let value = 0;
    data.forEach(i => {
      value += Number(i.pricing) * i.quantitySelected;
    })
    setTotal(value);
  }, [data])

  return (
    <Grid
      width="100%"
      height="100%"
      position='relative'
      pb="1rem"
    >
      {
        data.map((item, ind) => (
          <Fragment key={ind}>
            <Divider />
            <CardOrder item={item} />
            <Divider />
          </Fragment>
        ))
      }
      <Grid
        display="flex"
        p="2rem"
        justifyContent="end"
      >
        <Typography
           variant="h6"
           fontSize="2rem"
           fontWeight="300"
        >
          Total com frete : 
        </Typography>
      <Grid
        display="flex"
        justifyContent="center"
        ml="6rem"
      >
        <Typography
          variant="h6"
          fontSize="2rem"
          fontWeight="300"
        >
          R$ {(total + "").split(".")[0]}
        </Typography>

        <Typography
          variant="h6"
          fontSize="1.5rem"
          fontWeight="300"

        >
          {(total.toFixed(2) + "").split(".")[1]}
        </Typography>
      </Grid>
      </Grid>
      <Divider />
      <Grid
        display="flex"
        p="2rem"
        justifyContent="end"
      >
        <Button variant='contained'>Continuar a compra</Button>
      </Grid>
    </Grid>
  );
}