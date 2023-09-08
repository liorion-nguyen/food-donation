import { request } from '../request';

export const getPostmanagers = async (page: number, show: number) => {
    const data = await request('get', '', `postmanagers?page=${page}&show=${show}`)
    return data;
}

export const getNewFeeds = async (page: number, show: number, search: string) => {
    const data = await request('get', '', `postmanagers/newfeeds?page=${page}&show=${show}&search=${search}`);
    return data;
}

export const getPostSelf = async (id: string) => {
    const data = await request('get', '', `postmanagers/${id}`)
    return data;
}

export const createPostmanagers = async (content: any) => {
    const data = await request('post', content, `postmanagers`)
    return data;
}

export const deletePostmanagers = async (content: any) => {
    const data = await request('delete', content, `postmanagers/${content}`)
    return data;
}

export const updatePostmanagers = async (id: string, content: any) => {
    const data = await request('put', content, `postmanagers/${id}`)
    return data;
}

