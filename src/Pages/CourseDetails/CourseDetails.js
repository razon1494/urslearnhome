import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Courses from '../SearchCourse/data';
import './CourseDetails.css';
import { useForm } from "react-hook-form";
import Header from './Header';
const CourseDetails = () => {
    const params = useParams();
    const {courseId}=params;
    console.log(Courses);
    const {paymentData, setPaymentdata}=useState({});

    const exactCourse =  Courses.find(course => course.CourseId==courseId);
    const {Title, Vanue, fee, additionalContentFee, courseEndDate, courseFee, courseStartDate, inPersonDay, onlineDay, objective, registrationLastDate, sessions}=exactCourse;

    const { register, handleSubmit, reset } = useForm();
    const onSubmit=data => {
        console.log(data);
        setPaymentdata(data);
        reset();
    };
    return (
        <div>
            <Header></Header>
            <div className="d-flex  align-items-center justify-content-center">
            <div className="row container">
                <img className='col-md-5' src="https://i.ibb.co/FKGdvh9/Screenshot-138.png" alt="" />
                <div className="course-details col-md-5">
                    <p>WELCOME, AND WE LOOK FORWARD TO MEETING YOU FOR:</p>
                    <h2>DESTINATION RETIREMENT</h2>
                    <p>NOW BEING CONDUCTED AT </p>
                    <h3>{Vanue.name}</h3>
                    <p>{Vanue.address}</p>
                    <p>Currently offered in-person and online to accommodate all preferences.</p>
                    <h4>{inPersonDay}s are In-Person</h4>
                        <h4>{onlineDay}s are online</h4>
                        <p>This Course consists of {sessions.number} sessions. Each session duration is {sessions.hour} hours</p>
                        <h4>COURSE ID: {courseId}</h4>
                    </div>

                    <div className="d-flex align-items-center justify-content-center">
                        <div className="text-retire">
                            <h2>Destination Retirement</h2>
                            <p>
                                Destination Retirement is for anyone retired or looking to plan for retirement. In this course, we address financial issues about the self-employed and employees of corporations or government agencies. We will help you build your savings and show you how to accomplish your life goals. Whether you have recently retired or are planning to retire 20 years from now, the information you learn in this course will prove to be rewarding throughout your lifetime.
                            </p>
                            <h2>Course Objectives</h2>
                            <ol>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ol>
                        </div>
                        <div className="hook-form">
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className='m-2 w-50' {...register("firstName")} placeholder='First Name'  />
      <input className='m-2 ' {...register("secondName")} placeholder='Second Name' />
      <input className='my-2 w-100 ' {...register("address")} placeholder='Address' />
      <input className='m-2 w-25' {...register("city")} placeholder='City' />
      <input className='m-2 w-25' {...register("state")} placeholder='State' />
      <input className='m-2 w-25' {...register("zip")} placeholder='Zip' />
      <input className='m-2 w-100' {...register("email")} placeholder='Email Address' />
      <input className='m-2 w-50' {...register("phone")} placeholder='Phone Number' />

      <select className='w-25' {...register("preference")}>
        <option value="inPerson">In-Person</option>
        <option value="online">Online</option>
                                </select>
                                <br />
      <input className='btn btn-danger' value='Enroll Now' type="submit"  />
    </form>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    );
};

export default CourseDetails;











   // setIsLoading(!isLoading);

    // const url = 'https://urscoursedata-default-rtdb.firebaseio.com/Courses.json';
 /*    const url='https://urscoursedata-default-rtdb.firebaseio.com/Courses.json';
    let i=true;
    useEffect( () => {
       fetch(url)
            .then(res => res.json())
            .then( data => {
                 setCourses(data);
                console.log('From useeffect',courses)
            });
    }, [i]);

    i=false; */