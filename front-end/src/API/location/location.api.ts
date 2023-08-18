
import { request } from '../request';

export const getLocations = async (page: number, show: number) => {
    const data = await request('get', '', `locations?page=${page}&show=${show}`);
    return data;
}

export const getNewFeeds = async (page: number, show: number) => {
    const data = await request('get', '', `locations/newfeeds?page=${page}&show=${show}`);
    return data;
}

export const createLocations = async (content: any) => {
    const data = await request('post', content, `locations`)
    return data;
}

export const deleteLocations = async (content: any) => {
    const data = await request('delete', content, `locations/${content}`)
    return data;
}

export const updateLocations = async (id: string, content: any) => {
    const data = await request('put', content, `locations/${id}`)
    return data;
}



