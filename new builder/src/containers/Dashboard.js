import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import './Home.css'
import { Link } from "react-router-dom";
import Edit from "./Edit"
import Courses from "./CoursesAvailble"
import { AUTH_PROVIDER } from "../Routing/AuthProvider"
// import './Dashboard.css'
const logout = (event) => {
  event.preventDefault();
  localStorage.removeItem('user');
  window.location.href = '/'
};
function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));
  if(user){
    var isAuthenticated = user.isAuthenticated;
    var type = user.user_type;
  }
  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand-tutor" href="/">
              <img src="assets/minimalist-blocks/preview/Navigation.png" alt="learner-img" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              {!isAuthenticated ?
                <ul className="navbar-nav">
                  <li><a className="dropdown-item" href={AUTH_PROVIDER+ '/auth/login'}>Login</a></li>
                  <li><a className="dropdown-item" href={AUTH_PROVIDER+ '/auth/signup'}>Sign Up</a></li>
                </ul> : <ul className="navbar-nav">
                  <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
                </ul>
              }
            </div>
          </div>
        </nav>
        {type && type === 'tutor' ? <Edit /> : type === 'learner' ? <Courses /> : <Edit />}
      </div>
    </>
  )
}
export default Dashboard