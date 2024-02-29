//import useState hook to create menu collapse state
import React, { useState } from "react";
import 'react-pro-sidebar/dist/css/styles.css';
// import Profile from './profile';

// import 'react-pro-sidebar/dist/scss/styles.scss';

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
 
} from "react-pro-sidebar";

//import icons from react icons
import { FaList } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiQuestionnaireFill } from "react-icons/ri";
import {AiOutlinePlus} from "react-icons/ai"
import {GrAddCircle} from 'react-icons/gr'
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";
import { NavLink} from "react-router-dom";


const Header = () => {

    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };


    return (
        <>
            <div id="header"  >
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse} className="Regular shadow" onToggle>
                    <SidebarHeader>
                        {/* <div className="logotext"> */}
                        {/* small and big change using menucollapse state */}
                        {/* {menuCollapse ? */}
                        {/* <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16"> */}
                        {/* <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" /> */}
                        {/* </svg></span> : <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16"> */}
                        {/* <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" /> */}
                        {/* </svg> EXAM PORTAL</span>} */}
                        {/* </div> */}
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle />
                            ) : (
                                <FiArrowLeftCircle />
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem  icon={<FiHome />}>
                                Home
                                <NavLink to="/admin/dashboard" />

                            </MenuItem>
                            <MenuItem active={true} icon={<FaList />} >
                                Category
                                <NavLink to="/admin/categories" />
                            </MenuItem>
                            <MenuItem icon={<GrAddCircle/>} >
                                Add Category
                                <NavLink to="/admin/add-category" />
                            </MenuItem>
                            <MenuItem icon={<RiQuestionnaireFill />}> 
                             Quizzes
                                <NavLink to="/admin/quizzes" />
                             
                            </MenuItem>
                            <MenuItem icon={<AiOutlinePlus />}>
                                Add Quizzes
                                <NavLink to="/admin/add-quizz" />
                                </MenuItem>
                            {/* <MenuItem icon={<BiCog />}>Settings</MenuItem> */}
                            {/* <SubMenu title="Components" icon={<FaGem />}>
                                <MenuItem >Component 1</MenuItem>
                                <SubMenu title="Sub Component 1" icon={<FaHeart />}>
                                    {/* you can have more nested submenus ... */}
                                {/* </SubMenu> */}
                            {/* </SubMenu> */} 
                        </Menu>
                     
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />}><NavLink to="/Logout" />Logout</MenuItem>
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