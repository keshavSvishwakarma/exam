import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import { alertService } from "../alert/AlertService";
import baseUrl from '../../config';

import { useForm } from "react-hook-form";

import "./Registration.css";

// Messages
const required = "This field is required";
const maxLength = "Your input exceed maximum length";

// Error Component
const errorMessage = (error) => {

    console.log("ok")
    return (<pre className="invalid-feedback">{error}</pre>);

};



export default function Registration() {

    // const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit, formState: { errors, isValid }, watch, getValues } = useForm({ mode: "all" });
    const [formStep, setFormStep] = useState(0);

    const password = useRef({});
    password.current = watch("password", "");
    const [loding, setLoding] = useState(false);

    console.log(errors)

    const options = {
        autoClose: true,
        keepAfterRouteChange: true
    };

    // registration otp on email after click next button
    const getOtp = async (e) => {

        setLoding(true);
        e.preventDefault();
        console.log("getOtp")
        // console.log(getValues());
        const data = getValues();

        const reqOption = {
            method: 'POST',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({

                username: data.Email
            })
        }

        const res = await fetch(baseUrl+'/registration_otp', reqOption)


        console.log(res);

        if (res) {
            setLoding(false);
        }

        if (res.status === 200) {
            alertService.success("enter your otp", options);
            setFormStep(1);
        } else if (res.status === 208) {
            alertService.error("your are already register Please Login !!", options);
            history.push("/Login")
        }

    }

    const varifyOtp = (e) => {
        setLoding(true);
        // console.log(data);
        e.preventDefault();
        console.log(getValues());
        setTimeout(() => {
            alertService.error("enter your password !!", options);
            setLoding(false);
            setFormStep(2);
        }, 1);
    }


    const onSubmit = async (e) => {
        setLoding(true);
        // e.preventDefault();
        console.log("getOtp")
        // console.log(getValues());
        const data = e;

        if (data.password === data.cPassword) {



            const reqOption = {
                method: 'POST',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({

                    username: data.Email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone:data.mobileNumber,
                    otp: data.otp
                })
            }

            const res = await fetch(baseUrl+'/register', reqOption)


            console.log(res);

            if (res) {
                setLoding(false);
            }

            if (res.status === 200) {
                alertService.warn("user register successfully", options);
                history.push("/Login")
                // setFormStep(2);
            } else if (res.status === 208) {
                alertService.error("your are already register Please Login !!", options);
                history.push("/Login");
            } else if (res.status === 417) {
                alertService.error("please enter correct otp !!", options);
                setFormStep(1);
            } else {
                alertService.error("Internal server error !!", options);

            }

        } else {
            setLoding(false);
            alertService.error("password are not maching !!", options);


        }


    }



    return (
        <>



            <div id="reg" className="form-body ">
                <div className="row mx-0">
                    <div className="form-holder  ">
                        <div className="form-content ">
                            <div className="form-items Regular shadow">
                                <h3>Register </h3>





                                <div className="col-sm-12">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {formStep < 3 && (
                                            <div className="mt-3"><p>
                                                Step {formStep + 1} of 3
                                            </p></div>
                                        )}
                                        {formStep === 0 && (<section>
                                            <hr />
                                            <div className="form-group  mt-2 mb-2 ">
                                                <input
                                                    className="form-control "
                                                    type="text"
                                                    placeholder="First Name"
                                                    name="firstName"
                                                    disabled={loding}
                                                    //   ref={register({ required: true, maxLength: 20 })}
                                                    {...register("firstName", { required: true, maxLength: 20 })}

                                                />
                                                {errors.firstName &&
                                                    errors.firstName.type === "required" &&
                                                    errorMessage(required)}
                                                {errors.firstName &&
                                                    errors.firstName.type === "maxLength" &&
                                                    errorMessage(maxLength)}


                                            </div>
                                            <div className="form-group mt-2 mb-2">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    name="lastName"
                                                    disabled={loding}
                                                    //   ref={register({ required: true, maxLength: 20 })}
                                                    {...register("lastName", { required: true, maxLength: 20 })}

                                                />
                                                {errors.lastName &&
                                                    errors.lastName.type === "required" &&
                                                    errorMessage(required)}
                                                {errors.lastName &&
                                                    errors.lastName.type === "maxLength" &&
                                                    errorMessage(maxLength)}

                                            </div>

                                            <div className="form-group mt-2 mb-2">
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    required
                                                    minLength="10"
                                                    maxLength="10"
                                                    placeholder="Mobile Number"
                                                    name="mobileNumber"
                                                    disabled={loding}


                                                    {...register("mobileNumber", {
                                                        required: true, maxLength: 10, minLength: 10
                                                    })}
                                                />
                                                {errors.mobileNumber &&
                                                    errors.mobileNumber.type === "maxLength" &&
                                                    errorMessage(maxLength)}
                                                {errors.mobileNumber &&
                                                    errors.mobileNumber.type === "required" &&
                                                    errorMessage(required)}
                                                {errors.mobileNumber &&
                                                    errors.mobileNumber.type === "minLength" &&
                                                    errorMessage("mobile Number must be 10 digit")}
                                            </div>
                                            <div className="form-group mt-2 mb-2">
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="Email"
                                                    name="Email"
                                                    disabled={loding}
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
                                            <hr />
                                            <h5>ENTER YOUR OTP</h5>
                                            <div className="form-group mt-2 mb-2">
                                                <input
                                                    className="form-control"
                                                    type="tel"
                                                    placeholder="OTP"
                                                    name="otp"
                                                    disabled={loding}
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
    );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
