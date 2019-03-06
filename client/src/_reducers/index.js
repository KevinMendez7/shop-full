import data from './data.reducer'
import products from './products.reducer'
import { combineReducers } from 'redux-immutable'

const rootReducers = combineReducers({
    data,
    products
})

export default rootReducers