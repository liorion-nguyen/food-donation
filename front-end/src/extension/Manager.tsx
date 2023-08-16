import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../store/alert';
import { DataHomeActions } from '../store/DataHome';
import { updateUsers } from '../API/user/user.api';
import { DialogHomeActions } from '../store/DialogHome';

export default function Manager() {
    const users = useSelector((state: any) => state.dialog.data)

    const mode = users.mode;
    const data = users.data;
    console.log(data);
    


    const [inpUsername, setInpUsername] = useState(data.username || "")
    const [inpId, setInpId] = useState(data._id || "")
    const [inpContact, setInpContact] = useState(data.contact || "")
    const [inpLocation, setInpLocation] = useState(data.orgId.Location || false)
    const [inpPostmanager, setInpPostmanager] = useState(data.orgId.Postmanager || false)
    const [inpPaymentrecord, setInpPaymentrecord] = useState(data.orgId.Paymentrecord || false)
    const [inpReward, setInpReward] = useState(data.orgId.Reward || false)
    const [inpStatus, setInpStatus] = useState(data.status || false)
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const check_users = useSelector((state: any) => state.dataHome.User);

    const getDate = () => {
        const date = new Date();

        const time = `${date.toLocaleTimeString('en-GB')} ${date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })}`;
        return time;
    };

    const [fontFamily, setFontFamily] = useState("Headline 1");
    const handleSelector = (event: any) => {
        setFontFamily(event.target.value);
    };

    const Nextstep = async () => {
        const User = {
            username: inpUsername,
            password: data.password,
            contact: inpContact,
            orgId: {
                Location: inpLocation,
                Postmanager: inpPostmanager,
                Paymentrecord: inpPaymentrecord,
                Reward: inpReward
            },
            isAdmin: data.isAdmin,
            status: inpStatus,
        }
        const update = async () => {
            const response = await updateUsers(data._id, User)
            if (response !== "Error") {
                dispatch(alertActions.setColorGreen());
                dispatch(alertActions.setContentAlert('Cập nhật thông tin thành công!'));
                dispatch(alertActions.showAlert());
            }
            else {
                dispatch(alertActions.setColorWrong());
                dispatch(alertActions.setContentAlert('Chưa đủ quyền để thực hiện!'));
                dispatch(alertActions.showAlert());
            }
            dispatch(DataHomeActions.getUser());
            dispatch(DialogHomeActions.handleAdd());
        }
        update();
    }

    return (
        <Box
            style={{
                padding: '30px',
            }}
        >
            <Box
                style={{
                    width: '100%',
                }}
            >
                <h3
                    style={{
                        padding: '0 0 20px 0px',
                        borderBottom: '1px dashed #B1B5C4',
                        margin: '0',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '32px',
                        lineHeight: '40px',
                        color: '#2E2C34',
                        width: '100%',
                    }}
                >{mode !== "Update" ? "Add new user" : "Update user"}</h3>
            </Box>
            <p
                style={{
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '22px',
                    margin: '20px 0' 
                }}
            >User Information</p>
            <TextField
                id="outlined-read-only-input"
                label="ID"
                defaultValue={inpId}
                InputProps={{
                    readOnly: true,
                }}
                sx={{
                    width: '100%'
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '20px 0'
                }}
            >
                <TextField
                    id="outlined-read-only-input"
                    label="Username"
                    defaultValue={inpUsername}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{
                        width: '100%'
                    }}
                />
            </Box>
            <TextField
                id="outlined-read-only-input"
                label="Contact"
                defaultValue={inpContact}
                InputProps={{
                    readOnly: true,
                }}
                sx={{
                    width: '100%'
                }}
            />
            <Box>
                <p
                    style={{
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '22px',
                        margin: '15px 0'
                    }}
                >Site Permissions</p>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox
                            checked={inpLocation}
                            onChange={(e) => {
                                setInpLocation(e.target.checked)
                            }}
                        />} label="Location" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox
                            checked={inpPostmanager}
                            onChange={(e) => {
                                setInpPostmanager(e.target.checked)
                            }}
                        />} label="Post Manager" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox
                            checked={inpPaymentrecord}
                            onChange={(e) => {
                                setInpPaymentrecord(e.target.checked)
                            }}
                        />} label="Payment Record" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel control={<Checkbox
                            checked={inpReward}
                            onChange={(e) => {
                                setInpReward(e.target.checked)
                            }}
                        />} label="Reward" />
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '30px'
                }}
            >
                <Button variant="outlined"
                    sx={{
                        color: inpStatus ? '' : 'red',
                        border: inpStatus ? '' : '1px solid red',
                        width: '60%'
                    }}
                    onClick={() => {
                        setInpStatus(!inpStatus)
                    }}
                >{inpStatus ? "Active" : "InActive"}</Button>
            </Box>

            <Button variant="contained" color="success"
                style={{
                    width: '100%',
                    marginTop: '30px',
                    background: '#2BA84A',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#FCFCFD',
                    height: '48px',
                }}
                onClick={Nextstep}
            >
                {loading ? <CircularProgress
                    style={{
                        color: 'white',
                        scale: '0.7'
                    }}
                /> : <span>{mode !== "Update" ? "Create new user" : "Update user"}</span>}

            </Button>
        </Box>
    );
}