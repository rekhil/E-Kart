import { combineReducers } from "redux"
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import cartCountReducer from './cartCountReducer';

const allReducers = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    productsReducer,
    cartReducer,
    cartCountReducer
})

export default allReducers
