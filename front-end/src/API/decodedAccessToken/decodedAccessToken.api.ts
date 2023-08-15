import { requesttest } from '../request';


export const decodedAT = async (token: string) => {
    const data = await requesttest('get', '', `decrypt-accesstoken/${token}`)
    return data;
}

