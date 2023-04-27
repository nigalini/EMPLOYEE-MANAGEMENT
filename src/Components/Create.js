import { Button, Grid, IconButton, InputAdornment, MenuItem, Paper,TextField, Typography } from '@mui/material'
import axios from 'axios'
import {useLocation, useNavigate} from 'react-router-dom'
import React, { Fragment, useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const des= ["Manager","Designer","Analyst","HR"]
const Create = () => {
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [dob,setDob]=useState(new Date())
  const [mobile,setMobile]=useState("")
  const [designation,setDesignation]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [passwordVisible,setPasswordVisible]=useState(false)
  const navigate = useNavigate();
  const location=useLocation();
  //to create object with state level values
  const val={
    
    firstName:firstName,
    lastName:lastName,
    dob:dob,
    mobile:mobile,
    designation:designation,
    password:password,
    email:email  
   }
   //to create emp
  const createEmployee =async()=>{
   await axios.post("https://644077bb792fe886a88f63d3.mockapi.io/employee",val).then((res)=>{
    console.log(res)
    if(res.data){
      navigate("/read")
    }
   })

  }; 
  //to update an emp
  const updateEmployee =async(id)=>{
    await axios.put(`https://644077bb792fe886a88f63d3.mockapi.io/employee/${id}`,val).then((res)=>{
     if(res.data){
       navigate("/read",{state:{}})
     }
    })
 
   }; 

   //to get emp details by id

   
  const getEmployee =async(id)=>{
    await axios.get(`https://644077bb792fe886a88f63d3.mockapi.io/employee/${id}`).then((res)=>{
     if(res.data){
       setFirstName(res.data.firstName)
       setLastName(res.data.lastName)
       setDob(res.data.dob)
       setDesignation(res.data.designation)
       setEmail(res.data.email)
       setPassword(res.data.password)
       setMobile(res.data.mobile)
     }
    })
 
   }; 
   //to get emp id in state level
useEffect(()=>{
if(location.state){
  getEmployee(location.state.id)
}
},[])
  return (
   <Fragment>
    <Grid container justifyContent="center" textAlign="center">

      <Grid item md={5} xs={12}>
<Paper sx={{p:3}}>
  <Typography variant='h4' sx={{mb:2}} fontWeight="bold">{ location.state && location.state.id ? "Update" :"Create"}</Typography>
<TextField fullWidth  sx={{mb:2}} value={firstName} onChange={(e)=>setFirstName(e.target.value)} label="First Name" />
<TextField fullWidth sx={{mb:2}} value={lastName} onChange={(e)=>setLastName(e.target.value)} label="Last Name" />
<TextField fullWidth sx={{mb:2}} value={mobile} onChange={(e)=>setMobile(e.target.value)} label="Mobile" />
<TextField type="date" fullWidth sx={{mb:2}} value={dob} onChange={(e)=>setDob(e.target.value)} label="DOB" />
<TextField fullWidth sx={{mb:2}} value={email} onChange={(e)=>setEmail(e.target.value)} label="Email" />
<TextField fullWidth type={passwordVisible ? "text" :"password"} sx={{mb:2}} value={password} onChange={(e)=>setPassword(e.target.value)} label="Password"  
InputProps={{
            endAdornment: <InputAdornment position="end">
<IconButton onClick={()=>setPasswordVisible(!passwordVisible)}>
  {
    passwordVisible ? <VisibilityOff /> :<Visibility />
  }
</IconButton>
            </InputAdornment>,
          }} />
<TextField select fullWidth sx={{mb:2}} value={designation} onChange={(e)=>setDesignation(e.target.value)} label="Designation" >
  {
    des.map((res,key)=>{
return <MenuItem key={key} value={res}>
  {res} 
</MenuItem> 
    })
  }

</TextField>
<Button fullWidth onClick={()=>{
 location.state && location.state.id ? updateEmployee(location.state.id) :createEmployee()
}} size='large' variant="contained">{
  location.state && location.state.id ? "Update" :"Create"
}</Button>
</Paper>
        </Grid>

    </Grid>
   </Fragment>
  )
} 

export default Create
