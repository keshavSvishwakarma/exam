// import React from 'react';
import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App"
import { useHistory } from 'react-router';
import { alertService } from "../alert/AlertService";

const options = {
    autoClose: true,
    keepAfterRouteChange: true
};
const Logout = () => {
    const { dispatch } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        dispatch({ type: "HOME", payload: false });
        localStorage.clear();

        history.push("/Login");
    }, [history,dispatch]);
    
    alertService.success("Logout successfully", options);
    
    
    return (<>ok</>)


};

export default Logout;