import React from 'react'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const Login=()=>{

    const paperStyle={padding :20,height:'70vh',width:'70%'}
    
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
            <Paper elevation={10} style={paperStyle}>
                <Grid item xs={6} md={4}>      
                    <Grid align='center'>
                        <h2>Entrar</h2>
                    </Grid>
                    <TextField label='Usuario' placeholder='Usuario' variant="outlined" fullWidth required/>
                    <TextField label='Senha' placeholder='Senha' type='password' variant="outlined" fullWidth required/>

                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Entrar </Button>
                </Grid>
                <Grid item xs={6} md={4}>   
                    <Grid align='center'>
                        <h2>Registrar</h2>
                    </Grid>
                    <TextField label='Usuario' placeholder='Usuario' variant="outlined" fullWidth required/>
                    <TextField label='Senha' placeholder='Senha' type='password' variant="outlined" fullWidth required/>
                    <TextField label='Confirme a senha' placeholder='Confirme a senha' type='password' variant="outlined" fullWidth required/>

                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Registrar</Button>
                </Grid>  
            </Paper>    
        </Grid>
    )
}

export default Login