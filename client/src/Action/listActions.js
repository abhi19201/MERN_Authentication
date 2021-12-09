import {
    ITEM_GET_REQUEST,
    ITEM_ADD_REQUEST,
    ITEM_UPDATE_REQUEST,
    ITEM_DELETE_REQUEST,
    ITEM_REQUEST_SUCCESS,
    ITEM_REQUEST_FAILURE,
} from "../Constants/constants";
import Axios from "axios";

export const addItem =
    (email = "", text = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: ITEM_ADD_REQUEST });

            const url = "/list/add";

            const response = await Axios.post(url, { email, text });

            dispatch(getAllItems(email));

            dispatch({
                type: ITEM_REQUEST_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: ITEM_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };

export const getAllItems =
    (email = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: ITEM_GET_REQUEST });

            const url = "/list";

            const response = await Axios.get(url, { params: { email } });

            dispatch({
                type: ITEM_REQUEST_SUCCESS,
                payload: response,
            });
            
        } catch (error) {
            dispatch({
                type: ITEM_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };

export const updateItem =
    (email = "", itemId = "", text = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: ITEM_UPDATE_REQUEST });

            const url = "/list/update";

            const response = await Axios.post(url, {
                email,
                id: itemId,
                text,
            });

            dispatch({
                type: ITEM_REQUEST_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: ITEM_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };

export const deleteItem =
    (email = "", itemId = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: ITEM_DELETE_REQUEST });

            const url = "/list/delete";

            const response = await Axios.post(url, { email, id: itemId });

            dispatch({
                type: ITEM_REQUEST_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: ITEM_REQUEST_FAILURE,
                payload: error.message,
            });
        }
    };

export const getAllUsers =
    async (email = "") =>{
        try {
            const url = "/list";
            const response = await Axios.get(url, { params: { email } });

            return response;

        } catch (error) {
            console.log(error)
        }
    };
