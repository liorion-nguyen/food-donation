import { request } from '../request';

export const getPaymentrecords = async (page: number, show: number) => {
    const data = await request('get', '', `paymentrecords?page=${page}&show=${show}`)
    return data;
}

export const createPaymentrecords = async (content: any) => {
    const data = await request('post', content, `paymentrecords`)
    return data;
}

export const deletePaymentrecords = async (content: any) => {
    const data = await request('delete', content, `paymentrecords/${content}`)
    return data;
}

export const updatePaymentrecords = async (id: string, content: any) => {
    const data = await request('put', content, `paymentrecords/${id}`)
    return data;
}