import axios from 'axios';
import { request } from '../request';
export const createUsers = async (content: any) => {
    const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/users',
        data: content,
    })
        .then(res => res.data);
    return data;
};

export const CheckLogin = async (content: any) => {
    const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/auth/login',
        data: content,
    })
        .then(res => res.data);
    return data;
};

export const getUsers = async (page: number, show: number) => {
    const data = await request('get', '', `users?page=${page}&show=${show}`)
    return data;
};


  

