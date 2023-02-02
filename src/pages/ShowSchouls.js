import React, {useState, useEffect} from 'react';

import axios from 'axios';

import config from '../config.json'

import DrowTable from '../components/DrowTable';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';
import Fade from '@mui/material/Fade';
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
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  async function getCitys(selectedState){
    setIsloading(true);
    await axios.get(config.api_url+"/cidades/"+selectedState, configAxios)
    .then((response) => setCitys(response.data))
    setIsloading(false);
    console.log(citys);
  }

  async function getSchouls(cityCod){
    setIsloading(true);
    await axios.get(config.api_url+"/escolas/buscaavancada?cidade="+cityCod)
    .then((response) => setData(response.data))
    setIsloading(false);
    console.log(data)
  }

  const handleChangeState = (event) => {
    getCitys(event.target.value);
  };

  const handleChangeCity = (event) => {
    console.log(event.target)
  }

  return (
      <Paper sx={{ width: '70%', overflow: 'hidden', margin: '0 auto' }}>
        <Fade
            in={isloading}
            style={{
              transitionDelay: isloading ? '1ms' : '0ms',
            }}
            unmountOnExit
          >
          <LinearProgress />
        </Fade>
  
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
              renderInput={(params) => <TextField {...params} label="Cidades" />}
              onChange={(event, value) => getSchouls(value.slice(0,7))} 
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={citys}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Nome da Escola" />}
            />
            <Button variant="contained">Pesquisar</Button>

          </FormControl>
          
          <DrowTable />

      </Paper>
  );
}