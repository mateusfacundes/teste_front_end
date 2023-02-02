import React, {useState, useEffect} from 'react';

import axios from 'axios';

import config from '../config.json'

import DrowTable from '../components/DrowTable';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';

import { Button } from '@mui/material';

const configAxios = {
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
};

export default function ShowSchouls() {
  const allStates = config.uf
  const [citys, setCitys] = useState([]);

  async function getCitys(selectedState){
    await axios.get(config.api_url+"/cidades/"+selectedState, configAxios)
    .then((response) => setCitys(response.data))
    console.log(citys);
  }

  async function getSchouls(){
  
  }

  const handleChangeState = (event) => {
    getCitys(event.target.value);
  };

  return (
    <Box sx={{wideth: 200, height: 200, display: 'flex', flexWrap: 'wrap' }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    
            <h1>Escolas Cadastradas</h1>
            <FormControl>
              <InputLabel id="state-label">Estado</InputLabel>
              <Select
                defaultValue = ""
                labelId="state-label"
                id="state-select"
                label="States"
                onChange={handleChangeState}
              >
                {allStates.map((state) => {
                  return (
                    <MenuItem key={state.sigla} value={state.sigla}>{state.nome}</MenuItem>    
                  )
                })}
              </Select>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={citys}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
              />

              <TextField
                label="Nome da Escola"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
              />

              <Button variant="contained">Pesquisar</Button>

            </FormControl>
            
            <DrowTable />

        </Paper>
    </Box>
  );
}