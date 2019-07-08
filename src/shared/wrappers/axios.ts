import axios from 'axios';

export const customAxiosRequest = () => {
    return {
        get: (url, options = {}) => axios.get(`${url}&debug101=1`, {...options}),
        post: (url, data, options = {}) => axios.post(url, `${data}&debug101=1`, {...options}),
        put: (url, data, options = {}) => axios.put(`${url}&debug101=1`, data, {...options}),
        delete: (url, options = {}) => axios.delete(`${url}&debug101=1`, {...options}),
    };
};
