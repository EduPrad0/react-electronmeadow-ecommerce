import { Grid, Typography } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import { DOMAttributes } from 'react';

interface ILogin extends DOMAttributes<any> {
  logged: boolean;
}

export function GridLogin ({logged, ...rest}:ILogin) {
  const logado = true;
  return (
    <Grid
      display="flex"
      alignItems="center"
      padding="11px 8px"
      border={`1px solid ${logado ? 'green': 'black'}`}
      borderRadius="16px"
      sx={{cursor: 'pointer'}}
      {...rest}
    >
      <PersonIcon color={logado ? 'success': 'inherit'}/>
      
      <Typography
        variant="h5"
        fontWeight="bold"
        ml="0.5rem"
      >
        {logged ? 'Eduardo' : 'Entrar'}
      </Typography>
    </Grid>
  )
  
}