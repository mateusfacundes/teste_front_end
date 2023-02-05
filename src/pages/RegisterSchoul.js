import React, {useState, useEffect} from "react";

import axios from 'axios';

import config from '../config.json';

import DrowTable from "../components/DrowTable";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button  from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl } from "@mui/material";

export default function RegisterSchoul() {
    const [formData, setFormData] = useState([]);
    const [isValidated, setisValidated] = useState(true);

    const locationOptions = config.localization;
    let location = 0;

    const handleChangeOption = (event) =>{
       location = event.target.value
       handleChangeForm();
    }

    const handleChangeForm = () => {
        if(document.getElementById('schoulName').value != null && document.getElementById('directorName').value  != null && location > 0 ){
            if(document.getElementById('morning').checked === true || document.getElementById('afternoon').checked === true || document.getElementById('night').checked === true){
                setisValidated(false);
            }
        }else{
            setisValidated(true);
        }
    }

    const handleSubmit = () =>{
        const schoulName = document.getElementById('schoulName').value;
        const directorName = document.getElementById('directorName').value;
        const shifts = [
            document.getElementById('morning').checked   ? 'M' : null,
            document.getElementById('afternoon').checked   ? 'T' : null,
            document.getElementById('night').checked   ? 'N' : null
        ]
        const data = {escola: {"nome":schoulName, "diretor":directorName, "localizacao": location, "turnos": shifts.filter((item) => {return item})} }
        
        axios.post(config.local_db_url+"/schous", data)
        .then((response) => {
            setFormData((prevData => [...prevData, data]))
            console.log(formData);
        });
    }


    useEffect(() => {
        axios.get(config.local_db_url+"/schous")
        .then((response) => setFormData(response.data));
    },[])

    
    
    return(
        <Paper sx={{ width: '80%', margin: '30px auto', padding: '10px'}}>
            
            <Grid item xs={12}>
                <h1>Registrar escolas</h1>
            </Grid> 

            <Grid sx={{ flexGrow: 1 }} container spacing={1} rowSpacing={3}>
                <Grid item md={4} xs={12}>
                    <TextField id="schoulName" label="Nome da Escola" variant="outlined" onChange={handleChangeForm} required/>
                </Grid>

                <Grid item md={4} xs={12}>
                    <TextField id="directorName" label="Nome do diretor" variant="outlined" onChange={handleChangeForm} required/>
                </Grid>

                <Grid item md={4} xs={12}> 
                    <FormControl sx={{  minWidth: 200 , maxWidth: 400}}>   
                        <InputLabel id="location-label">Localização</InputLabel>
                        <Select
                        defaultValue = "Selecione o estado"
                        labelId="location-label"
                        id="location"
                        label="Localização"
                        onChange={handleChangeOption}
                        required
                        
                        >
                        {locationOptions.map((location) => {
                            return (
                            <MenuItem key={location.value} value={location.value}>{location.name}</MenuItem>    
                            )
                        })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={12} xs={12} >
                    <FormControlLabel sx={{  minWidth: 20 , maxWidth: 120}} control={<Checkbox  id="morning" onChange={handleChangeForm}/>} label="Matutino" />
                    <FormControlLabel sx={{  minWidth: 20 , maxWidth: 120}} control={<Checkbox  id="afternoon" onChange={handleChangeForm}/>} label="Vespertino" />
                    <FormControlLabel sx={{  minWidth: 20 , maxWidth: 120}} control={<Checkbox  id="night" onChange={handleChangeForm}/>} label="Noturno" />
                </Grid>
            </Grid> 

            <Button type='submit' color='primary' variant="contained" disabled={isValidated}  onClick={handleSubmit} sx={{ m: 3, minWidth: 200 }}>Cadastrar </Button>
            

            <DrowTable data={formData} isRegister={true}/>
        </Paper>
    )
}