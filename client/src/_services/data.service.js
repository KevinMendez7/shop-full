import { handleResponse } from '../util/handleResponse'

export const departments = () => {
    const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json'}
    }

    return fetch('https://backendapi.turing.com/departments', requestOptions).then(handleResponse)
        

}
