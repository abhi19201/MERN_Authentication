import React from 'react';
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutReq } from '../../Action/userActions';
import { useNavigate } from "react-router-dom";
import './header.css';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, loginStatus } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logoutReq(email));
        navigate('/');
    }
    return (
        <div className='header'>
            {loginStatus && (
                <Button variant='contained' onClick={logoutHandler}>
                    Logout
                </Button>
            )}
        </div>
    );
}
