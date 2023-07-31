import axios from 'axios';

export const getPaymentrecords = async (page: number, show: number) => {
    const data = await axios({
        method: 'get',
        url: `http://localhost:8000/paymentrecords?page=${page}&show=${show}`,
    })
        .then(res => res.data);
    return data;
};

export const createPaymentrecords = async (content: any) => {
    const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/paymentrecords',
        data: content,
    })
        .then(res => res.data);
    return data;
};

export const deletePaymentrecords = async (content: any) => {
    const data = await axios({
        method: 'delete',
        url: `http://localhost:8000/paymentrecords/${content}`,
    })
        .then(res => res.data);
    return data;
};

export const updatePaymentrecords = async (id: string, content: any) => {
    const data = await axios({
        method: 'put',
        url: `http://localhost:8000/paymentrecords/${id}`,
        data: content,
    })
        .then(res => res.data);
    return data;
};