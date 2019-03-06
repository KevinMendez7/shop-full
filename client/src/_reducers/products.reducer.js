import {fromJS} from 'immutable'
import { productSchema } from '../schemas/products.schema'
import { getSchema } from '../util/normalize'

const initialState = fromJS({
    entities : {},
    productsLoading : true,
    products : {}
})

const products = (state = initialState, action) => {
    switch(action.type){
        case 'PRODUCTS_REQUEST' :
            return state.set('productsLoading', true)
        case 'PRODUCTS_SUCCESS' :
            const {entities} = getSchema(action.products, productSchema)
            return state.set('entities', entities)
                        .set('products', entities.product)
        case 'PRODUCT_BY_ID' :
            return state.push({ item : action.product})
        default :
            return state
    }
}

export default products