import React, { useState } from 'react';
import { makeStyles, TextareaAutosize, TextField, Card, CardHeader, Switch, InputLabel, Grid } from '@material-ui/core';
import baseUrl from '../../config';
// import "./Add_quizz.css"
import Swal from 'sweetalert2'
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

const Add_quizz = () => {
    const classes = useStyles();
    const [loding, setLoding] = useState(false);
    const [quizzData, setquizzData] = useState({});
    // const [publish, setPublish] = useState(false);
    const [SelectCategory] = useState(JSON.parse(localStorage.getItem("Category")));


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
                ...prevalue,cTitle:obj.cTitle,cid:obj.cid,
            })
        })
    }

    const onSubmit = async (e) => {
        setLoding(true)
        e.preventDefault();
        console.log(quizzData)
        console.log("addind category")

        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("adminToken")

            },
            body: JSON.stringify({
                qid: quizzData.id,
                title: quizzData.title,
                description: quizzData.description,
                maxMarks: quizzData.maxMarks,
                numberOfQuestions: quizzData.NoOfQuestions,
                categoryTitle:quizzData.cTitle,
                cid:quizzData.cid,
                active:quizzData.publish


            })


        }

        const res = await fetch(baseUrl+'/quiz/add_quiz', reqOption)


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
                title: 'quizz added successfully'
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
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader title="Add Quizz">

                </CardHeader>
                <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>

                    <div className="d-flex flex-column ">
                        {/* <TextField
                            className="w-25"
                            label="Quizz id"
                            // minRows={3}
                            type="number"
                            maxLength="3"
                            margin="normal"
                            name="id"
                            variant="outlined"
                            required
                            onChange={onChangeFields}
                            disabled={loding}
                        /> */}
                        <TextField
                            className="ml w-25"
                            label="Title"
                            minRows={3}
                            margin="normal"
                            name="title"
                            variant="outlined"
                            required
                            onChange={onChangeFields}
                            disabled={loding}
                        />
                        <TextareaAutosize name="description" minRows={3} placeholder=" Enter Category Description Here " className="w-50" required onChange={onChangeFields} disabled={loding} />
                        <div className="row">
                            <div className="col-3">
                                <TextField
                                    className=""
                                    label="Max Marks"
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

                                    margin="normal"
                                    type="number"
                                    name="NoOfQuestions"
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
                                            // checked={publish}
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

                                        label="choose category"
                                        name="categoryId"
                                    >
                                        {/* <MenuItem value={["",""]}>
                                            <em>None</em>
                                        </MenuItem> */}
                                        {SelectCategory.map((SelectCategory) => {
                                            // console.
                                            return (

                                                <option key={SelectCategory.cid} value={JSON.stringify({ cid: SelectCategory.cid, cTitle:SelectCategory.title })}>{SelectCategory.title}</option>

                                            )

                                        })}
                                    </select>
                                </div>

                            </div>
                        </div>

                    </div>
                    {loding ? <button className="btn btn-primary mt-2" type="button" disabled>
                        <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true" />
                        <span className=" sr-only"> Adding Quizz </span>
                    </button>
                        :

                        <button className="btn btn-primary mt-2" type="submit" >

                            <span className=" sr-only"> Add Quizz</span>
                        </button>

                    }

                </form>

            </Card>
        </div >
    );
};

export default Add_quizz;