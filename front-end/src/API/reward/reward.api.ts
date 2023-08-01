import axios from "axios";

export const getRewards = async (page: number, show: number) => {
    const data = await axios({
        method: 'get',
        url: `http://localhost:8000/rewards?page=${page}&show=${show}`,
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

export const deleteRewards = async (content: any) => {
    const data = await axios({
        method: 'delete',
        url: `http://localhost:8000/rewards/${content}`,
    })
        .then(res => res.data);
    return data;
};

export const updateRewardss = async (id: string, content: any) => {
    const data = await axios({
        method: 'put',
        url: `http://localhost:8000/rewards/${id}`,
        data: content,
    })
        .then(res => res.data);
    return data;
};