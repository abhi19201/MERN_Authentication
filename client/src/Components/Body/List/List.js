import React, { useEffect } from "react";
import {
    getAllItems,
} from "../../../Action/listActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../../Loader/Loader';
import "./list.css";

export default function List(props) {
    const dispatch = useDispatch();
    const { loading, itemsList, type } = useSelector(
        (state) => state.list
    );
    const { email } = useSelector((state) => state.auth);

    useEffect(() => {
        if (type === "") {
            dispatch(getAllItems(email));
        }
    }, [dispatch, email, type]);

    return (
        <div className='list'>
            <h3>List Items</h3>

            <div className='listItems'>
                {props.itemsList ? (
                    props.itemsList.map((listItem) => {
                        return (
                            <div className='item' key={listItem._id}>
                                <div>{listItem.enteredText}</div>
                            </div>
                        );
                    })
                ) : loading && !itemsList ? (
                    <Loader/>
                ) : (
                    itemsList.map((listItem) => {
                        return (
                            <div className='item' key={listItem._id}>
                                <div>{listItem.enteredText}</div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
