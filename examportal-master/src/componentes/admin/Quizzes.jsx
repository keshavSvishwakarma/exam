import React from 'react';
import { makeStyles, List, ListItemText, ListItem, Card, CardHeader, ListItemIcon, Divider } from '@material-ui/core';
import { HiDocumentDuplicate } from "react-icons/hi";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import baseUrl from '../../config';
import { BsFilePlus } from "react-icons/bs"
import { Link, useHistory } from 'react-router-dom';
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



const Quizzes = () => {
    const classes = useStyles();
    const [qData, setQData] = useState([]);
    const history = useHistory("");

    useEffect(() => {

        get_Quizzes();
        // Run once when is loading or Reloading
    }, []);


    const get_Quizzes = async () => {


        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("adminToken")

            }


        }

        const res = await fetch(baseUrl+'/quiz/get_quizzez', reqOption)


        console.log(res);
        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            setQData(resData)

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
                body: 'please re login'
            })
        }
    }



    return (
        <>
            <Card className={classes.root}>
                <CardHeader title="Quizzes">


                </CardHeader>
                <button style={{ marginLeft: "15px" }} onClick={() => history.push("/admin/add-quizz")} className="btn btn-primary " type="button" >


                    <BsFilePlus className="" /><span> add new Quizz

                    </span>
                </button>
                {/* <Divider className={classes.divider} /> */}
                <List>
                    {
                        qData.map((qData) => {
                            return (

                                <div className="mt-2" key={qData.qid}>
                                    <Divider className={classes.divider} />
                                    <ListItem >

                                        <ListItemIcon >
                                            <HiDocumentDuplicate className={classes.listIcon} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={qData.title}
                                            secondary={qData.categoryTitle}

                                        />
                                    </ListItem>
                                    <span className="m-5">{qData.description}</span>
                                    <br />
                                    {/* <hr/> */}


                                    <button style={{ marginLeft: "15px" }} className="btn btn-light " type="button" disabled>{qData.active ? 'published' : 'unPublished'}</button>
                                    <button style={{ marginLeft: "15px" }} className="btn btn-light " type="button" disabled>Max Marks: {qData.maxMarks}</button>
                                    <button style={{ marginLeft: "15px" }} className="btn btn-light " type="button" disabled>Questions: {qData.numberOfQuestions}</button>
                                    {/* <button style={{ marginLeft: "15px" }} className="btn btn-primary " type="button" >Questions</button> */}
                                    <Link style={{ marginLeft: "15px" }} className="btn btn-primary " type="button" to={{
                                        pathname: `/admin/questions/${qData.title}/${qData.qid}`,
                                        query: { QuizzeName:qData.title }
                                    }}  >Questions</Link>
                                    <Link style={{ marginLeft: "15px" }} className="btn btn-primary " type="button" to={{
                                        pathname: `/admin/update-quizz/${qData.qid}`,
                                        // query: { data:qData }
                                    }}  >Update</Link>
                                    <button style={{ marginLeft: "15px" }} className="btn btn-primary " type="button" >Attempts</button>
                                </div>


                            )
                        })


                    }
                </List>
            </Card>
        </>
    );
};

export default Quizzes;