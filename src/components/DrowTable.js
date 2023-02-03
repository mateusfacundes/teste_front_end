import React, {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { id: 'nome', label: 'Nome da instituição', minWidth: 100 },
    { id: 'cityState', label: 'Cidade e Estado', minWidth: 100 },
    { id: 'isWorking', label: 'Situaçãoo funcionamento', minWidth: 100 },
    { id: 'classification', label: 'Dependência administrativa', minWidth: 100 },
    { id: 'average', label: 'Média no ENEM', minWidth: 100 },
];


function createData(nome, cityState, isWorking, classification, average) {
    console.log(nome)
  return { nome, cityState, isWorking, classification, average};
}



export default function DrowTable(data) {
    let rows = [];
    useEffect(() =>{
        console.log(data)
        if (data.data.length != 0){
            data.data[1].map((row) => {
                return(
                    rows.push(createData(row.nome, row.cidade +" - "+ row.estado , row.situacaoFuncionamentoTxt, row.situacaoFuncionamentoTxt, row.enemMediaGeral))
                )
            });
        }
        else{

        }
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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
         />
    </Paper>
  );
}

/*
<TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.cod}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

*/