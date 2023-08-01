import axios from 'axios';

export const getPostmanagers = async (page: number, show: number) => {
    const data = await axios({
        method: 'get',
        url: `http://localhost:8000/postmanagers?page=${page}&show=${show}`,
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

export const deletePostmanagers = async (content: any) => {
    const data = await axios({
        method: 'delete',
        url: `http://localhost:8000/postmanagers/${content}`,
    })
        .then(res => res.data);
    return data;
};

export const updatePostmanagers = async (id: string, content: any) => {
    const data = await axios({
        method: 'put',
        url: `http://localhost:8000/postmanagers/${id}`,
        data: content,
    })
        .then(res => res.data);
    return data;
};