import React from 'react';

const Header = () => {
    return (
        <div>
            <div className="d-flex container justify-content-between mt-3">
                <div className="logo">
                    <img src="https://i.ibb.co/PYNHmz2/Screenshot-137.png" className='mg-fluid' alt="" />
                </div>
                <div className="contact">
                   <p> <i className="fas fa-phone-volume welocme-icon"></i> (561)-594-0102</p>
               <p> <i className="fas fa-envelope welocme-icon ms-3"></i> info@urslearn.com</p>
                </div>

            </div>
            <hr className=''/>
        </div>
    );
};

export default Header;