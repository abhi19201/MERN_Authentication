import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MessageIcon from "@mui/icons-material/Message";
import InputAdornment from "@mui/material/InputAdornment";
import { addItem } from "../../../Action/listActions";
import { useDispatch, useSelector } from "react-redux";
import "./listCreater.css";

export default function ListCreater() {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.list);
    const { email, nickName } = useSelector((state) => state.auth);

    const [input, setInput] = useState('');
    

    const addHandler = () => {
        
        dispatch(addItem(email, input))
            .then(() => {
                setInput("");
            })
            .catch(() => {
                console.log(error);
            });
    };

    const changeHandler = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className='listCreater'>
            <h3>Welcome {nickName}</h3>

            <TextField
                id='outlined-basic'
                label='Message'
                variant='outlined'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <MessageIcon />
                        </InputAdornment>
                    ),
                }}
                value={input}
                onChange={changeHandler}
            />

            <Button variant='contained' onClick={addHandler}>
                Add
            </Button>
        </div>
    );
}
