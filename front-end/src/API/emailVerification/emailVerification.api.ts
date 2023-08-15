import { request } from '../request';

export const getMail = async (mail: String) => {
    const data = await request('get', '', `confirm-email/${mail}`)
    return data;
}

export const VeriCode = async (code: String) => {
    const data = await request('post', '', `confirm-email/confirm/${code}`)
    return data;
}