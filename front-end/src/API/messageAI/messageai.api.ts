
import { request } from '../request';

export const getMessageAI = async () => {
    const data = await request('get', '', 'messageAI');
    return data;
}

export const createMessageAI = async (content: any) => {
    const data = await request('post', content, `messageAI`)
    return data;
}

export const deleteMessageAI = async (content: any) => {
    const data = await request('delete', content, `messageAI/${content}`)
    return data;
}

export const updateMessageAI = async (id: string, content: any) => {
    const data = await request('put', content, `messageAI/${id}`)
    return data;
}