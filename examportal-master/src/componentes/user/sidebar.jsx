//import useState hook to create menu collapse state
import React, { useState, useEffect } from "react";
import 'react-pro-sidebar/dist/css/styles.css';
import Swal from "sweetalert2";
import axios from 'axios';
import {
    ProSidebar,
    Menu,
    MenuItem,
    // SidebarHeader,
    SidebarFooter,
    SidebarContent,

} from "react-pro-sidebar";

//import icons from react icons
import { FaList } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";
import { NavLink, Link } from "react-router-dom";
import baseUrl from "../../config";


const Header = () => {
    const [cData, setCData] = useState([]);



    useEffect(() => {

        get_categories();
        // Run once when is loading or Reloading
    }, []);
    //create initial menuCollapse state using useState hook
    // const [menuCollapse, setMenuCollapse] = useState(true)

    //create a custom function that will change menucollapse state from false to true and true to false
    // const menuIconClick = () => {
    //     //condition checking to change state from true to false and vice versa
    //     menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    // };

    const get_categories = async () => {

        let headers = new Headers();

        headers.append("Authorization", "Bearer " + localStorage.getItem("userToken"));
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append("Access-Control-Request-Method", "");



        const reqOption = {

            method: 'GET',

            headers: headers


        }

        const res = await fetch(baseUrl+"/category/get_categories",
            {

                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("userToken") ,
                    'Access-Control-Allow-Origin':"*",
                    'Content-Type': 'application/json',
                    // withCredentials: true,
                    // mode: 'cors',

                  }
            });


        console.log(res);
        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            setCData(resData);
            localStorage.setItem("Category", JSON.stringify(resData));

        } else {
            const Toast = Swal.mixin({
                // toast: true,
                position: 'center',
                showConfirmButton: true,
                // timer: 3000,
                heightAuto: false,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'something problem',
                // body: 'please re login'
            })
        }
    }


    return (
        <>
            <div id="header"  >
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar className="Regular shadow" onToggle>

                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome />}>
                                Home
                                <NavLink to="/user/profile" />


                            </MenuItem>
                            <MenuItem icon={<FaList />}>
                                All Quizes
                                <NavLink to="/user/dashboard/all/0" />


                            </MenuItem>
                            {cData.map((cData) => {

                                return (

                                    <MenuItem key={cData.cid} icon={<FaList />} >
                                        {cData.title}
                                        <Link to={{
                                            pathname: `/user/dashboard/${cData.title}/${cData.cid}`,
                                            // query: { data:qData }
                                        }} />
                                    </MenuItem>

                                )
                            })}




                        </Menu>

                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />}><a href="/Logout" />Logout</MenuItem>
                        </Menu>

                    </SidebarContent>
                    <SidebarFooter>

                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default Header;