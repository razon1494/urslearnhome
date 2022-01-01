import React, { useEffect, useState } from 'react';
import './SearchCourse.css';
import SearchResult from './SearchResult/SearchResult';

const SearchCourse = () => {
    const [courses, setCourses] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true)
    const url = 'https://urscoursedata-default-rtdb.firebaseio.com/Courses.json'
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCourses(data);
            });
    }, []);

    const handleSearch = e => {
        const searchText = e.target.value;

        const matchedCourses = courses.filter(course=> course.CourseId.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(matchedCourses);
        setIsEmpty(false)
        if(searchText===''){
            setSearchResults([]);
            setIsEmpty(true)
        }
    }


  
    return (
        <div>
            <div className="container">
                {/* Welcome Text From Here */}
                <img className='img-fluid' src="https://i.ibb.co/8B2VKcv/urs-learn-logo.png" alt="" />

                <div className="welcome-text">
                <h4 class="fs-6 welcome-h4">Welcome, and we look forward to meeting you for:</h4>
                <h2 className="welcome-h2">Destination Retirement</h2>.
                <p className='fs-4 text-secondary'>
                <i className="fas fa-phone-volume welocme-icon"></i> (561)-594-0102 
                <i className="fas fa-envelope welocme-icon ms-3"></i> info@urslearn.com
                </p>
                </div>

                {/* Search Field Starts here */}
                <div className="search-container ">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Course"
                    className='w-50 p-2 border rounded-3 fs-4'
                    />
            </div>

            {/* Search Result Showing */}
            <div className="container d-flex align-items-center justify-content-center">
            {searchResults.length ? <div className="search-result row mt-5  align-items-center justify-content-center">
                    {
                        searchResults.map(course => <SearchResult
                        key = {course.CourseId}
                        course = {course}
                        >

                        </SearchResult> )
                    }
                </div> : <h2 className={`${isEmpty ? "d-none" : "d-block"}`}>No Course Found. Search Again</h2> }
                </div>
            </div>
            
        </div>
    );
};

export default SearchCourse;


//https://ibb.co/dc6yWgC (urs learn logo)