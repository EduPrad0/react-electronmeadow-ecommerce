import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProfileIcon from '../../assets/img/profile_icon.png'

interface IUserProps {
    user: string;
    password: string;
}

interface closeModal {
    closeModal(): void;
}

export function ModalLogin({closeModal}: closeModal) {


    
    const [ user, setUser ] = useState<IUserProps>({} as IUserProps);

    const handleCloseAll = () => {
        setUser({} as IUserProps);
        closeModal();
    }

    return (
        <Grid
            position="relative"
        >
            <Grid
                position="absolute"
                right="-4rem"
                onClick={() => handleCloseAll()}
            >
                <img width="50px" src="https://www.smiles.com.ar/images/svg/icons/gray/ic-close-circle.svg" alt="fechar" style={{cursor: 'pointer'}}/>
            </Grid>
            <Grid
                position="absolute"
                top="-3rem"
                ml="8rem"
            >
                <img width="100px" src={ProfileIcon} />
            </Grid>

            <Grid
                pt="5rem"
            >
                <Typography
                    variant="h5"
                    color="#5B5B5B"
                    textAlign="center"
                >
                    Entre na sua conta
                </Typography>

            </Grid>

            <Grid 
                pt="2rem"
                component="form"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mx="1rem"
            >
                    <TextField 
                        style={{marginBottom: '2rem'}} 
                        id="input-user" 
                        label="User" 
                        fullWidth 
                        variant="outlined" 
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />

                    <TextField 
                        id="input-pass" 
                        label="Password" 
                        type="password" 
                        fullWidth 
                        variant="outlined" 
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
            </Grid>

            <Grid
                 display="flex"
                 alignItems="center"
                 justifyContent="center"
                 mt="1rem"
            >
                <Button variant="contained">Entrar</Button>
            </Grid>
            <Typography
                variant="body2"
                textAlign="center"
                color="rgba(0,0,0,0.3)"
                mt="10px"
            >
                Esqueci a senha
            </Typography>

            <Grid
                bgcolor="#FF5A00"
                padding="15% 0"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >   
                <Typography 
                    variant="h5"
                    fontWeight="bold"
                    color="white"
                >
                    Não tem conta?
                </Typography>
                <Button 
                    variant="outlined"
                    color="inherit"
                    style={{marginTop: '10px'}}
                >
                    Cadastrar
                </Button>
            </Grid>

        </Grid>
    );
}