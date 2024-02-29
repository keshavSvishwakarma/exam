import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2'
import { makeStyles, Card, InputLabel, TextField } from '@material-ui/core';
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
    }
});

const Add_questions = () => {
    const { qid, title } = useParams();
    const classes = useStyles();
    const [loding, setLoding] = useState(false);
    const [queData, setQueData] = useState({});

    console.log(qid, title);

    const onChangeFields = (e) => {
        console.log(queData)

        const name = e.target.name;
        const value = e.target.value;
        // console.log(name,value)

        setQueData((preValue) => {

            return ({

                ...preValue,
                [name]: value

            })
        })

    }
    const onChangeEditor = (e) => {

        setQueData((preValue) => {

            return ({

                ...preValue,
                ["contant"]: e

            })
        })
    }
    const onChangeEditor2 = (e) => {

        setQueData((preValue) => {

            return ({

                ...preValue,
                ["explanation"]: e

            })
        })
    }

    const onSubmit = async (e) => {
        setLoding(true)
        e.preventDefault();
        console.log(queData)
        console.log("addind category")

        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("adminToken")

            },
            body: JSON.stringify({
                // quesid:"1",
                content: queData.contant,
                answer: queData.answer,
                option1: queData.option1,
                option2: queData.option2,
                option3: queData.option3,
                option4: queData.option4,
                explanation:queData.explanation,
                qid: qid



            })


        }

        const res = await fetch(baseUrl+'/question/add_question', reqOption)


        console.log(res);
        if (res) {
            setLoding(false)
        }
        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            setQueData([]);


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
                title: 'question added successfully'
            })
            // document.getElementById('contact-form').value('');
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

    return (<>
        {/* <h3  className="mx-auto">/h3> */}
        <Card className={classes.root}>
            <h2 style={{ margin: "20px" }} className="ml-3"> Add your question in quizz {title}  </h2>
            <form className={classes.root} id="contact-form" autoComplete="off" onSubmit={onSubmit}>
                <div className="m-2">

                    <CKEditor
                        editor={ClassicEditor}
                        data="Write your question here !!"
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            onChangeEditor(data)
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>



                <div className="row  ">
                    <div className="col-6">

                        <TextField
                            className=""
                            label="Option 1"
                            // minRows={3}
                            type="text"
                            value={queData.option1}
                            maxLength="3"
                            margin="normal"
                            name="option1"
                            variant="outlined"
                            required
                            onChange={onChangeFields}
                            disabled={loding}
                        />
                    </div>
                    <div className="col-6">

                        <TextField
                            className=""
                            label="Option 2"
                            minRows={3}
                            margin="normal"
                            name="option2"
                            variant="outlined"
                            required
                            onChange={onChangeFields}
                            disabled={loding}
                        />
                    </div>
                </div>
                <div className="row  ">
                    <div className="col-6">

                        <TextField
                            className=""
                            label="Option 3"
                            // minRows={3}
                            type="text"
                            maxLength="3"
                            margin="normal"
                            name="option3"
                            variant="outlined"
                            required
                            onChange={onChangeFields}
                            disabled={loding}
                        />
                    </div>
                    <div className="col-6">

                        <TextField
                            className=""
                            label="Option 4"
                            minRows={3}
                            margin="normal"
                            name="option4"
                            variant="outlined"
                            required
                            onChange={onChangeFields}
                            disabled={loding}
                        />
                    </div>
                </div>
                <InputLabel id="demo-simple-select-outlined-label">Choose Answer</InputLabel>
                <select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    class="form-select" aria-label="Default select example"
                    onChange={onChangeFields}
                    required
                    label="choose category"
                    name="answer"
                >
                    <option value="">none</option>
                    <option value={queData.option1}>{queData.option1}</option>
                    <option value={queData.option2}>{queData.option2}</option>
                    <option value={queData.option3} >{queData.option3}</option>
                    <option value={queData.option4}>{queData.option4}</option>
                </select>
                <div className="m-2">

                    <CKEditor
                        editor={ClassicEditor}
                        data="No explanation !!"
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            onChangeEditor2(data)
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>



                {loding ? <button className="btn btn-primary mt-3" type="button" disabled>
                    <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true" />
                    <span className=" sr-only"> Adding Question </span>
                </button>
                    :

                    <button className="btn btn-primary mt-3" type="submit" >

                        <span className=" sr-only"> Add Question</span>
                    </button>

                }

            </form>

        </Card>
    </>
    );
};

export default Add_questions;