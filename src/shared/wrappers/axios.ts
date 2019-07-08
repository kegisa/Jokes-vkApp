import axios from 'axios';
import {IS_DEV_MODE} from '../GlobalConsts';

export const customAxiosRequest = () => {
    const debugRequestInterceptor = '&debug101=1';
    if (IS_DEV_MODE) {
        return {
            get: (url, options = {}) => axios.get(`${url}${debugRequestInterceptor}`, {...options}),
            post: (url, data, options = {}) =>
                axios.post(
                    `${url}`,
                    `${data}${debugRequestInterceptor}`,
                    {...options}
                ),
            put: (url, data, options = {}) => axios.put(`${url}${debugRequestInterceptor}`, data, {...options}),
            delete: (url, options = {}) => axios.delete(`${url}${debugRequestInterceptor}`, {...options}),
        };
    } else {
        return {
            get: (url, options = {}) => axios.get(`${url}`, {...options}),
            post: (url, data, options = {}) => axios.post(`${url}`, data, {...options}),
            put: (url, data, options = {}) => axios.put(`${url}`, data, {...options}),
            delete: (url, options = {}) => axios.delete(`${url}`, {...options}),
        };
    }
};
