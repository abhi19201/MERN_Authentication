import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validator from "validator";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import InputAdornment from "@mui/material/InputAdornment";
import { Link, useNavigate } from "react-router-dom";
import { signupReq } from "../../../Action/userActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Loader from "../../Loader/Loader";
import "./signup.css";

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    //new Date("2014-08-18T21:11:54")
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [nickName, setnickName] = useState("");
    const [date, setDate] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [confirmPassword, setConfirmPass] = useState("");
    const [triggerAlert, setAlert] = useState({ type: "", message: "" });

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleChange = (e) => {
        switch (e.target.id) {
            case "fName":
                return setfName(e.target.value);
            case "lName":
                return setlName(e.target.value);
            case "nick":
                return setnickName(e.target.value);
            case "mail":
                return setEmail(e.target.value);
            case "pass":
                return setPass(e.target.value);
            case "confirmPass":
                return setConfirmPass(e.target.value);
            default:
                return;
        }
    };

    const signupHandler = () => {
        if (
            fName === "" ||
            lName === "" ||
            nickName === "" ||
            date === null ||
            confirmPassword === "" ||
            password === "" ||
            email === ""
        ) {
            let alertMessage = {
                type: "error",
                message: "Some fields are Empty!",
            };
            setAlert(alertMessage);
        } else if (!validator.isEmail(email)) {
            let alertMessage = {
                type: "error",
                message: "Please Enter Valid Email Id",
            };
            setAlert(alertMessage);
        } else if (confirmPassword !== password) {
            let alertMessage = {
                type: "error",
                message: "confirm password incorrect!",
            };
            setAlert(alertMessage);
        } else {
            const signUpCredentails = {
                firstName: fName,
                lastName: lName,
                nickName,
                date,
                email,
                password,
                confirmPassword,
            };
            dispatch(signupReq(signUpCredentails)).then(() => {
                navigate("/");
                setfName("");
                setlName("");
                setnickName("");
                setDate(null);
                setEmail("");
                setPass("");
                setConfirmPass("");
            });
        }
    };

    return (
        <div className='signup'>
            {loading && <Loader />}
            {triggerAlert.type === "" ? null : (
                <Alert severity={triggerAlert.type}>
                    {triggerAlert.message}
                </Alert>
            )}
            <h1>Signup</h1>

            <div className='signupForm'>
                <TextField
                    id='fName'
                    style={{ gridArea: "fName" }}
                    label='First Name'
                    variant='filled'
                    value={fName}
                    onChange={handleChange}
                />
                <TextField
                    id='lName'
                    style={{ gridArea: "lName" }}
                    label='Last Name'
                    variant='filled'
                    value={lName}
                    onChange={handleChange}
                />
                <TextField
                    id='nick'
                    style={{ gridArea: "gender" }}
                    label='Nick Name'
                    variant='filled'
                    value={nickName}
                    onChange={handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        id='dob'
                        style={{ gridArea: "dob" }}
                        label='Date Of Birth'
                        inputFormat='dd/MM/yyyy'
                        value={date}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                            <TextField {...params} variant='filled' />
                        )}
                    />
                </LocalizationProvider>
                <TextField
                    id='mail'
                    style={{ gridArea: "mail" }}
                    label='Email'
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <EmailOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={email}
                    onChange={handleChange}
                />
                <TextField
                    id='pass'
                    style={{ gridArea: "pass" }}
                    label='Password'
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <HttpsOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={password}
                    onChange={handleChange}
                />
                <TextField
                    id='confirmPass'
                    style={{ gridArea: "confirmPass" }}
                    label='Confirm Password'
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <HttpsOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={confirmPassword}
                    onChange={handleChange}
                />

                <Button
                    variant='contained'
                    style={{ gridArea: "button" }}
                    onClick={signupHandler}>
                    Sign Up
                </Button>
            </div>

            <div>
                Already have an account? <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}
