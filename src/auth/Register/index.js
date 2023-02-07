import React, { useState} from 'react';

import axios from 'axios';
import config from '../../config.json';

import Loading from '../../components/loading';

import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import { useNavigate } from "react-router-dom";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isValid, setIsValid] = useState(true);
    
    const navigate = useNavigate();

    const handleSubmitLogin = async (event) => {
        

        event.preventDefault();
        setIsLoading(true)

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const data = {"username": username, "password": password};

        await axios.get(config.local_db_url+"/users?username="+username)
        .then((response) =>{
            if(response.data.length === 0){
                
                axios.post(config.local_db_url+"/users", data)
                .then((response) => {
                    setIsLoading(false)
                    localStorage.clear();
                    localStorage.setItem('user-token', response.data.username);
                    navigate("/");
                })

            }else{
                setIsError(true)
                setErrorMessage('Usuario já cadastrado')
                setIsLoading(false);
            }
            
            console.log(response.data);
        })
        
        
    }

    const handleChange = (event) =>{
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmpassword = document.getElementById('confirmpassword').value;

        if (username !== '' && password !== '' && confirmpassword !== ''){
            if(password === confirmpassword){
                setIsError(false)
                setIsValid(false);
                
            }
            else{
                setIsError(true)
                setErrorMessage('Senha e Confirmação de senha devem ser iguais')
            }
            
        }
        else{
            setIsValid(true);
        }
    }

    const paperStyle={padding :20,height:'70vh',width:'30%'}
    
    const btnstyle={margin:'8px 0'}
    return(
        <Grid   
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
            <Paper elevation={10} style={paperStyle} sx={{minWidth: 250, maxWidth: 500}}>
                <Loading loading={isLoading}/>
                {
                    isError ? 
                    <Alert severity="error">{errorMessage}</Alert>
                    : 
                    ''
                }
                <Grid align='center'  sx={12}>
                    <h2>Registrar</h2>
                </Grid>
                
                <Grid container spacing={2} >
                    <form onChange={handleChange} style={{margin: '0 auto'}}>
                        <Grid align='center' xs={12} sx={{margin: '10px'}}>
                            <TextField id='username' label='Usuario'  variant="outlined" fullWidth  />
                        </Grid>
                        <Grid align='center' xs={12} sx={{margin: '10px'}}>
                            <TextField  id='password' label='Senha'  type='password' variant="outlined" fullWidth />
                        </Grid>
                        <Grid align='center' xs={12} sx={{margin: '10px'}}>
                            <TextField  id='confirmpassword' label='Senha'  type='password' variant="outlined" fullWidth />
                        </Grid>
                        <Grid align='center' xs={12} sx={{margin: '10px'}}>
                            <Button type='submit' color='primary' disabled={isValid} variant="contained" style={btnstyle} onClick={handleSubmitLogin} fullWidth>Cadastrar </Button>
                        </Grid>
                    </form>
                    <Grid align='center' xs={12} sx={{margin: '10px'}}>
                        <Link onClick={() => navigate('/auth/login')} underline="none">
                            Login
                        </Link>
                    </Grid>
                </Grid>
            </Paper>    
        </Grid>
    )
}

