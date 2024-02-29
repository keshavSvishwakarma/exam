import React from 'react';
import { useState, useEffect } from 'react';
import { useParams} from 'react-router';
// import Swal from 'sweetalert2'
// import React, { useState } from 'react';
import { makeStyles, TextareaAutosize, TextField, Card, CardHeader, Switch, InputLabel, Grid } from '@material-ui/core';
// import "./Add_quizz.css"
import Swal from 'sweetalert2'
import baseUrl from '../../config';
// import { alertService } from "../alert/AlertService";
const useStyles = makeStyles({
    root: {
        //   position:"",  
        minWidth: "70vW",
        //   overflow:"",
        margin: "10px",
        marginTop: "30px"
    },

});
// const options = {
//     autoClose: true,
//     keepAfterRouteChange: true
// };

const Upadate_Quizzes = () => {
    const { qid } = useParams();
    // const [qData , setQData] = useState({}); 
    const classes = useStyles();
    const [loding, setLoding] = useState(false);
    const [quizzData, setquizzData] = useState({});
    const [SelectCategory] = useState(JSON.parse(localStorage.getItem("Category")));
    // console.log(qid)
    useEffect(() => {

        LoadQuizz();
        // Run once when is loading or Reloading
    },[]);


    const LoadQuizz = async (e) => {

        // e.preventDefault();

        // console.log("addind category")

        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("adminToken")

            }


        }

        const res = await fetch(baseUrl+`/quiz/get_quiz/${qid}`, reqOption)


        console.log(res);

        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            setquizzData(resData);

        }else{
   
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


    // const [publish, setPublish] = useState(false);



    const onChangeFields = (e) => {
        console.log(quizzData)

        const name = e.target.name;
        const value = e.target.value;

        setquizzData((preValue) => {

            return ({

                ...preValue,
                [name]: value

            })
        })

    }

    const onChangePublish = (e) => {
        const name = e.target.name;
        const value = e.target.checked;
        setquizzData((preValue) => {

            return ({

                ...preValue,
                [name]: value

            })
        })
    }

    const onChangeSelect = (e) => {
        console.log(e.target.value);
        let obj = JSON.parse(e.target.value);
        setquizzData((prevalue) => {

            return ({
                ...prevalue, categoryTitle: obj.cTitle, cid: obj.cid,
            })
        })
    }

    const onSubmit = async (e) => {
        // setLoding(true)
        e.preventDefault();
        console.log(quizzData);
        console.log("addind category")

        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("adminToken")

            },
            body: JSON.stringify({
                qid: quizzData.qid,
                title: quizzData.title,
                description: quizzData.description,
                maxMarks: quizzData.maxMarks,
                numberOfQuestions: quizzData.numberOfQuestions,
                categoryTitle: quizzData.categoryTitle,
                cid: quizzData.cid,
                active: quizzData.publish


            })


        }

        const res = await fetch(baseUrl+'/quiz/update_quiz', reqOption)
// const res?=5;

        console.log(res);
        if (res) {
            setLoding(false)
        }
        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);


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
                icon: 'success',
                title: 'quizz update successfully'
            })
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








    // console.log(quizzData)
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader title="Update Quizz">

                </CardHeader>
                <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>

                    <div className="d-flex flex-column ">
                        Quizz id
                        <TextField
                            className="w-25"
                            // label="Quizz id"
                            // focused
                            type="number"
                            maxLength="3"
                            margin="normal"
                            name="id"
                            variant="outlined"
                            required
                            value={quizzData.qid}
                            // onChange={onChangeFields}
                            disabled
                        />
                        <TextField
                            className="ml w-50"
                            label="Title"
                            minRows={3}
                            margin="normal"
                            name="title"
                            focused
                            variant="outlined"
                            value={quizzData.title}
                            required
                            onChange={onChangeFields}
                            disabled={loding}
                        />
                        <TextareaAutosize name="description" minRows={3} value={quizzData.description} placeholder=" Enter Category Description Here " className="w-50" required onChange={onChangeFields} disabled={loding} />
                        <div className="row">
                            <div className="col-3">
                                <TextField
                                    className=""
                                    label="Max Marks"
                                    focused
                                    value={quizzData.maxMarks}
                                    minRows={3}
                                    margin="normal"
                                    name="maxMarks"
                                    variant="outlined"
                                    type="number"
                                    required
                                    onChange={onChangeFields}
                                    disabled={loding}
                                />
                            </div>
                            <div className="col-3">
                                <TextField
                                    className=""
                                    label="No. of questions"
                                    focused
                                    value={quizzData.numberOfQuestions}
                                    margin="normal"
                                    type="number"
                                    name="numberOfQuestions"
                                    variant="outlined"
                                    required
                                    onChange={onChangeFields}
                                    disabled={loding}
                                />
                            </div>
                            <div className="row">

                                <div className="col-3 d-flex">
                                    <Grid item className="mt-2">UnPublish</Grid>
                                    <Grid item>
                                        <Switch
                                            // checked={quizzData.active}
                                            // onClick={setPublish(!publish)}
                                            defaultChecked

                                            onChange={onChangePublish}
                                            color="primary"
                                            name="publish"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        // required
                                        />
                                    </Grid>
                                    <Grid item className="mt-2">Publish</Grid>


                                </div>
                                <div className="col-3">





                                    <InputLabel id="demo-simple-select-outlined-label">Choose Category</InputLabel>
                                    <select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        class="form-select" aria-label="Default select example"
                                        onChange={onChangeSelect}
                                        // value={JSON.stringify({ cid: quizzData.cid, categoryTitle: quizzData.categoryTitle })}
                                        required
                                        label="choose category"
                                        name="qid"
                                    >
                                        <option value="">select category</option>
                                        {/* <MenuItem value={["",""]}>
                                            <em>None</em>
                                        </MenuItem> */}
                                        {/* < */}
                                        {SelectCategory.map((SelectCategory) => {
                                            // console.
                                            return (

                                                <option key={SelectCategory.cid} value={JSON.stringify({ cid: SelectCategory.cid, cTitle: SelectCategory.title })}>{SelectCategory.title}</option>

                                            )

                                        })}
                                    </select>
                                </div>

                            </div>
                        </div>

                    </div>
                    {loding ? <button className="btn btn-primary mt-2" type="button" disabled>
                        <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true" />
                        <span className=" sr-only"> Updating Quizz </span>
                    </button>
                        :

                        <button className="btn btn-primary mt-2" type="submit" >

                            <span className=" sr-only"> Update Quizz</span>
                        </button>

                    }

                </form>

            </Card>
        </div >
    );
};

export default Upadate_Quizzes;