import { combineReducers } from "redux"
import authenticateReducer from './authenticateReducer';
import productsReducer from './productsReducer';
import accountReducer from './accountReducer';
import cartReducer from './cartReducer';

const allReducers = combineReducers({
    authenticateReducer,
    productsReducer,
    accountReducer,
    cartReducer
})

export default allReducers