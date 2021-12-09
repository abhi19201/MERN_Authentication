import React from 'react';
import './body.css'
import List from './List/List';
import ListCreater from './ListCreater/ListCreater';
import { useSelector } from "react-redux";
import AdminBody from './AdminBody';
import Loader from '../Loader/Loader';

export default function Body() {

    const { email } = useSelector((state) => state.auth);
    const {loading } = useSelector((state) => state.list);

    if (email === 'admin') {
        return (
            <AdminBody/>
        )
    }
    return (
        <div className='body'>
            {loading && <Loader />}
            <ListCreater />
            <List />
        </div>
    );
}
