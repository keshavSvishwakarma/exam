import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { makeStyles, Card, CardHeader, CardContent } from '@material-ui/core';
import Swal from 'sweetalert2';
import ReactHtmlParser from 'react-html-parser';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import triggerBrowserWarning from 'browser-navigation-warning';
import { jsPDF } from "jspdf";
import baseUrl from '../../config';
// import userEvent from '@testing-library/user-event';
// import { generate } from 'rxjs';
// import disableBrowserBackButton from 'disable-browser-back-navigation';
// disableBrowserBackButton();


// import Timer from './timer';
//////////////////////////
//  time theme

let ans = [];
// console.log("no render")

const useStyles = makeStyles({
  root: {

    marginTop: "10px"
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


const TakeQuiz = () => {


  const classes = useStyles();

  const [quizData] = useState(JSON.parse(localStorage.getItem("QUIZ")));
  const USER = JSON.parse(localStorage.getItem("USER"))

  const { qid, title } = useParams();

  const [show, setShow] = useState(true)
  const history2 = useHistory();

  const [questionData, setquestionData] = useState([]);

  const [timer, setTimer] = useState(false);
  const [correctAnswer1, setCorrectAnswer] = useState();
  const [marksGot1, setMarksGot] = useState();
  const [atempted1, setAtempted] = useState();
  const [singleMarks, setSingleMarks] = useState();


  // //////////////////////////////////////
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  // ////////////
  // timer


  const initialMinute = quizData.numberOfQuestions;
  const remainingTime = initialMinute * 60;


  const preventBack = () => {

    window.history.pushState(null, "", window.location.pathname);
  }

  const handleBack = () => {
    console.log('handleBack')
  }
  const trigger = true;


  useEffect(() => {
    LoadQuestions();
    preventBack();
    triggerBrowserWarning(trigger);
    window.oncontextmenu = function () {
      console.log("Right Click Disabled");
      return false;
    }

    window.addEventListener('popstate', handleBack);
    return () => {
      window.removeEventListener('popstate', handleBack)
    }

    // window.addEventListener('')
    // window.history.

  }, [trigger, oncontextmenu, onpopstate]);


  const LoadQuestions = async (e) => {


    const reqOption = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("userToken")

      }


    }

    const res = await fetch(baseUrl+`/question/get_specific_question/${qid}`, reqOption)


    // console.log(res);

    if (res.status === 200) {
      let resData = await res.json();
      // console.log(resData);
      resData.forEach((q) => {
        q['givenAnswer'] = '';
      });
      setquestionData(resData);

      setSingleMarks(Math.floor(quizData.maxMarks / resData.length));
      setTimer(true)
      // startTimer();


    } else {

      setShow(false);

      Swal.fire({
        title: 'No question available',
        text: "You won't be able to revert this!",
        icon: 'error',
        // showCancelButton: true,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          history2.push("/user/dashboard/all/0");
        }
      })


    }

  }


  // //////////////
  // generatePdf

  const saveDataAndGeneratePdf = async (AT, CA, MG) => {

    // userDetails
    console.log(USER);
    // Result 
    console.log(AT, CA, MG);
    //  quiz data
    console.log(quizData);


    // generating pdf
    var doc = new jsPDF();



    doc.setFont("courier", "bolditalic");
    doc.text("Result", 105, 20, null, null, "center");
    doc.setFont("courier", "normal");
    doc.text(`${USER.activeFirstName + ' ' + USER.activeLastName}`, 20, 50);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    doc.text(`${today}`, 165, 50)
    doc.text(`${quizData.title} Quiz`, 20, 65)
    doc.setFont("times", "normal");

    doc.text("Marks Secure    Total Marks    Correct Answer    Question Attempt", 105, 90, null, null, "center");
    doc.setFont("courier", "bolditalic");
    doc.text(`${MG}        ${quizData.maxMarks}     ${CA}/${quizData.numberOfQuestions}          ${AT}`, 105, 100, null, null, "center");

    //  pdf data in variable base 64
    console.log(doc.output('datauri'));

    doc.save('result.pdf')

    console.log(qid)
    const reqOption = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("userToken")

      },
      body: JSON.stringify({

        studentName: USER.activeFirstName + ' ' + USER.activeLastName,
        result: MG,
        correctAnswer: CA,
        totalQuestion: quizData.numberOfQuestions,
        attemptedQuestion: AT,
        quizName: quizData.title,
        timeStamp: today,



      })


    }

    const res = await fetch(baseUrl+`/add_dashboard`, reqOption)



    console.log(res);

  }



  // console.log(questionData)
  // selecting answer
  const selectAnswer = (e) => {

    // console.log(e.target.name, e.target.value)

    let newArr = [...questionData];
    // questionData.map((data,index) => {
    newArr[e.target.name].givenAnswer = e.target.value;
    // });
    setquestionData(newArr);
    ans = newArr;
    // console.log(questionData);
  }
  // console.log(ans);
  const showResult = async (e) => {
    // e.preventDefault();
    let correctAnswer = 0;
    let marksGot = 0;
    let atempted = 0;
    // questionData = ans;
    // console.log(ans);
    // console.log(questionData);
    setquestionData(ans)
    // console.log(questionData);



    // const marksSingle = 10;
    // console.log(marksSingle);




    console.log("inside if of function of submitting");

    (ans.forEach((q, index) => {
      // console.log("submitting quiz" + index);
      if (q.givenAnswer === q.answer) {


        correctAnswer++;
        // console.log(correctAnswer)
        //  let mrksG = marksGot + marksSingle;
        //  setMarksGot(mrksG);
        marksGot += singleMarks;
      }
      if (q.givenAnswer.trim() !== '') {
        // let atmpt = atempted;
        // setAtempted(atmpt);
        atempted++;
        // console.log(atempted)
      }
    }))

    //  goto start:

    // console.log(correctAnswer, marksGot, atempted);
    setAtempted(atempted);
    setCorrectAnswer(correctAnswer);
    setMarksGot(marksGot);

    saveDataAndGeneratePdf(atempted, correctAnswer, marksGot);
    setShow(false);
    scrollToTop();

  }




  const submitQuiz = () => {
    console.log("submitting quiz");

    Swal.fire({
      title: 'Do you Want to  submit Quiz',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        showResult();
        setTimer(false)

      }

    })

  }


  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60

    // return `${minutes}:${seconds}`
    return (
      <div className="time-wrapper">
        <div style={{ fontSize: "52px" }} className="text-center">
          {minutes}:{seconds}
        </div>
        <div>minutes:second</div>
      </div>
    );
  }

  return (
    <div >
      {
        show &&
        <div className="boostrap-wrapper">
          <div className="container-fluid ">
            <div className="row mt-2">
              <div className="col-md-2">
                {/* instruction */}
                <h3>Instruction</h3>
              </div>
              <div className="col-md-8">
                <h3>On Going Quizz {title}</h3>
                {questionData.map((questionData, index) => {
                  return (
                    <Card onCopy={(e) => { e.preventDefault(); alert("if you Copy/Paste question your test have been submited"); return false }}
                      onPaste={(e) => { e.preventDefault(); alert("if you Copy/Paste question your test have been submited"); return false }}
                      key={questionData.quesid} className={classes.root}>
                      <CardContent>
                        <div >     <b>{"Q." + (index + 1)}</b> {ReactHtmlParser(questionData.content)}</div>
                        <br />
                        <hr />
                        <div className="row">
                          <div className="col-6">
                            <input className="form-check-input p-2 m-1" onClick={selectAnswer} type="radio" value={questionData.option1} name={index} id={"op1" + index} />
                            <label className="form-check-label " htmlFor="op1">
                              {questionData.option1}
                            </label>
                          </div>
                          <div className="col-6">
                            <input className="form-check-input p-2 m-1" onClick={selectAnswer} type="radio" value={questionData.option2} name={index} id={"op2" + index} />
                            <label className="form-check-label " htmlFor="op2">
                              {questionData.option2}
                            </label>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-6">
                            <input className="form-check-input p-2 m-1" onClick={selectAnswer} type="radio" value={questionData.option3} name={index} id={"op3" + index} />
                            <label className="form-check-label " htmlFor="op3">
                              {questionData.option3}
                            </label>
                          </div>
                          <div className="col-6">
                            <input className="form-check-input p-2 m-1" onClick={selectAnswer} type="radio" value={questionData.option4} name={index} id={"op4" + index} />
                            <label className="form-check-label " htmlFor="op4">
                              {questionData.option4}
                            </label>
                          </div>
                        </div>


                      </CardContent>
                    </Card>


                  )
                })

                }
                <div className="text-center my-3">
                  <button className="btn btn-primary" onClick={submitQuiz} type="button">
                    SUBMIT
                  </button>
                </div>
              </div>
              <div className="col-md-2 m">
                {/* timer? */}
                <div className="position-fixed  mt-5">

                  <CountdownCircleTimer
                    isPlaying={timer}
                    size={200}
                    children={children}
                    // colors={[["#218380"]]}
                    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                    duration={remainingTime}
                    initialRemainingTime={remainingTime}
                    // onComplete={console.log("time up")}
                    onComplete={() => {
                      showResult();
                      return [false] // repeat animation in 1.5 seconds
                    }}
                  />
                  <h3 className="mt-2">Remaining Time</h3 >


                </div>
                {/* {setTimer(Timer(50))} */}
              </div>
            </div>
          </div>
        </div>}
      {!show &&

        <div className="bootstrap-wrapper">
          <div className="container-fluid">


            <div className="row">
              <div className="col-md-6 offset-md-3">
                <Card className={classes.root}>
                  <CardHeader title="Quiz result" />
                  <CardContent style={{ marginLeft: "25%" }}>
                    <div>

                      <h4 className="" >Marks Got : {marksGot1}</h4>
                      <h4 className="">Correct Answer : {correctAnswer1}</h4>
                      <h4 className="">Questions Attempted : {atempted1}</h4>

                    </div>
                  </CardContent>
                  {/* <CardActions>
                  <div className="container text-center">
                    <button className="btn btn-primary">
                      Print
                    </button>
                  </div>
                </CardActions> */}
                </Card>
              </div>
            </div>
            <br />
            <div className="row">

              <div className="col-md-3"></div>
              <div className="col-md-6">

                <h3>Explaination</h3>
                {questionData.map((questionData, index) => {
                  return (
                    <Card key={questionData.quesid} className={classes.root}>
                      <CardContent>
                        <div>     <b>{"Q." + (index + 1)}</b> {ReactHtmlParser(questionData.content)}</div>
                        <div>Answer : <b>{questionData.answer}</b></div>
                        <div>Your Answer : {questionData.givenAnswer}</div>
                        <br />
                        <hr />
                        <div>     <b>Explaination</b><br /> {ReactHtmlParser(questionData.explaination)}</div>





                      </CardContent>
                    </Card>


                  )
                })

                }
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>


        </div>
      }
    </div>
  );

};

export default TakeQuiz;