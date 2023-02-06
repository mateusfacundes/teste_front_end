import React, {useState} from 'react';

import axios from 'axios';

import config from '../config.json'

import Loading from '../components/loading';
import DrowTable from '../components/DrowTable';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Button  from '@mui/material/Button';

import Grid from '@mui/material/Grid';

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
    .then((response) => {
      setCitys(response.data);
      setIsloading(false);
    })
    .catch((error) => {
      alert("Deu ruim");
      setIsloading(false);
    });
  }

  async function getSchouls(searchData, isByName){
    let path;
    if (isByName){
      path = "/escolas?nome="
    }
    else{
      path = "/escolas/buscaavancada?cidade="
    }
    setIsloading(true);
    
    await axios.get(config.api_url+path+searchData)
    .then((response) => {
      console.log(response.data)
      setData(response.data);

      setIsloading(false);
    })
    .catch((error) => {
      alert("Deu ruim")
      setIsloading(false);
    });
  }

  const handleChangeState = (event) => {
    getCitys(event.target.value);
  };

  const handleNameSearch = () => {
    let schoulName = document.getElementById("schoulName").value;
    getSchouls(schoulName, true);
  }

  return (
    <Grid container>
        <Paper sx={{ width: '80%', margin: '30px auto'}}>

          <Loading loading={isloading} />
          
          <h1>Pesquisa sua escola </h1>
            
            <Box sx={{margin: '1%'}}>
              <FormControl sx={{ m: 1, minWidth: 200 , maxWidth: 400}}>
                <InputLabel id="state-label">Estado</InputLabel>
                <Select
                  defaultValue = "Selecione o estado"
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
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={citys}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Cidades" />}
                  onChange={(event, value) => getSchouls(value.slice(0,7))} 
                />
              </FormControl>

            </Box>
            <Box sx={{margin: '1%'}}>
              <FormControl sx={{ m: 1, minWidth: 100 }}> 
                  <TextField id="schoulName" label="Nome da escola" variant="outlined" />
                </FormControl>
              <Button type='submit' color='primary' variant="contained" onClick={handleNameSearch}  sx={{ m: 3, minWidth: 200 }}>Pesquisar por nome </Button>
            </Box>
            
            <DrowTable data ={data} isRegister={false}/>

        </Paper>
      </Grid>
  );
}