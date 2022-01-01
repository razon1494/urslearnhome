
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResult.css'
const SearchResult = ({course}) => {

    const {CourseId, title, Vanue, name, address,inPersonDay, onlineDay, additionalText, objective,registrationLastDate,courseStartDate,courseEndDate,courseFee,additionalContentFee} = course;
  
    const [isActive, setIsActive] = useState(false);
    let rejectionMessage ='';

    let todate = new Date().toLocaleDateString();

    const today = Date.parse(todate);
    // const registrationStartDateNumber = Date.parse(registrationStartDate);
    const registrationLastDateNumber = Date.parse(registrationLastDate);
    const courseStartDateNumber = Date.parse(courseStartDate);
    const courseEndDateNumber = Date.parse(courseEndDate);
    /* if(today>registrationLastDateNumber){
        setIsActive(false);
        setRejectionMessage('Registration Deadline is Over');
    }
    if(today>courseStartDateNumber){
        setIsActive(false);
        setRejectionMessage('Course Started Registration is off');
    }
    if(today>courseEndDateNumber){
        setIsActive(false);
        setRejectionMessage('Course Ended');
    }

 */
    if(today>courseEndDateNumber){
        rejectionMessage ='Course Ended'
    }
    else if(today>courseStartDateNumber){
        rejectionMessage = 'Course Started, registration closed'
    }
    else if(today>registrationLastDateNumber){
        rejectionMessage = 'Registration is closed'
    }
   
   

    return (
        <div className='col-md-4 course-box m-5 p-3'>
            <div className="align-items-center justify-content-center">
            {/* <img className='img-fluid' src={imgurl} alt="" /> */}
            <div className="course-text">
           <h2>{CourseId}</h2>
           <h4>Venue: {Vanue.name}</h4>
           <h4>Fee: ${courseFee}</h4>
           <Link to={`/courses/${CourseId}`}>
<button className={`btn btn-danger ${rejectionMessage ? "disabled" : ""}`}>Enroll Now</button>
        </Link>
        <h6 className='text-primary'>{rejectionMessage}</h6>
           </div>
           </div>
        </div>
    );
};

export default SearchResult;