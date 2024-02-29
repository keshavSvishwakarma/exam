import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { makeStyles, Card, CardHeader,  Button,  Divider, CardContent } from '@material-ui/core';
import baseUrl from "../../config";

const useStyles = makeStyles({
    root: {
        //   position:"",  
        minWidth: "70vW",
        //   overflow:"",
        padding: "10px",
        marginTop: "10px",
        // marginBottom: "10px"
    },
    listIcon: {

        height: 30,
        width: 30
    },
    divider: {
        borderBottomStyle: "solid"
    }
});

const Instruction = () => {
    const history = useHistory();
    const classes = useStyles();
    const { qid } = useParams();
    const [qData, setQData] = useState({});

    useEffect(() => {


        get_quizz(qid);


        // Run once when is loading or Reloading
    }, []);

    const get_quizz = async () => {

        console.log(qid)
        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("userToken")

            }


        }

        const res = await fetch(baseUrl+`/quiz/get_quiz/${qid}`, reqOption)



        console.log(res);
        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            setQData(resData);
            localStorage.setItem("QUIZ", JSON.stringify(resData));

        } else if (res.status === 204) {
            setQData('0')
        }
        else {


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

    const startTest = () => {
        Swal.fire({
            title: 'Want to  start Quiz',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                history.push({
                    pathname: `/exam/${qData.title}/${qData.qid}`
                })
                var a = document.createElement('a'); 
                a.href = `/exam/${qData.title}/${qData.qid}`;
                a.click();

            }
        })



    }
    return (
        <div className="bootstrap-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Card className={classes.root}>
                            <CardHeader title="Read the instruction of this page carefully" subheader="One step more to go" />
                            <CardContent>
                                <h3>{qData.title}</h3>
                                <p>{qData.description}</p>

                                <Divider />
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2>Important Instruction</h2>
                                        <ul>
                                            <li>This quiz is only for pratice purpose.</li>
                                            <li>You have to submit quizz with in <b>{qData.numberOfQuestions * 2} minutes.</b></li>
                                            <li>You can attempts the quiz any number of time.</li>
                                            <li>There are <b>{qData.numberOfQuestions} qustions </b> in this quiz.</li>
                                            <li>Each question carries <b>{qData.maxMarks / qData.numberOfQuestions} marks.</b></li>
                                            <li>No <b>nagetive</b> markings on wrong questions.</li>
                                            <li>All questions is of MCQ Type.</li>
                                        </ul>

                                        {/* <Divider /> */}
                                        {/* <br /> */}
                                    </div>
                                    <div className="col-md-6">
                                        <h3>Attempting Quiz</h3>
                                        <ul>
                                            <li>Click <b>Start Quiz</b> button to start the quiz.</li>
                                            <li>the<b> time</b> will start the moment you click Start Quiz button.</li>
                                            <li>You can not resume the quiz, if interrupted due to any reason.</li>
                                            <li>Scroll down to move to next question.</li>
                                            <li>Click <b>submit Quiz</b> button on complition of the quiz</li>
                                            <li>Report of the test is automatic generated in the form of <b>pdf</b> copy.</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>


                            {/* <CardActions style={{ textAlign: "center" }}> */}
                            <div className="d-flex justify-content-center">
                                <Button variant="contained" size="large" color="primary" onClick={startTest} >
                                    {/* <NavLink  className="text-decoration-none " style={{color:"white"}}  to={{
                                                pathname: `/exam/${qData.title}/${qData.qid}`,
                                                
                                            }} >
                                                Start Quiz
                                
                                            </NavLink> */}
                                    Start Quiz

                                </Button>
                            </div>
                            {/* </CardActions> */}

                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instruction;