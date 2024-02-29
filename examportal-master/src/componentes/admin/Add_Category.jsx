import React, { useState } from 'react';
import { makeStyles,  TextareaAutosize,  TextField,  Card, CardHeader } from '@material-ui/core';
import "./Add_Category.css"
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

const Add_Category = () => {
    const classes = useStyles();
    const [loding, setLoding] = useState(false);
    const [categoryData, setCategoryData] = useState({});

    const onChangeFields = (e) => {
        // console.log(e.target.value)
        // const [name, value] = e.target
        const name = e.target.name;
        const value = e.target.value;

        setCategoryData((preValue) => {

            return ({

                ...preValue,
                [name]: value

            })
        })

    }

    const onSubmit = async (e) => {
        setLoding(true)
        e.preventDefault();
        console.log(categoryData)
        console.log("addind category")

        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("adminToken")

            },
            body:JSON.stringify({
                cid:categoryData.id,
                title:categoryData.title,
                description:categoryData.description

            })


        }

        const res = await fetch(baseUrl+'/category/add_category', reqOption)


        console.log(res);
        if(res){
            setLoding(false)
        }
        if(res.status === 200){
            const resData = await res.json();
            console.log(resData);
           
            
            const Toast = Swal.mixin({
                // toast: true,
                position: 'center',
                showConfirmButton: true,
                // timer: 3000,
                heightAuto:false,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'category added successfully'
              })
            }else{

                const Toast = Swal.mixin({
                    // toast: true,
                    position: 'center',
                    showConfirmButton: true,
                    // timer: 3000,
                    heightAuto:false,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: 'something problem',
                    body:'please re login'
                  })

              }
    }
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader title="Add Categories">

                </CardHeader>
                <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>

                    <div className="d-flex flex-column ">
                        {/* <TextField
                            className="w-25"
                            label="Category id"
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
                            className="ml w-25 "
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
                    </div>
                    {loding ? <button className="btn btn-primary mt-2" type="button" disabled>
                        <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true" />
                        <span className=" sr-only"> Adding Category </span>
                    </button>
                        :

                        <button className="btn btn-primary mt-2" type="submit" >

                            <span className=" sr-only"> Add Category</span>
                        </button>

                    }

                </form>

            </Card>
        </div >
    );
};

export default Add_Category;