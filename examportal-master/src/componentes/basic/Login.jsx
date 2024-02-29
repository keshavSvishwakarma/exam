import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../../App"
import { alertService } from "../alert/AlertService";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import "./Registration.css";
import baseUrl from '../../config';
// Messages
const required = "This field is required";
// const maxLength = "Your input exceed maximum length";

// Error Component
const errorMessage = (error) => {

    console.log("ok")
    return (<pre className="invalid-feedback">{error}</pre>);

};



export default function Login() {
    const history = useHistory();
    const { dispatch } = useContext(UserContext);
    const [id, setId] = useState();

    // const classes = useStyles();
    const { register, handleSubmit, formState: { errors, isValid }, watch, getValues } = useForm({ mode: "all" });
    const [formStep, setFormStep] = useState(0);
    const [step, setStep] = useState("");
    const password = useRef({});
    password.current = watch("password", "");
    const [loding, setLoding] = useState(false);

    console.log(errors)

    const options = {
        autoClose: true,
        keepAfterRouteChange: true
    };


    const getOtp = async (e) => {
        e.preventDefault();
        setLoding(true);

        console.log("getOtp");
        const data = getValues();
        const reqOption = {
            method: 'POST',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({

                username: data.Email,
                // password: data.LoginPassword,

            })
        }

        const res = await fetch(baseUrl+'/get_passwordforget_otp', reqOption)


        console.log(res);

        if (res) {
            setLoding(false);
        }

        if (res.status === 200) {

            alertService.warn("please enter otp ", options);
            setFormStep(1);

        } else if (res.status === 404) {
            alertService.error("User not found !!", options);
            // history.push("/Registration");
        } else {
            alertService.error("Internal server error !!", options);

        }

    }
    const varifyOtp = async (e) => {
        setLoding(true);
        e.preventDefault();
        console.log("varify otp")

        const data = getValues();
        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({

                username: data.Email,
                otp: data.otp

            })
        }

        const res = await fetch(baseUrl+'/validate_otp', reqOption)


        console.log(res);

        if (res) {
            setLoding(false);
        }

        if (res.status === 200) {
            const resData = await res.text();
            setId(resData);
            alertService.warn("enter your password", options);
            setFormStep(2);

        } else if (res.status === 404) {
            alertService.error("User not found !!", options);
            // history.push("/Registration");
        } else if (res.status === 406) {

            alertService.error("please enter correct otp !!", options);

        } else {
            alertService.error("Internal server error !!", options);

        }


    }

    const onSubmitForgotPass = async (data) => {
        setLoding(true);
        // e.preventDefault();
        console.log("varify otp")

        // const data = getValues();
        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({

                username: data.Email,
                password: data.password,
                id: id

            })
        }

        const res = await fetch(baseUrl+'/update_password', reqOption)


        console.log(res);

        if (res) {
            setLoding(false);
        }

        if (res.status === 200) {
            alertService.success("password forgot successfully", options);
            setStep(" ");

        } else if (res.status === 400) {
            alertService.error("something problem !!", options);
            // history.push("/Registration");
        } else {
            alertService.error("Internal server error !!", options);

        }


    }



    const onSubmit = async (e) => {

        setLoding(true);
        // e.preventDefault();
        console.log("loggin")
        // console.log(getValues());
        const data = e;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Request-Method", "POST");
        const reqOption = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({

                username: data.Email,
                password: data.LoginPassword,

            })
        }

        const res = await fetch(baseUrl+'/login', reqOption)


        console.log(res);

        if (res) {
            setLoding(false);
        }

        if (res.status === 200) {
            const resData = await res.json();
            console.log(resData);
            if (resData.role === "NORMAL") {
                dispatch({ type: "USER", payload: true });
                localStorage.setItem("userToken", resData.token);
                localStorage.setItem("name", resData.activeFirstName + " " + resData.activeLastName);
                localStorage.setItem("USER", JSON.stringify(resData));
                history.push("/user/dashboard/all/0");
            } else if (resData.role === "ADMIN") {
                history.push("/Admin");
                dispatch({ type: "ADMIN", payload: true });
                localStorage.setItem("adminToken", resData.token);
                localStorage.setItem("name", resData.activeFirstName + " " + resData.activeLastName);
                localStorage.setItem("USER", JSON.stringify(resData));
            }
            setImmediate(() => {

                alertService.warn("login successfully", options);
            }, 100)


        } else if (res.status === 404) {
            alertService.error("User not found Please register !!", options);
            history.push("/Registration");
        } else if (res.status === 406) {
            alertService.error("incorect password !!", options);
            const shake = document.getElementsByClassName("form-content");
            shake[0].classList.add("shake");
            setTimeout(() => {
                shake[0].classList.remove("shake")
            }, 1000)


        } else {
            alertService.error("Internal server error !!", options);

        }

    }







    switch (step) {
        case 0:
            return (
                <>



                    <div id="reg" className="form-body">
                        <div className="row mx-0">
                            <div className="form-holder ">
                                <div className="form-content">
                                    <div className="form-items Regular shadow">
                                        <h3>forgot your password</h3>




                                        <div className="col-sm-12">
                                            <form onSubmit={handleSubmit(onSubmitForgotPass)}>
                                                {/* {formStep < 3 && (
                                                    <div className="mt-3"><p>
                                                    Step {formStep + 1} of 3
                                                    </p></div>
                                                )} */}
                                                {formStep === 0 && (<section>
                                                    <p className="mt-2">enter your mail id</p>
                                                    <hr />



                                                    <div className="form-group mt-2 mb-2">
                                                        <input
                                                            className="form-control"
                                                            type="email"
                                                            placeholder="Email"
                                                            name="Email"
                                                            disabled={loding}

                                                            autoComplete="off"
                                                            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
                                                        />
                                                        {errors.Email &&
                                                            errors.Email.type === "required" &&
                                                            errorMessage(required)}
                                                        {errors.Email &&
                                                            errors.Email.type === "pattern" &&
                                                            errorMessage("enter correct gmail")}
                                                    </div>
                                                    {formStep === 0 && (<section>
                                                        {loding ? <button className="btn btn-primary mt-2" type="button">
                                                            <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true" />
                                                            <span className=" sr-only"> Loading...</span>
                                                        </button>

                                                            :
                                                            <button className="btn btn-primary mt-2" type="button" disabled={!isValid} onClick={getOtp} >

                                                                NEXT </button>
                                                        }

                                                    </section>)}
                                                </section>)}

                                                {formStep === 1 && (<section>
                                                    <p className="mt-2">please check your mail box</p>
                                                    <hr />
                                                    <h6>ENTER YOUR OTP</h6>
                                                    <div className="form-group mt-2 mb-2">
                                                        <input
                                                            className="form-control"
                                                            type="tel"
                                                            placeholder="OTP"
                                                            name="otp"
                                                            disabled={loding}
                                                            autoComplete="off"

                                                            {...register("otp", { required: true, minLength: 6 })}
                                                        />
                                                        {errors.otp &&
                                                            errors.otp.type === "required" &&
                                                            errorMessage(required)}
                                                        {errors.otp &&
                                                            errors.otp.type === "minLength" &&
                                                            errorMessage("otp must be 6 digits")}

                                                    </div>
                                                    {formStep === 1 && (<section>
                                                        {loding ? <button className="btn btn-primary mt-2" type="button">
                                                            <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true" />
                                                            <span className=" sr-only"> Loading...</span>
                                                        </button>

                                                            :
                                                            <button className="btn btn-primary mt-2" type="button" disabled={!isValid} onClick={varifyOtp} > NEXT </button>

                                                        }
                                                    </section>)}

                                                </section>)}

                                                {formStep === 2 && <section className="mt-3">
                                                    <hr />
                                                    <h5>ENTER YOUR PASSWORD</h5>
                                                    <div className="form-group mt-2 mb-2">
                                                        <input
                                                            className="form-control"
                                                            type="password"
                                                            placeholder="Password"
                                                            name="password"
                                                            disabled={loding}
                                                            autoComplete="off"

                                                            {...register("password", {
                                                                required: true, minLength: {
                                                                    value: 8,
                                                                    message: "Password must have at least 8 characters"
                                                                }
                                                            })}
                                                        />
                                                        {/* {errors.password && <p>{errors.password.message}</p>} */}
                                                        {errors.password &&
                                                            errors.password.type === "minLength" &&
                                                            errorMessage("Password must have at least 8 characters")}
                                                        {errors.password &&
                                                            errors.password.type === "required" &&
                                                            errorMessage(required)}
                                                    </div>
                                                    <div className="form-group mt-2 mb-2">
                                                        <input
                                                            className="form-control"
                                                            type="password"
                                                            placeholder="Confirm Password"
                                                            name="cPassword"
                                                            disabled={loding}
                                                            autoComplete="off"

                                                            {...register("cPassword", {
                                                                required: true, validate: (value) =>
                                                                    value === password.current || "The passwords do not match"
                                                            })}
                                                        />
                                                        {errors.cPassword &&
                                                            errors.cPassword.type === "required" &&
                                                            errorMessage(required)}
                                                        {errors.cPassword &&
                                                            errors.cPassword.type === "validate" &&
                                                            errorMessage(errors.cPassword.message)}
                                                        {/* {errors.cPassword && <p>{errors.cPassword.message}</p>} */}
                                                    </div>


                                                    <div className="form-group mt-3 mb-2">
                                                        {loding ? <button className="btn btn-primary mt-2" type="button" disabled>
                                                            <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true" />
                                                            <span className=" sr-only"> Submiting</span>
                                                        </button>

                                                            :
                                                            // <button className="btn btn-primary mt-2" type="button"  disabled={!isValid} onClick={getOtp} >

                                                            //     NEXT </button>
                                                            <input className="btn btn-primary mt-2" type="submit" disabled={!isValid} />
                                                        }
                                                    </div>
                                                </section>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div></div></div>
                </>
            )


        //  break;
        default:
            return (
                <>



                    <div id="reg" className="form-body">
                        <div className="row mx-0">
                            <div className="form-holder ">
                                <div className="form-content">
                                    <div className="form-items Regular shadow">
                                        <h3>Login </h3>





                                        <div className="col-sm-12">
                                            <form onSubmit={handleSubmit(onSubmit)} >

                                                <hr />



                                                <div className="form-group mt-2 mb-2">
                                                    <input
                                                        className="form-control"
                                                        type="email"
                                                        placeholder="Email"
                                                        name="Email"
                                                        disabled={loding}

                                                        autoComplete="off"
                                                        {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
                                                    />
                                                    {errors.Email &&
                                                        errors.Email.type === "required" &&
                                                        errorMessage(required)}
                                                    {errors.Email &&
                                                        errors.Email.type === "pattern" &&
                                                        errorMessage("enter correct gmail")}
                                                </div>
                                                <div className="form-group mt-2 mb-2">
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        placeholder="Password"
                                                        name="LoginPassword"

                                                        disabled={loding}
                                                        autoComplete="off"
                                                        {...register("LoginPassword", {
                                                            required: true, minLength: {
                                                                value: 8,
                                                                message: "Password must have at least 8 characters"
                                                            }
                                                        })}
                                                    />
                                                    {/* {errors.password && <p>{errors.password.message}</p>} */}
                                                    {errors.LoginPassword &&
                                                        errors.LoginPassword.type === "minLength" &&
                                                        errorMessage("Password must have at least 8 characters")}
                                                    {errors.LoginPassword &&
                                                        errors.LoginPassword.type === "required" &&
                                                        errorMessage(required)}
                                                </div>


                                                <div className="form-group mt-3 mb-2">
                                                    {loding ? <button className="btn btn-primary mt-2" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true" />
                                                        <span className=" sr-only"> Submiting</span>
                                                    </button>
                                                        :
                                                        <input className="btn btn-primary mt-2" type="submit" disabled={!isValid} />
                                                    }
                                                </div>
                                                <button className="btn btn-btn-secondary mt-2" style={{ textDecorationLine: "underline", color: "blue", cursor: "pointer" }} disabled={loding} onClick={() => setStep(0)} type="button">forgot your password</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div></div></div>
                </>
            )
    }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
