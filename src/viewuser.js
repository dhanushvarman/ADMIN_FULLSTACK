import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Await, Link, resolvePath, useParams } from 'react-router-dom'
import {config} from "./config"


function Viewuser() {
  const params = useParams();
  const[users,setUsers]= useState([]);
  useEffect(()=>{
   
    fetchdata()
  },[])

  
    let fetchdata = async()=>{
      try{
        const users = await axios.get(`${config.api}/user/${params.id}`)
        setUsers(users.data)
      }catch(error){
        alert("Error")
      }
    }
    console.log(users.name)

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-2'>
        
      <Link to={"/portal/users"} className="btn btn-primary mb-3"><i class="fa-solid fa-sm fa-left-long mr-1"></i>BACK</Link>
        </div>
        <div className='col-lg-8 text-center '>
        <h1 className="card-text  bg-dark" style={{color:"white"}}>USER DETAILS</h1>
        </div>
      </div>
      <div class="card" style={{ width: "25rem", padding: "40px", marginLeft: "350px", marginTop: "20px" }}>
        
        <div class="card-body">
          <div class="card-title"><b style={{color:"black"}}>NAME: </b>{users.name}</div>
          <div class="card-title"><b style={{color:"black"}}>GENDER </b>{users.gender}</div>
          <div class="card-title"><b style={{color:"black"}}>EMAIL: </b>{users.email}</div>
          <div class="card-title"><b style={{color:"black"}}>OFFICE: </b>{users.office}</div>
          <div class="card-title"><b style={{color:"black"}}>SALARY: </b>{users.salary}</div>
          <div class="card-title"><b style={{color:"black"}}>STATE: </b>{users.state}</div>
          <div class="card-title"><b style={{color:"black"}}>PH NO: </b>{users.phone}</div>
          <div className='text-center'>
          <Link to={`/portal/users/edituser/${params.id}`} className='btn btn-warning mr-2 mt-3'><i class="fa-solid fa-sm mr-1 fa-user-pen"></i>Edit</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewuser