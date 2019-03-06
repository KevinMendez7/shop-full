import { getAllProducts, getProductById } from '../_services/products.service'

// export  const products = {
//     getAll,
//     getById
// }

export const getAll = () => {

    return dispatch => {
        dispatch(request())

        getAllProducts()
            .then(
                products => dispatch(success(products)),

                error => dispatch(failure(error))
            )
    }

    function request(){ return {type: 'PRODUCTS_REQUEST'}}
    function success(products) { return { type: 'PRODUCTS_SUCCESS', products}}
    function failure(error) { return { type: 'PRODUCTS_FAILURE', error}}

}

const getById = () => {

    return dispatch => {
        dispatch(request())

        getProductById()
            .then(
                product => dispatch(success(product)),

                error => dispatch(failure(error))
            )

    }

    function request(){ return {type: 'PRODUCT_BY_ID_REQUEST'}}
    function success(product) { return { type: 'PRODUCT_BY_ID_SUCCESS', product}}
    function failure(error) { return { type: 'PRODUCT_BY_ID_FAILURE', error}}

}