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
import Alert from '@mui/material/Alert';

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
  const [cityCod, setCityCod] = useState('');
  const [alertMode, setalertMode] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [isValid, seIsvalid] = useState(true);

  async function getCitys(selectedState){
    setIsloading(true);
    await axios.get(config.api_url+"/cidades/"+selectedState, configAxios)
    .then((response) => {
      if(response.data.length === 0){
        setAlertMessage('Solicitação não encontrada');
        setalertMode('warning')
        setTimeout(() => {
          setAlertMessage('');
          setalertMode('')
        }, 3000);
      }
      setCitys(response.data);
      setIsloading(false);
    })
    .catch((error) => {      
      setAlertMessage('Aconteceu um erro carregar sua requisição');
      setalertMode('error')
      setTimeout(() => {
        setAlertMessage('');
        setalertMode('')
      }, 3000);

      setIsloading(false);
    });
  }

  async function getSchouls(searchData, isByName){
    let path = "/escolas/buscaavancada?";
    let schoulName = document.getElementById("schoulName").value;

    if (isByName){
      path += "&nome="+schoulName
      if(cityCod)
        path += "&cidade="+cityCod
      }
    else{
      path += "cidade="+searchData;
      if(schoulName !== ''){
        path += "&nome="+schoulName;
      }
    }
    setIsloading(true);
    
    await axios.get(config.api_url+path)
    .then((response) => {
      if(!response.data.length === 0){
        setAlertMessage('Solicitação não encontrada');
        setalertMode('warning')
        setTimeout(() => {
          setAlertMessage('');
          setalertMode('')
        }, 3000);
      }
      setData(response.data);

      setIsloading(false);
    })
    .catch((error) => {

      setAlertMessage('Aconteceu um erro carregar sua requisição');
      setalertMode('error')
      setTimeout(() => {
        setAlertMessage('');
        setalertMode('')
      }, 3000);

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

  const handleTextChange = (event) => {
    let schoulName = document.getElementById("schoulName").value;
    if(schoulName.length > 2){
      seIsvalid(false)
    }
    else{
      seIsvalid(true)
    }
  }

  return (
    <Grid container>
        <Paper sx={{ width: '90%', margin: '30px auto'}}>

          <Loading loading={isloading} />
          <Alert severity={alertMode}>{alertMessage}</Alert>
        
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
                  onChange={(event, value) => {
                    setCityCod(value.slice(0,7));
                    getSchouls(value.slice(0,7), false)
                  }} 
                />
              </FormControl>

            </Box>
            <Box sx={{margin: '1%'}}>
              <FormControl sx={{ m: 1, minWidth: 100 }}> 
                  <TextField onChange={handleTextChange} id="schoulName" label="Nome da escola" placeholder='3 ou mais caracteres' variant="outlined" />
                </FormControl>
              <Button type='submit' color='primary' variant="contained" disabled={isValid} onClick={handleNameSearch} sx={{ m: 2, minWidth: 200 }}>Pesquisar por nome </Button>
            </Box>
            
            <DrowTable data ={data} isRegister={false}/>

        </Paper>
      </Grid>
  );
}