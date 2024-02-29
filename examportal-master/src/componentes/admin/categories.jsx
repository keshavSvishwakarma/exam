import React from 'react';
import { makeStyles, List, ListItemText, ListItem, Card, CardHeader, ListItemIcon, Divider } from '@material-ui/core';
import { HiDocumentDuplicate } from "react-icons/hi";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import {BsFilePlus} from "react-icons/bs"
import { useHistory } from 'react-router-dom';
import baseUrl from '../../config';
// import { FixedSizeList } from 'react-window';



const useStyles = makeStyles({
    root: {
        //   position:"",  
        minWidth: "70vW",
        //   overflow:"",
        margin: "10px",
        marginTop: "30px"
    },
    listIcon: {

        height: 30,
        width: 30
    },
    divider: {
        borderBottomStyle: "solid"
    }
});



const Categories = () => {
    const classes = useStyles();
    const [cData, setCData] = useState([]);
    const history = useHistory("");

    useEffect(() => {

        get_categories();
        // Run once when is loading or Reloading
    }, []);


    const get_categories = async () => {


        const reqOption = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("adminToken")

            }


        }

        const res = await fetch(baseUrl+'/category/get_categories', reqOption)


        console.log(res);
        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            setCData(resData);
            localStorage.setItem("Category",JSON.stringify(resData));

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
            <Card className={classes.root}>
                <CardHeader title="Categories">


                </CardHeader>
                <button style={{marginLeft:"15px"}} onClick={()=>history.push("/admin/add-category")} className="btn btn-primary " type="button" >
                

                <BsFilePlus className=""/><span> add new category

                </span>
                </button>
                {/* <Divider className={classes.divider} /> */}
                <List>
                    {
                        cData.map((cData) => {
                            return (
                                
                                <div key={cData.cid}>
                                    <Divider className={classes.divider} />
                                    <ListItem >

                                        <ListItemIcon >
                                            <HiDocumentDuplicate className={classes.listIcon} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={cData.title}
                                            secondary={cData.description}

                                        />
                                    </ListItem>
                                </div>
                              

                            )
                        })


                    }
                </List>
            </Card>
        </>
    );
};

export default Categories;