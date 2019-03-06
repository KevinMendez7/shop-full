import { handleResponse } from '../util/handleResponse'

export const getAllProducts = () => {

    const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json' }
    }

    return fetch('https://backendapi.turing.com/products', requestOptions).then(handleResponse)
}

export const getProductById = (id) => {
    const requestOptions = {
        method : 'GET',
        headers : {"Content-Type" : "application/json"}
    }

    return fetch(`https://backendapi.turing.com/products/${id}`).then(handleResponse)

}