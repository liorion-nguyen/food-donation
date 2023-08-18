import { requesttest } from '../request';

export const checkMail = async (mail: String) => {
    const data = await requesttest('get', '', `confirm-email/checkmail/${mail}`)
    return data;
}

export const checkUsername = async (username: String) => {
    const data = await requesttest('get', '', `confirm-email/checkusername/${username}`)
    return data;
}

export const getMail = async (mail: String) => {
    const data = await requesttest('get', '', `confirm-email/${mail}`)
    return data;
}

export const VeriCode = async (code: String) => {
    const data = await requesttest('post', '', `confirm-email/confirm/${code}`)
    return data;
}