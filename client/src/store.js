import thunk from "redux-thunk";
import { authReducer } from "./Reducers/userReducers";
import { listReducer } from "./Reducers/listReducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    auth: authReducer,
    list: listReducer,
});


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);


export default store;
