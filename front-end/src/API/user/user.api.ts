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

export const getUsers = async (page: number, show: number, search: string) => {
    const data = await request('get', '', `users?page=${page}&show=${show}&search=${search}`)
    return data;
};

export const getUser = async (id: string) => {
    const data = await request('get', '', `users/${id}`)
    return data;
};

export const getUserCommnet = async (id: string) => {
    const data = await request('get', '', `users/comment/${id}`)
    return data;
};

export const deleteUser = async (content: any) => {
    const data = await request('delete', content, `users/${content}`)
    return data;
}

export const updateUsers = async (id: string, content: any) => {
    const data = await request('put', content, `users/${id}`)
    return data;
}

