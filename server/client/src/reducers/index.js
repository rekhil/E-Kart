import { combineReducers } from "redux"
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import cartCountReducer from './cartCountReducer';
import wishlistReducer from './wishlistReducer';

const allReducers = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    productsReducer,
    cartReducer,
    cartCountReducer,
    wishlistReducer
})

export default allReducers
