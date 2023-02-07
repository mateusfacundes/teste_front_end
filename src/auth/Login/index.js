import React, {useState} from 'react';

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


export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmitLogin = async (event) => {
        

        event.preventDefault();
        setIsLoading(true)

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        await axios.get(config.local_db_url+"/users?username="+username)
        .then((response) =>{
            if(response.data.length > 0){
                if(response.data[0].password === password){
                    setIsLoading(false)
                    localStorage.clear();
                    localStorage.setItem('user-token', response.data[0].username);
                    navigate("/");
                }
                else{
                    setIsError(true)
                    setIsLoading(false); 
                }
            }else{
                setIsError(true)
                setIsLoading(false);
            }
            
            
        })
        
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
            <Paper elevation={10} style={paperStyle} sx={{minWidth: 250, maxWidth: 500, minHeight: 300}}>
                <Loading loading={isLoading}/>
                {
                    isError ? 
                    <Alert severity="error">Usuraio não cadastrado ou senha inválida</Alert>
                    : 
                    ''
                }
                <Grid align='center'  sx={12}>
                    <h2>Entrar</h2>
                </Grid>
                
                <Grid container spacing={2}>

                    <Grid align='center' xs={12} sx={{margin: '10px'}}>
                        <TextField id='username' label='Usuario'  variant="outlined" fullWidth  />
                    </Grid>
                    <Grid align='center' xs={12} sx={{margin: '10px'}}>
                        <TextField  id='password' label='Senha'  type='password' variant="outlined" fullWidth />
                    </Grid>
                    <Grid align='center' xs={12} sx={{margin: '10px'}}>
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSubmitLogin} fullWidth>Entrar </Button>
                    </Grid>
                    <Grid align='center' xs={12} sx={{margin: '10px'}}>
                        <Link onClick={() => navigate('/auth/register')} underline="none">
                            Registrar
                        </Link>
                    </Grid>
                    
                    
                </Grid>

            </Paper>    
        </Grid>
    )
}

