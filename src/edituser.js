import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {config} from "./config"



function Createuser() {
    const params = useParams();

    useEffect(()=>{
        const fetchdata = async()=>{
            try {
                alert("Server is loading...,This may take few minutes")
                const user =   await axios.get(`${config.api}/user/${params.id}`)
                formik.setValues(user.data)
                
            } catch (error) {
                alert("Error")
            }
        }
        fetchdata();
    },[])
    
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            office: "",
            state: "",
            dob: "",
            phone: "",
            salary: "",
            gender: "",
        },
        validate: (values) => {
            let error = {};

            if (!values.name) {
                error.name = "Please enter a name";
            }
            if (values.name && (values.name.length <= 2 || values.name.length > 15)) {
                error.name = "Name must be between 3 to 15 characters";
            }
            if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(values.email)) {
                error.email = "Please enter a email";
            }
            if (values.phone.toString().length != 10) {
                error.phone = "Please enter a valid number";
            }

            return error
        },
        onSubmit: async (values) => {
            try {
                await axios.put(`${config.api}/user/${params.id}`,values)
                alert("User Updated Successfully")
                formik.resetForm();
            } catch (error) {
                alert("Error")
            }
        }
    })

    console.log(formik.values)

    return (
        <div className='container'>
            <Link to={"/portal/users"} className="btn btn-primary mb-3"><i class="fa-solid fa-sm fa-left-long mr-1"></i>BACK</Link>
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label>Name</label>
                            <input name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={`form-control ${formik.errors.name ? 'error-box' : ''} 
                        ${formik.touched.name && !formik.errors.name ? 'success-box' : ''}`}
                                type={"text"}>

                            </input>
                            {
                                formik.errors.name ? <span style={{ color: "red" }}>{formik.errors.name}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label>Email</label>
                            <input name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`form-control ${formik.errors.email ? 'error-box' : ''} 
                        ${formik.touched.email && !formik.errors.email ? 'success-box' : ''}`}
                                type={"text"}>

                            </input>
                            {
                                formik.errors.email ? <span style={{ color: "red" }}>{formik.errors.email}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <div className='form-group'>
                                <label>Office</label>
                                <input name="office"
                                    onChange={formik.handleChange}
                                    value={formik.values.office}
                                    className='form-control'
                                    type={"text"}></input>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <div className='form-group'>
                                <label>State</label>
                                <select name="state"
                                    onChange={formik.handleChange}
                                    value={formik.values.state}
                                    className='form-control'>
                                    <option>Select State...</option>
                                    <option>Tamil Nadu</option>
                                    <option>Karnataka</option>
                                    <option>Bangalore</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <label>Date of Birth</label>
                            <input name="dob"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.dob}
                                className={`form-control ${formik.errors.dob ? 'error-box' : ''} 
                        ${formik.touched.dob && !formik.errors.dob ? 'success-box' : ''}`}
                                type={"date"}>
                            </input>
                            {
                                formik.errors.dob ? <span style={{ color: "red" }}>{formik.errors.dob}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <label>Phone Number</label>
                            <input name="phonenumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                className={`form-control ${formik.errors.phone ? 'error-box' : ''} 
                        ${formik.touched.phone && !formik.errors.phone ? 'success-box' : ''}`}
                                type={"number"}>
                            </input>
                            {
                                formik.errors.phone ? <span style={{ color: "red" }}>{formik.errors.phone}</span> : null
                            }
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <label>Salary</label>
                            <input name="salary"
                                onChange={formik.handleChange}
                                value={formik.values.salary}
                                className='form-control'
                                type={"number"}></input>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <label>Gender</label>
                            <select name="gender"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.gender}
                                className='form-control'>
                                <option>Select Gender...</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <input type={"submit"} value={"UPDATE"} className="btn btn-success"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Createuser