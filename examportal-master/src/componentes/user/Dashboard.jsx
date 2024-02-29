import React, { useEffect, useState, } from 'react';
import { useParams,  NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { makeStyles,  Avatar,  Card, CardHeader, CardActions, Button,  CardContent } from '@material-ui/core';
import examLogo from '../../images/exam.jpg';
import baseUrl from '../../config';
const useStyles = makeStyles({
    root: {
        //   position:"",  
        minWidth: "70vW",
        //   overflow:"",
        padding: "10px",
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

const Dashboard = () => {
    const classes = useStyles();
    // const history = useHistory();
    const [qData, setQData] = useState([]);
    const { cid } = useParams();

    console.log(cid);

    // componentDidUpdate()
    // setInterval(function(){ get_quizz(cid) }, 3000);

    useEffect(() => {


        get_quizz(cid);


        // Run once when is loading or Reloading
    }, [cid]);

    const get_quizz = async (route) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append( "Authorization", "Bearer " + localStorage.getItem("userToken"));

        console.log(cid)
        const reqOption = {
            method: 'POST',
            headers:myHeaders,


        }

        let res = "";
        if (route === '0') {


            res = await fetch(baseUrl+'/quiz/get_quizzez', reqOption)
        } else {

            res = await fetch(baseUrl+`/quiz/get_active_specific_quiz/${route}`, reqOption)

        }



        console.log(res);
        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            setQData(resData);
            localStorage.setItem("Category", JSON.stringify(resData));

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
                // didOpen: (toast) => {
                //     toast.addEventListener('mouseenter', Swal.stopTimer)
                //     toast.addEventListener('mouseleave', Swal.resumeTimer)
                // }
            })

            Toast.fire({
                icon: 'error',
                title: 'something problem',
                // body: 'please re login'
            })
        }
    }
    // if(cid !== '0'){
    //     get_quizz();

    // }



    return (
        <div className="bootstrap-wrapper container">
            <div className={classes.root}>


                <div className="row">
                    {
                        qData === '0' &&

                        <Card>
                            <CardHeader title="No Quizz available in this category" />
                        </Card>
                    }
                    {qData !== '0' && qData.map((qData) => {
                        return (

                            <div key={qData.qid} className="col-4 mt-4">
                                <Card>
                                    <CardHeader avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            <img height="40px" width="40px" src={examLogo} alt="E" />
                                        </Avatar>
                                    } title={qData.title} subheader={qData.categoryTitle} />
                                    <CardContent>
                                        <p className="text-truncate">{qData.description}</p>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="secondary">
                                            <NavLink className="text-decoration-none" to={{
                                                pathname: `/user/pre-exam-instruction/${qData.qid}`,
                                                // query: { data:qData }
                                            }} >
                                                Start
                                            </NavLink>
                                        </Button>
                                        <Button size="small" color="primary">
                                            View
                                        </Button>
                                        <Button size="small" style={{ color: "black" }} disabled>
                                            qustions: {qData.numberOfQuestions}
                                        </Button>
                                        <Button size="small" style={{ color: "black" }} disabled>
                                            M.M: {qData.maxMarks}
                                        </Button>
                                    </CardActions>



                                </Card>
                            </div>

                        )
                    }
                    )}


                    {/* </div> */}

                </div>
            </div>
        </div>
    );
};

export default Dashboard;