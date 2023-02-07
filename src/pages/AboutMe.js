import React from "react";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { textAlign } from "@mui/system";

const baseStyle = { width: '70%', margin: '30px auto', padding: '10px', paddingBottom: '40px'};
const paperStyle={height:'80%'}

export default function AboutMe() {

    return(
        <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: '1fr 1fr' },
          gap: 2,
          minWidth: '60%',
          maxWidth: '80%',
          margin: '0 auto',
          
        }}
      >
            <Grid xs={12} md={4}>
                <Paper sx={baseStyle} style={paperStyle}>
                    <h1>Sobre mim</h1>
                    <p style={{textAlign: 'justify'}}>
                        Meu nome é <b>Mateus Marchão</b>, sou formado em <b>ciência da computação</b> sou programador e pretendo sempre estudar e evoluir nesta area. 
                    </p>
                    <PersonOutlinedIcon sx={{ fontSize: 40 }}/>
                </Paper>
            </Grid>
            <Grid xs={12} md={4}>
                <Paper sx={baseStyle} style={paperStyle}>
                    <h1>Sobre o Projeto</h1>
                    <p style={{textAlign: 'justify'}}>
                        O projeto foi desenvolvido em React utilizando as bibliotecas <b>Material UI</b> criação dos layouts
                        , <b>Axios</b> para facilitar as requisições, <b>react router</b>  para navegação entre paginas e <b>json-server</b> para criação de um servidor local com as informações de login e escolas.
                    </p>
                    <SettingsOutlinedIcon sx={{ fontSize: 40 }}/>
                </Paper>
            </Grid>
            <Grid xs={12} md={4}>
                <Paper sx={baseStyle} style={paperStyle}>
                    <h1>Desafios</h1>
                    <p style={{textAlign: 'justify'}}>
                        O maior desafio que encontrei dentro deste trabalho foi de colocar meus conhecimentos em pratica
                        entre as pausas que tive do meu emprego. Acredito que consegui superar esta dificuldade gerenciando 
                        de forma efetiva o tempo, escalando tarefas com prioridade e sempre tirando tempo para planejar as 
                        funções implementadas. 
                    </p >
                    <HikingOutlinedIcon sx={{ fontSize: 40 }}/>
                </Paper>
            </Grid>
            <Grid xs={12} md={4}>
                <Paper sx={baseStyle} style={paperStyle}>
                    <h1>Sugestões</h1>
                    <p style={{textAlign: 'justify', margin: '20px'}}>
                        Não possuo observações.
                    </p>
                    <LightbulbOutlinedIcon sx={{ fontSize: 40 , marginTop: '30px'}}/>
                </Paper>
            </Grid>
        </Box>
    )
}