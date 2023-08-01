import axios from 'axios';

export const getUsers = async () => {
    const data = await axios({
        method: 'get',
        url: 'http://localhost:8000/users',
    })
        .then(res => res.data);
    return data;
};

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