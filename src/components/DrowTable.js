import React, {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const showPageOption = ["Nome da instituição", "Cidade e Estado", "Situação de funcionamento", "Dependência administrativa"];
const registerPageOption = ["Nome da escola","Nome do diretor", "Localização da escola", "Turnos"];

export default function DrowTable({data, isRegister}) {
  
  const [tabledata, setTableData] = useState([]);

  useEffect(() =>{
    isRegister ?   setTableData(data) : setTableData(data[1])  
    
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function shiftExchanger(shift){
    if(shift === 'M'){
      return("Matutino ")
    }
    if(shift === 'T'){
      return("Vespertino ")
    }
    if(shift === 'N'){
      return("Oturno ")
    }

  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {isRegister ? 
                                registerPageOption.map((item, index) => (
                                  <TableCell key={index}>{item}</TableCell>
                                ))
                                :
                                showPageOption.map((item, index) => (
                                  <TableCell key={index}>{item}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tabledata ? 
                        isRegister ? 
                          tabledata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((list, index) => (
                            <TableRow key={index}>
                                <TableCell>{list.escola.nome}</TableCell>
                                <TableCell>{list.escola.diretor}</TableCell>
                                <TableCell>{list.escola.localizacao === 1? 'Urbano' : 'Rural'}</TableCell>
                                <TableCell>{list.escola.turnos.map((shift) => shiftExchanger(shift))}</TableCell>
                            </TableRow>
                          ))
                        :
                        tabledata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((list, index) => (
                          <TableRow key={index}>
                              <TableCell>{list.nome}</TableCell>
                              <TableCell>{list.cidade}-{list.estado}</TableCell>
                              <TableCell>{list.situacaoFuncionamentoTxt}</TableCell>
                              <TableCell>{list.dependenciaAdministrativaTxt}</TableCell>
                          </TableRow>
                        ))
                        :
                      <TableRow >
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                      </TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tabledata ? tabledata.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
    </Paper>
  );
}
