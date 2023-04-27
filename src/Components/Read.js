import { Add, ChevronLeft, Delete, Edit } from '@mui/icons-material'
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState,Fragment, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {  downloadExcel } from 'react-export-table-to-excel';

 

export default function Read() {

  const [employee,setEmployee]=useState([])
  const navigate=useNavigate()
  const excelRef=useRef(null)
  console.log(employee)
  const header = ["Firstname", "Lastname", "Age","Mobile","Email","Password","Designation","ID"];
//to dwnld in excel
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "employee data -> downloadExcel method",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        // accept two different data structures
        body:employee,
      },
    });
  }


//to dwnd pdf
const tableDwnldPDF=()=>
  {
 
  
}


  //get function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async()=>{
    const {data} = await axios.get("https://644077bb792fe886a88f63d3.mockapi.io/employee")
setEmployee(data)
}
// to get emp details when its length is 0(without reloading read page)
  useEffect(()=>{
if(employee.length===0){
  fetchData()
}
  },[employee,fetchData])
  //to delete an employee
  const deleteEmp = async(id)  => {
     await axios.delete(`https://644077bb792fe886a88f63d3.mockapi.io/employee/${id}`).then((res)=>{
      if(res.data){
        setEmployee([])
      }
     })

  }
  


  return (
   <Fragment>
    <Box sx={{justifyContent:"space-between",alignContent:"space-between",width:"100%"}}>
    <Button startIcon={<ChevronLeft />} color="secondary" variant='contained' sx={{mb:2}} onClick={()=>navigate(-1)}> Go Back</Button>
    <Button startIcon={<Add />} variant='contained' sx={{mb:2,float:"right"}} onClick={()=>navigate('/')}> Create</Button>
    {/* <DownloadTableExcel
                    filename="EMPLOYEE DETAILS"
                    sheet="employee"
                    currentTableRef={excelRef.current}
                >


                   <button> Export excel </button>

                </DownloadTableExcel> */}
                <Button onClick={handleDownloadExcel}>
                  DOWNLOAD EXCEL
                </Button>
                <Button onClick={tableDwnldPDF}>
                  PDF DOWNLOAD
                </Button>
    </Box>
<TableContainer  component={Paper}>
  
  <Table ref={excelRef} stickyHeader>
  
    <TableHead  >
      <TableCell>
        ID
      </TableCell>
      <TableCell>
        FIRST NAME
      </TableCell><TableCell>
        LAST NAME
      </TableCell><TableCell>
        DOB
      </TableCell><TableCell>
        EMAIL
      </TableCell><TableCell>
        DESIGNATION
      </TableCell><TableCell>
        MOBILE NUMBER
      </TableCell><TableCell>
        Action
      </TableCell>
      <TableCell>
        Delete
      </TableCell>
    </TableHead>
    
    <TableBody>
      {
       
       
     employee.length > 0  ?  employee.map((res,key)=>{
          return (
              <TableRow key={key} >
          <TableCell>
            {res.id}
          </TableCell>
          <TableCell>
          {res.firstName}
          </TableCell><TableCell>
            {res.lastName}
          </TableCell><TableCell>
            {res.dob}
          </TableCell><TableCell>
            {res.email}
          </TableCell><TableCell>
            {res.designation}
          </TableCell><TableCell>
           {res.mobile}
          </TableCell><TableCell>
            <IconButton onClick={()=>{
              navigate('/',{state:{"id":res.id}})
            }}>
              <Edit/>
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton onClick={()=>{
              deleteEmp(res.id)
            }}>
              <Delete/>
            </IconButton>
          </TableCell>
        </TableRow>)
        }) :  employee.length===0 &&
        <TableRow>
          <TableCell colSpan={9} sx={(props)=>({
            textAlign:"center",color:props.palette.error.dark
          })}>No record found</TableCell>
        </TableRow>
      }
    </TableBody>
    
  </Table>
</TableContainer>

    </Fragment>
  )
}
