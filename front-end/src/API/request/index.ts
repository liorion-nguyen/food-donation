import axios from "axios";

const Cookies = require('js-cookie');

export const request = async (method: string, data: any, param: string) => {
    const accessToken = Cookies.get('jwt');
    const config = {
        headers: {
            'Authorization': `${accessToken}`
        }
    };
    try {
        const res = await axios({
            method: method,
            url: `http://localhost:8000/${param}`,
            data: data,
            headers: config.headers
        });

        return res.data;
    } catch (error) {
        return "Error"
    }
};


export const requesttest = async (method: string, data: any, param: string) => {
    const res = await axios({
        method: method,
        url: `http://localhost:8000/${param}`,
        data: data,
    });
    return res.data;
};