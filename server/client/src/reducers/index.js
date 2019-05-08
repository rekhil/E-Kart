import { combineReducers } from "redux"
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import productsReducer from './productsReducer';
import accountReducer from './accountReducer';
import cartReducer from './cartReducer';

const allReducers = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    productsReducer,
    accountReducer,
    cartReducer
})

export default allReducers
