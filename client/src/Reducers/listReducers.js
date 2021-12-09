import {
    ITEM_GET_REQUEST,
    ITEM_ADD_REQUEST,
    ITEM_UPDATE_REQUEST,
    ITEM_DELETE_REQUEST,
    ITEM_REQUEST_SUCCESS,
    ITEM_REQUEST_FAILURE,
} from "../Constants/constants";

export const listReducer = (state = { itemsList: [] }, action) => {
    switch (action.type) {
        case ITEM_GET_REQUEST:
            return {
                loading: true,
                message: "",
                type: "",
                itemsList: [],
            };
        case ITEM_ADD_REQUEST:
            return {
                loading: true,
                message: "",
                type: "",
                itemsList: [],
            };
        case ITEM_UPDATE_REQUEST:
            return {
                loading: true,
                message: "",
                type: "",
                itemsList: [],
            };
        case ITEM_DELETE_REQUEST:
            return {
                loading: true,
                message: "",
                type: "",
                itemsList: [],
            };
        case ITEM_REQUEST_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
                type: action.payload.type,
                itemsList: action.payload.data.itemsList,
            };
        case ITEM_REQUEST_FAILURE:
            return {
                loading: false,
                message: action.payload.message,
                type: action.payload.type,
                error: action.payload,
                itemsList: [],
            };
        default:
            return state;
    }
};
