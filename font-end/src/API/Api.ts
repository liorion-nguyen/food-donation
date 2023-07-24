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

export const getPostmanagers = async () => {
    const data = await axios({
        method: 'get',
        url: 'http://localhost:8000/postmanagers',
    })
        .then(res => res.data);
    return data;
};

export const createPostmanagers = async (content: any) => {
    const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/postmanagers',
        data: content,
    })
        .then(res => res.data);
    return data;
};

export const getRewards = async () => {
    const data = await axios({
        method: 'get',
        url: 'http://localhost:8000/rewards',
    })
        .then(res => res.data);
    return data;
};

export const createRewards = async (content: any) => {
    const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/rewards',
        data: content,
    })
        .then(res => res.data);
    return data;
};

export const getPaymentrecords = async () => {
    const data = await axios({
        method: 'get',
        url: 'http://localhost:8000/paymentrecords',
    })
        .then(res => res.data);
    return data;
};

export const createPaymentrecords = async (content: any) => {
    const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/paymentrecords',
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