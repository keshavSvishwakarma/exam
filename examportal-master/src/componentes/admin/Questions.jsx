import React from 'react';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { makeStyles, List, ListItem, Card, CardHeader, Divider, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import "./Questions.css"
import baseUrl from '../../config';



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
        borderBottomStyle: "solid",
        border: "5px"
    },
    button: {
        // color:""
        backgroundColor: "#ff4d4d"
    }
});


const Questions = () => {
    const classes = useStyles();
    const { qid, title } = useParams();
    // const {query} = useLocation();
    // const [title , setTitle] = useState("");
    // console.log(useLocation())
    const [questionData, setquestionData] = useState([]);
    useEffect(() => {
        // if()
        LoadQuestions();
        // Run once when is loading or Reloading
    }, []);



    const LoadQuestions = async (e) => {

        // e.preventDefault();

        console.log("addind category")

        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("adminToken")

            }


        }

        const res = await fetch(baseUrl+`/question/get_specific_question_admin/${qid}`, reqOption)


        console.log(res);

        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            setquestionData(resData);

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
                title: 'No question available',
                // body: 'please re login'
            })


        }

    }

    const deleteQuestion =(e)=>{

        console.log(e);
    }

    return (
        <Card className={classes.root}>
            <CardHeader title={`Questions of ${title} quiz `}>


            </CardHeader>
            <Link style={{ marginLeft: "15px" }} to={{
                pathname: `/admin/add-question/${title}/${qid}`,
                // query: { data:qData }
            }} className="btn btn-primary " type="button" >

                <span> add new Question

                </span>
            </Link>
            {/* <Divider className={classes.divider} /> */}
            <List>
                {
                    questionData.map((questionData, index) => {



                        return (<div className="" key={questionData.quesid}>


                            <Divider className={classes.divider} />
                            <ListItem className="d-block" >






                                <div>     {"Q." + (index + 1)} {ReactHtmlParser(questionData.content)}</div>
                                <br />
                                <div className="row">
                                    <div className="col-6"><b>1). </b> {questionData.option1}</div>
                                    <div className="col-6"><b>2). </b> {questionData.option2}</div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-6"><b>3). </b> {questionData.option3}</div>
                                    <div className="col-6"><b>4). </b> {questionData.option4}</div>
                                </div>
                                <hr />
                                <div className="row">
                                    <p className="col-6">Correct answer: <b>{questionData.answer}</b></p>
                                    <div className="col-5"></div>
                                    <div className="col-1">
                                        <IconButton aria-label="delete" id="deleteIcon" onClick={deleteQuestion} className={classes.margin}>
                                            <DeleteIcon />
                                        </IconButton>
                                        {/* <DeleteIcon /> */}

                                    </div>

                                </div>

                            </ListItem>
                        </div>





                        )



                    })






                }
            </List>
        </Card>
    );
};

export default Questions;