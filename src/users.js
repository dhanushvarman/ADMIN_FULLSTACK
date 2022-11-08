import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './usercontext';
import {config} from "./config"

function Users() {
  const userData = useContext(UserContext);

  const[users,setUsers]= useState([]);
  const[isLoading,setLoading] = useState(false);
  
  useEffect(()=>{
    const fetchdata = async ()=>{
      try {
        setLoading(true)
        const users = await axios.get(`${config.api}/users`)
        setUsers(users.data)
        console.log(users.data);
        setLoading(false)
      } catch (error) {
        alert("something went wrong")
      }
    };
    fetchdata();
  },[])

  const deleteUser = async (userId)=>{
    try {
      await axios.delete(`${config.api}/user/${userId}`)
      const userIndex = users.findIndex((user)=>user.id == userId)
      users.splice(userIndex,1)
      setUsers([...users])
    } catch (error) {
      alert("something went wrong")
    }
  }

  return (
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">USERS</h1>
        <Link to={"createuser"} href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fa-solid fa-user-plus mr-1"></i>Create User</Link>
      </div>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr id='heading'>
                  <th>Name</th>
                  <th>EMAIL</th>
                  <th>STATE</th>
                  <th>GENDER</th>
                  <th>PHONE NUMBER</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              {
                users.map((user)=>{
                  return <tbody>
                  <tr id="column">
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.state}</td>
                    <td>{user.gender}</td>
                    <td>{user.phone}</td>
                    <td><Link to={`/portal/users/viewuser/${user._id}`} className='btn btn-sm btn-success mr-2'><i class="fa-solid fa-eye fa-sm mr-1"></i>View</Link>
                    <Link to={`/portal/users/edituser/${user._id}`} className='btn btn-sm btn-warning mr-2 '><i class="fa-solid fa-sm mr-1  fa-user-pen"></i>Edit</Link>
                    <button className='btn btn-sm btn-danger' onClick={()=>{deleteUser(user._id)}}><i class="fa-solid fa-sm mr-1 fa-trash"></i>Delete</button></td>
                  </tr>
                </tbody>
                })
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users