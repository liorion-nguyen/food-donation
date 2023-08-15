import { request } from '../request';

export const getRewards = async (page: number, show: number) => {
    const data = await request('get', '', `rewards?page=${page}&show=${show}`)
    return data;
}

export const createRewards = async (content: any) => {
    const data = await request('post', content, `rewards`)
    return data;
}

export const deleteRewards = async (content: any) => {
    const data = await request('delete', content, `rewards/${content}`)
    return data;
}

export const updateRewards = async (id: string, content: any) => {
    const data = await request('put', content, `rewards/${id}`)
    return data;
}

