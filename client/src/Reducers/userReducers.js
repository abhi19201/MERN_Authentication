import {
    AUTH_REQUEST,
    AUTH_REQUEST_SUCCESS,
    AUTH_REQUEST_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_REQUEST_SUCCESS,
    AUTH_LOGOUT_REQUEST_FAILURE,
} from "../Constants/constants";


export const authReducer = (state={loginStatus: false, email:"", nickName:""},action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                loading: true,
                loginStatus: false,
                message: "",
                email: "",
                type: "",
                nickName: "",
            };
        case AUTH_REQUEST_SUCCESS: {
            return {
                loading: false,
                loginStatus: action.payload.success,
                message: action.payload.message,
                email: action.payload.email,
                type: action.payload.type,
                nickName: action.payload.nickName,
            };}
        case AUTH_REQUEST_FAILURE:
            return {
                loading: false,
                loginStatus: false,
                message: action.payload.message,
                error: action.payload.error,
                type: action.payload.type,
                email: "",
                nickName: "",
            };
        case AUTH_LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case AUTH_LOGOUT_REQUEST_SUCCESS:
            return {
                loading: false,
                loginStatus: !action.payload.success,
                type: action.payload.type,
                message: action.payload.message,
            };
        case AUTH_LOGOUT_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

