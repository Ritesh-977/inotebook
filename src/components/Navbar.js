import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
const Navbar = () => {
  let navigate = useNavigate();
  const handleLogOut  = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
      <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
      </ul>
   
        
        {!localStorage.getItem('token')? <form className="d-flex" role="search"> <Link className="btn btn-primary mx-1 " to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1 " to="/signup" role="button">Sign Up</Link>   </form>  
          : <button onClick={handleLogOut} className='btn btn-primary'>Log Out</button> }
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
