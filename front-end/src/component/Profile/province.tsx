import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Dialog } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { prifileActions } from '../../store/profile';
import { getUser, updateUsers } from '../../API/user/user.api';
import { userActions } from '../../store/user';
import { alertActions } from '../../store/alert';

const host = "https://provinces.open-api.vn/api/";

const Province: React.FC = () => {
    const user = useSelector((state: any) => state.user.user)
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        callAPI('p/?depth=1');
    }, []);

    const callAPI = (api: string) => {
        axios.get(host + api)
            .then((response) => {
                setCities(response.data);
            });
    }

    const callApiDistrict = (api: string) => {
        axios.get(host + api)
            .then((response) => {
                setDistricts(response.data.districts);
            });
    }

    const callApiWard = (api: string) => {
        axios.get(host + api)
            .then((response) => {
                setWards(response.data.wards);
            });
    }

    const renderData = (array: any[], select: string) => {
        return (
            <>
                <option value="">Chọn</option>
                {array.map(element => (
                    <option key={element.code} data-id={element.code} value={element.name}>{element.name}</option>
                ))}
            </>
        );
    }

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = event.target.selectedOptions[0].getAttribute('data-id');
        if (cityId) {
            callApiDistrict(`p/${cityId}?depth=2`);
            setSelectedCity(event.target.value);
            setSelectedDistrict('');
            setSelectedWard('');
        }
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = event.target.selectedOptions[0].getAttribute('data-id');
        if (districtId) {
            callApiWard(`d/${districtId}?depth=2`);
            setSelectedDistrict(event.target.value);
            setSelectedWard('');
        }
    };

    const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWard(event.target.value);
    };
    const province = useSelector((state: any) => state.profile.province);
    useEffect(() => {
        setOpen(province.open)
    }, [province])

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(prifileActions.GetProvince({
            open: false,
            mode: ''
        }))
        setOpen(false);
    };


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px',
                        gap: '10px'
                    }}
                >
                    <h2
                        style={{
                            color: 'black',
                            fontSize: '25px',
                            fontWeight: '550',
                            textAlign: 'center',
                        }}
                    >{province.mode === 'live' ? 'Choose city' : 'Choose country'}</h2>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '10px'
                        }}
                    >
                        <select id="city" onChange={handleCityChange} value={selectedCity}
                            style={{
                                border: 'none',
                                background: '#c6bfbf4d',
                                borderRadius: '10px',
                                padding: '5px',
                                color: '#2a322ab8',
                            }}
                        >
                            <option value="">Chọn tỉnh thành</option>
                            {renderData(cities, 'city')}
                        </select>

                        <select id="district" onChange={handleDistrictChange} value={selectedDistrict}
                            style={{
                                border: 'none',
                                background: '#c6bfbf4d',
                                borderRadius: '10px',
                                padding: '5px',
                                color: '#2a322ab8',
                            }}
                        >
                            <option value="">Chọn quận huyện</option>
                            {renderData(districts, 'district')}
                        </select>

                        <select id="ward" onChange={handleWardChange} value={selectedWard}
                            style={{
                                border: 'none',
                                background: '#c6bfbf4d',
                                borderRadius: '10px',
                                padding: '5px',
                                color: '#2a322ab8',
                            }}
                        >
                            <option value="">Chọn phường xã</option>
                            {renderData(wards, 'ward')}
                        </select>

                        <h2 id="result"></h2>
                    </Box>
                    <p
                        style={{
                            textAlign: 'center',
                            color: '#43ab30de',
                            fontWeight: '600',
                            background: '#8080801a',
                            padding: '10px',
                            borderRadius: '15px',
                        }}
                    >{`${selectedWard !== '' ? selectedWard + ',' : ''}${selectedDistrict !== '' ? selectedDistrict + ',' : ''} ${selectedCity}`}</p>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            onClick={() => {
                                handleClose()
                            }}
                        >Cancel</Button>
                        <Button disabled={selectedWard === ''}
                            onClick={async () => {
                                const updatedUser = { ...user };
                                const addressParts = [];
                                if (selectedWard !== '') {
                                    addressParts.push(selectedWard);
                                }
                                if (selectedDistrict !== '') {
                                    addressParts.push(selectedDistrict);
                                }
                                if (selectedCity !== '') {
                                    addressParts.push(selectedCity);
                                }
                                const fullAddress = addressParts.join(', ');
                                if (province.mode === 'live') {
                                    updatedUser.information = { ...updatedUser.information, Live: fullAddress };
                                }
                                else {
                                    updatedUser.information = { ...updatedUser.information, Countryside: fullAddress };
                                }
                                await updateUsers(user._id, updatedUser);
                                const users = await getUser(updatedUser._id);
                                dispatch(userActions.setUser(users))
                                dispatch(alertActions.setColorGreen());
                                dispatch(alertActions.setContentAlert(`Cập nhật thông tin thành công!`));
                                dispatch(alertActions.showAlert());
                                handleClose()
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Dialog >
        </>
    );
}

export default Province;
