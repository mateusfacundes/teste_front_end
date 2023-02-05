import React, {useState} from 'react';

import axios from 'axios';
import config from '../../config.json';

import Loading from '../../components/loading';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { useNavigate } from "react-router-dom";


export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitLogin = async (event) => {
        

        event.preventDefault();
        setIsLoading(true)

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        await axios.get(config.local_db_url+"/users?username="+username)
        .then((response) =>{
            if(response.data.length > 0){
                console.log(response.data[0].password);
                if(response.data[0].password == password){
                    setIsLoading(false)
                    localStorage.clear();
                    localStorage.setItem('user-token', response.data[0].username);
                    navigate("/");
                }
            }else{
                navigate("/login");
                setIsLoading(false)
            }
            
            console.log(response.data);
        })
        
        console.log('log')
    }

    const paperStyle={padding :20,height:'70vh',width:'20%'}
    
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
            <Loading loading={isLoading}/>
            <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Entrar</h2>
                    </Grid>
                    <TextField id='username' label='Usuario'  variant="outlined" fullWidth  />
                    <TextField  id='password' label='Senha'  type='password' variant="outlined" fullWidth />

                    <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSubmitLogin} fullWidth>Entrar </Button>
            </Paper>    
        </Grid>
    )
}


/*
                <Grid item xs={6} md={4}>   
                    <Grid align='center'>
                        <h2>Registrar</h2>
                    </Grid>
                    <TextField label='Usuario' placeholder='Usuario' variant="outlined" fullWidth required/>
                    <TextField label='Senha' placeholder='Senha' type='password' variant="outlined" fullWidth required/>
                    <TextField label='Confirme a senha' placeholder='Confirme a senha' type='password' variant="outlined" fullWidth required/>

                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onSubmit={handleSubmitLogin}>Registrar</Button>
                </Grid>  
*/