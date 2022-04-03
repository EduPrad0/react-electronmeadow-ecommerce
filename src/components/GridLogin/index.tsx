import { Grid, Typography } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import { DOMAttributes, useEffect, useState } from 'react';
import { useAuth, User } from '../../hooks/useAuth';

interface ILogin extends DOMAttributes<any> {
  isLogged: boolean;
}

export function GridLogin ({isLogged, ...rest}:ILogin) {
  const [user, setUser ] = useState<User | undefined>(undefined)
  useEffect(() => {
    if(!user && localStorage.getItem("@meadow:user")){
      setUser(JSON.parse(localStorage.getItem("@meadow:user") || "{}"))
    }
  }, [])
  return (
    <Grid
      display="flex"
      alignItems="center"
      padding="11px 8px"
      border={`1px solid ${user ? 'orange': 'black'}`}
      borderRadius="16px"
      sx={{cursor: 'pointer'}}
      {...rest}
    >
      <PersonIcon color={user ? 'warning': 'inherit'}/>
      
      <Typography
        variant="h5"
        fontWeight="bold"
        ml="0.5rem"
      >
        {user && user.name ? user.name : 'Entrar'}
      </Typography>
    </Grid>
  )
  
}