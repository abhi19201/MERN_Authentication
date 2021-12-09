import React, {useEffect} from "react";
import Header from "./Components/Header/Header";
import Body from "./Components/Body/Body";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/LogIn/Login";
import SignUp from "./Components/Auth/SignUp/SignUp";
import { authCheck } from "./Action/userActions";
import { useDispatch, useSelector } from "react-redux";

import "./app.css";

function App() {
    const dispatch = useDispatch();
    const { loginStatus} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(authCheck());
    }, [dispatch]);

    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route
                    path='/login'
                    element={loginStatus ? <Navigate to='/' /> : <Login />}
                />

                <Route
                    path='/signup'
                    element={loginStatus ? <Navigate to='/' /> : <SignUp />}
                />

                <Route
                    path='/'
                    element={loginStatus ? <Body /> : <Navigate to='/login' />}
                />
            </Routes>
            
        </div>
    );
}

export default App;
