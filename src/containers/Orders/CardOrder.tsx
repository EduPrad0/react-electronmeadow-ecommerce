import { Grid, Typography } from '@mui/material'
import { useState } from 'react';
import { IProductOrder } from '.';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useOrders } from '../../hooks/useOrder';

interface ICard {
  item: IProductOrder
}


export function CardOrder({ item }: ICard) {
  const [quantitySelected, setQuantitySelected] = useState(item.quantitySelected);
  const { addingProduct, removeProduct } = useOrders()

  function handleQuantitySelected(type: 'add' | 'remove') {
    const qS = type === 'add' ? quantitySelected + 1 : quantitySelected - 1;
    if ((type === 'add' && qS === item.quantity + 1) || (type === 'remove' && qS === 0)) return;

    setQuantitySelected(qS);
    addingProduct({
      id: item.id,
      quantity: qS
    })
  }

  return (
    <Grid
      height="150px"
      display="flex"
      alignItems="center"
      ml="4rem"
    >
      <Grid><img width="44px" height="44px" src={item.url_image} /></Grid>
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        ml="1rem"
      >
        <Typography
          fontWeight="bold"
          fontSize="20px"
          textTransform="capitalize"
          textOverflow="ellipsis"
          overflow="hidden"
          width="500px"
          whiteSpace="nowrap"
        >
          {item.description}
        </Typography>
        <Typography
          fontWeight="regular"
          fontSize="14px"
          textTransform="capitalize"
          color="#00a650"
        >
          Frete gratis
        </Typography>
        <Grid
          display="flex"
          alignItems="center"
        >
          <Typography
            variant="body2"
            color="#3483fa"
            style={{ cursor: "pointer" }}
            onClick={() => removeProduct(item.id)}
          >
            Excluir
          </Typography>

          <Typography
            variant="body2"
            color="#3483fa"
            style={{ cursor: "pointer" }}
            ml="5rem"

          >
            Favoritar
          </Typography>

          <Typography
            variant="body2"
            color="#3483fa"
            style={{ cursor: "pointer" }}
            ml="5rem"

          >
            Ver produto
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        <Grid
          width="120px"
          height="40px"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          border="1px solid rgba(0,0,0,0.1)"
          borderRadius="6px"
          ml="5rem"
        >
          <Grid onClick={() => handleQuantitySelected('remove')}>
            <RemoveRoundedIcon fontSize="small" color={quantitySelected === 1 ? 'disabled' : 'info'} cursor="pointer" /></Grid>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {quantitySelected}
          </Grid>
          <Grid onClick={() => handleQuantitySelected('add')}>
            <AddRoundedIcon fontSize="small" color={quantitySelected === item.quantity ? 'disabled' : 'info'} cursor="pointer" /></Grid>
        </Grid>
        <Typography
          variant="body2"
          color="rgba(0,0,0,0.1)"
          ml="5rem"
          textAlign="center"
        >
          {item.quantity} disponíveis
        </Typography>
      </Grid>
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
          R$ {((Number(item.pricing) * quantitySelected) + "").split(".")[0]}
        </Typography>

        <Typography
          variant="h6"
          fontSize="1.5rem"
          fontWeight="300"

        >
          {item.pricing.split('.')[1] ? ((Number(item.pricing) * quantitySelected).toFixed(2) + "").split(".")[1] : '00'}
        </Typography>
      </Grid>
    </Grid>
  )
}