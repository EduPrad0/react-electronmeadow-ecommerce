import { useState, useEffect, FormEvent } from "react";
import { Grid, TextField, Typography, FormControl, Button, InputAdornment } from "@mui/material";
import Logo from '../../assets/img/logoB.svg'
import ImgItem from '../../assets/img/registerImage.png'
import { cpfMask } from "../../utils/functions/masks";
import { Navbar } from '../../components/Navbar'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface IUserRegister {
  cpf: string;
  email: string;
  password: string;
  username: string;
}

const initialForm = {
  cpf: '',
  email: '',
  password: '',
  username: ''
}

export function Register() {
  const [userRegister, setUserRegister] = useState<IUserRegister>(initialForm)
  const [controllerVisibility, setControllerVisibility] = useState([false, false]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signIn } = useAuth();
  const navigation = useNavigate();

  const setInput = (newValue: any) => {
    setUserRegister(user => ({ ...user, ...newValue }))
  }

  function errorMessage (message: string) {
    return toast(message, { type: 'error' })
  }

  async function handleSubmitRegister(e: FormEvent) {
    e.preventDefault();

    if (userRegister.cpf.replaceAll(".", "").replace("-", "").length !== 11) {
      return errorMessage('Digite um cpf válido caro ser humano')
    }

    if(userRegister.password.length !== 4) {
      return errorMessage('A senha não possui 4 caracteres')
    }

    if(userRegister.password !== confirmPassword) {
      return errorMessage('confirme a senha corretamente')
    }

    try {
      await api.post('/api/register', {
        name: userRegister.username,
        password: userRegister.password,
        email: userRegister.email,
        cpf: userRegister.cpf
      })

    } catch (e:any) {
      console.log(e.response)
      if(e.response.status === 401){
        console.log("passou")
        switch (e.response.data.field[0]) {
          case 'name': 
            errorMessage("Já existe alguem com esse nome de usuário !!");
            break
          case 'email':
            errorMessage("Já existe alguem com esse email!") 
            break;
          case 'cpf':
            errorMessage("Hmm, verifique seu cpf, ou se você já tem uma conta aqui!")
            break

          default: 
            errorMessage("Xiii, reclame no site " + e)
        }

        return;
      }


      return errorMessage("Erro, reporte ao sistema !! " + e)
    }

    try {
      await signIn({
        login: userRegister.username,
        password: userRegister.password
      });
    } catch (e) {
      console.error(e);
      return errorMessage('O usuário foi criado com sucesso, porem obtivemos um problema ao recuperar os dados!');
    }


    toast("Usuário criado com sucesso !!", {
      type: "success"
    })
    navigation('/shop')
    setUserRegister(initialForm)
  }

  return (
    <>
      <Navbar />
      <Grid>
        <Typography
          mt="1rem"
          variant='h3'
          fontFamily="Josefin Sans"
          textAlign="center"
          color="#433389"
          fontWeight="bold"
        >
          Register
        </Typography>
        <Grid
          container
          mt="2rem"
          spacing={3}
          justifyContent="center"
        >

          <Grid
            component="form"
            item
            sm={6}
            onSubmit={handleSubmitRegister}
            container
            alignItems="center"
          >
            <Grid
              bgcolor="#fff"
              borderRadius="5px"
              item
              sm={5}
            >
              <TextField
                id="input-cpf"
                label="CPF"
                placeholder="000.000.000-00"
                variant="outlined"
                value={userRegister.cpf}
                onChange={(e) => setInput({ cpf: cpfMask(e.target.value) })}
                required
              />
            </Grid>
            <Grid
              bgcolor="#fff"
              borderRadius="5px"
              item
              sm={5}
            >
              <TextField
                id="input-username"
                label="Username"
                placeholder="edu.prad0"
                variant="outlined"
                required
                value={userRegister.username}
                onChange={(e) => setInput({ username: e.target.value })}
              />
            </Grid>

            <Grid
              bgcolor="#fff"
              borderRadius="5px"
              item
              sm={9.2}
            >
              <TextField
                id="input-email"
                label="Email"
                fullWidth
                type="email"
                placeholder="prado@meadow.ola"
                variant="outlined"
                value={userRegister.email}
                onChange={(e) => setInput({ email: e.target.value })}
                required
              />
            </Grid>


            <Grid
              item
              sm={12}
            >
              <Typography
                variant="body1"
                color="rgba(0,0,0,0.5)"
                fontSize="0.7rem"
              >
                A senha deverá conter 4 caracteres
              </Typography>
            </Grid>
            <Grid
              bgcolor="#fff"
              borderRadius="5px"
              item
              maxWidth="230px"
            >
              <TextField
                id="input-password"
                type={controllerVisibility[0] ? "text" : "password"}
                label="password"
                variant="outlined"
                value={userRegister.password}
                onChange={(e) => setInput({ password: e.target.value })}
                inputProps={{
                  maxLength: 4,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {
                        controllerVisibility[0]
                          ? <VisibilityIcon sx={{ cursor: "pointer" }} onClick={() => setControllerVisibility([false, controllerVisibility[1]])} />
                          : <VisibilityOffIcon sx={{ cursor: "pointer" }} onClick={() => setControllerVisibility([true, controllerVisibility[1]])} />
                      }
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              bgcolor="#fff"
              borderRadius="5px"
              item
              ml="43px"
              maxWidth="230px"
            >
              <TextField
                id="input-confirm-password"
                label="Confirm password"
                type={controllerVisibility[1] ? "text" : "password"}
                color={confirmPassword === userRegister.password && userRegister.password.length > 3 ? 'success' : 'error'}
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                inputProps={{
                  maxLength: 4,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {
                        controllerVisibility[1]
                          ? <VisibilityIcon sx={{ cursor: "pointer" }} onClick={() => setControllerVisibility([controllerVisibility[0], false])} />
                          : <VisibilityOffIcon sx={{ cursor: "pointer" }} onClick={() => setControllerVisibility([controllerVisibility[0], true])} />
                      }
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              item
              sm={9.2}
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            sm={3}
          >
            <img src={ImgItem} alt="girl" />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
} 