import { requesttest } from '../request';

export const getMail = async (mail: String) => {
    const data = await requesttest('get', '', `confirm-email/${mail}`)
    return data;
}

export const VeriCode = async (code: String) => {
    const data = await requesttest('post', '', `confirm-email/confirm/${code}`)
    return data;
}