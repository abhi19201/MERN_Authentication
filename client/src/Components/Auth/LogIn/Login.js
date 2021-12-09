import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validator from "validator";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { Link, useNavigate } from "react-router-dom";
import { loginReq } from "../../../Action/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Loader from "../../Loader/Loader";
import "./login.css";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, type, message } = useSelector((state) => state.auth);

    const [accountType, setAccountType] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [triggerAlert, setAlert] = useState({ type: "", message: "" });

    useEffect(() => {
        if (type === "error") window.alert(message);
    }, [type, message]);

    const loginHandler = () => {
        if (password === "" || email === "") {
            let alertMessage = {
                type: "error",
                message: "Some fields are Empty!",
            };
            setAlert(alertMessage);
        } else if (!validator.isEmail(email) && email !== "admin") {
            let alertMessage = {
                type: "error",
                message: "Please Enter Valid Email Id",
            };
            setAlert(alertMessage);
        } else {
            dispatch(loginReq(email, password)).then(() => {
                navigate("/");
                setAccountType("user");
                setEmail("");
                setPassword("");
            });
        }
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className='login'>
            {loading && <Loader />}

            {triggerAlert.type === "" ? null : (
                <Alert severity={triggerAlert.type}>
                    {triggerAlert.message}
                </Alert>
            )}

            <h1>Login</h1>
            <h3>Choose Account Type</h3>
            <div className='accountType'>
                <Button
                    className='admin'
                    variant={accountType === "admin" ? "contained" : ""}
                    onClick={() => {
                        setAccountType("admin");
                        setEmail("admin");
                    }}>
                    Admin
                </Button>
                <Button
                    className='user'
                    variant={accountType === "user" ? "contained" : ""}
                    onClick={() => {
                        setAccountType("user");
                        setEmail("");
                    }}>
                    User
                </Button>
            </div>
            <div className='loginForm'>
                {accountType === "user" ? (
                    <TextField
                        id='outlined-basic'
                        label='Email'
                        variant='outlined'
                        className='username'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <EmailOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        value={email}
                        onChange={emailHandler}
                    />
                ) : null}
                <TextField
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                    className='password'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <HttpsOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={password}
                    onChange={passwordHandler}
                />
            </div>
            <div className='submit'>
                <div>
                    No account? <Link to='/signup'>Signup</Link>
                </div>
                <Button variant='contained' onClick={loginHandler}>
                    {" "}
                    Log In{" "}
                </Button>
            </div>
        </div>
    );
}
