import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../App";
import { NavLink,Link } from 'react-router-dom';
// import Sidebar from "../admin/sidebar";




const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [name, setName] = useState("your name");
  // const [checktoken, setCheckToken] = useState(true);

 

  useEffect(() => {
    // if (checktoken) {
      if (localStorage.getItem("userToken") !== null) {
        dispatch({ type: "USER", payload: true });
      } else if (localStorage.getItem("adminToken") !== null) {
  
        dispatch({ type: "ADMIN", payload: true })
      }
    // }

    // setCheckToken(false)
    setInterval(() => {
      setName(localStorage.getItem("name"));

    }, 30
    )

    // Run once when is loading or Reloading
  }, []);

  const renderNavbar = () => {

    if (state === "USER") {
      return (<>
      {/* <li className="nav-item">

        <NavLink to="/" className="nav-link">Home</NavLink>
      </li> */}
      <li className="nav-item">

        <NavLink to="/user/dashboard/all/0" className="nav-link">Home</NavLink>
      </li>


        <li className="nav-item dropdown AdminName ">
          <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {name}
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <NavLink className="dropdown-item" to="/Logout">LOGOUT</NavLink>
            <div className="dropdown-divider" />
            <NavLink className="dropdown-item" to="#">Profile Page</NavLink>
          </div>
        </li>


      </>)
    } else if (state === "ADMIN") {
      return (<>




        <li className="nav-item dropdown AdminName ">
          <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {name}
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/Logout">LOGOUT</a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="/admin/profile">Profile Page</a>
          </div>
        </li>


      </>)
    } else {

      return (<>
        <li className="nav-item">

          <NavLink to="/" className="nav-link">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Registration" className="nav-link">Registration</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Login" className="nav-link">Login</NavLink>
        </li>


      </>)
    }
  }
  
  return (<>
    <nav className="navbar navbar-expand-lg shadow-sm  navbar-light ">
    {/* {state === "ADMIN"? <Sidebar/>: ''} */}
      {/* <button className="btn btn-success m-1" onClick={() => alertService.error('Success!!')}>Success</button> */}
      <div className="container-fluid me-auto p-2 ">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="align-items-center  " style={{marginLeft:"15px"}}><h5 className="m-0"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
         </svg>  
        {/* {state === "HOME"?  'EXAM PORTAL' :" "} */}
        &#160;EXAM PORTAL
        </h5></div>
        <div className="collapse justify-content-center  navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">

            {renderNavbar()}


          </ul>
        </div>
      </div>
    </nav>
    
  </>
  );
};

export default Navbar;