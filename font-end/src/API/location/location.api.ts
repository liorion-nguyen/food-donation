import axios from 'axios';

export const getLocations = async () => {
    const data = await axios({
        method: 'get',
        url: 'http://localhost:8000/locations',
    })
        .then(res => res.data);
    return data;
};

export const createLocations = async (content: any) => {
    const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/locations',
        data: content,
    })
        .then(res => res.data);
    return data;
};

export const deleteLocations = async (content: any) => {
    const data = await axios({
        method: 'delete',
        url: `http://localhost:8000/locations/${content}`,
    })
        .then(res => res.data);
    return data;
};

export const updateLocations = async (id: string, content: any) => {
    const data = await axios({
        method: 'put',
        url: `http://localhost:8000/locations/${id}`,
        data: content,
    })
        .then(res => res.data);
    return data;
};