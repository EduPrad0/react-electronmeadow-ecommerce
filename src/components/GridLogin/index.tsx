import { Grid, Typography } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';

export function GridLogin () {
  const logado = true;
  return (
    <Grid
      display="flex"
      alignItems="center"
      padding="11px 8px"
      border={`1px solid ${logado ? 'green': 'black'}`}
      borderRadius="16px"
      sx={{cursor: 'pointer'}}
    >
      <PersonIcon color={logado ? 'success': 'inherit'}/>
      
      <Typography
        variant="h5"
        fontWeight="bold"
        ml="0.5rem"
      >
        {logado ? 'Eduardo' : 'Entrar'}
      </Typography>
    </Grid>
  )
  
}