import { Box, Button, CircularProgress, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider, Typography, cardContentClasses, createTheme, responsiveFontSizes } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

import { createUsers } from "../API/user/user.api";

import navLeft from "../Images/sign/sign-up/SignUp_NavLeft.png"
import iconWorld from "../Images/sign/sign-up/SignUp_IconWorld.svg"
import { StyleImgWolrd } from "../StyleComponent/Sign";
import { VeriCode, checkMail, checkUsername, getMail } from "../API/emailVerification/emailVerification.api";
import { useDispatch } from "react-redux";
import { alertActions } from "../store/alert";

const Cookies = require('js-cookie');

export default function SignUp() {
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get('jwt') || Cookies.get('jwt') !== undefined) {
            navigate('/');
        }
    }, [Cookies.get('jwt')])
    const dispatch = useDispatch();
    let theme = createTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [firstPhone, setFirstPhone] = useState("+84")
    const [inputPhone, setInputPhone] = useState("")
    const [fillInfo1, setFillInfo1] = useState(false)
    const [fillInfo2, setFillInfo2] = useState(false)
    const [accountUser, setAccountUser] = useState({
        password: '',
        name: '',
    })
    const [email, setEmail] = useState("");
    const [color, setColor] = useState(true)

    const [step, setStep] = useState(1)
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };
    theme = responsiveFontSizes(theme);

    const [height, setHeight] = useState(document.documentElement.scrollHeight)
    const Nextstep = () => {
        setLoading(true)

        setTimeout(() => {
            email.length > 6 && otp.length === 0 ? setStep(2) : (
                otp.length === 6 ? setStep(3) : setStep(1)
            )
            setLoading(false)
        }, Math.random() * 1000)
    }
    const handleButton = async () => {
        switch (step) {
            case 1:
                setLoading(true)
                const check = await checkMail(email);
                if (check) {
                    dispatch(alertActions.setColorGreen());
                    dispatch(alertActions.setContentAlert(`Code vertify đang được gửi đến mail ${email}`));
                    dispatch(alertActions.showAlert());
                    await getMail(email);
                    setLoading(false);
                    setStep(2);
                }
                else {
                    dispatch(alertActions.setColorWrong());
                    dispatch(alertActions.setContentAlert('Mail đã bị trùng!'));
                    dispatch(alertActions.showAlert());
                    setLoading(false)
                }
                break;
            case 2:
                setLoading(true)
                const vertifyOTP = await VeriCode(otp)
                if (vertifyOTP) {
                    setContentAlert("Verify Correct!");
                    setColor(true)
                    handleClick();
                    setStep(3)
                }
                else {
                    setContentAlert("Incorrect!");
                    handleClick();
                    setColor(false)
                }
                setLoading(false);

                break;
            case 3:
                setLoading(true)
                await handleValidation();
                setLoading(false)
                break;

        }

    }

    const [open, setOpen] = useState(false);
    const [contentAlert, setContentAlert] = useState("")

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button
                size="small"
                onClick={handleClose}
                style={{
                    color: "white"
                }}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const handleValidation = async () => {
        const password = accountUser.password;
        const name = accountUser.name;
        if (!(await checkUsername(name))) {
            dispatch(alertActions.setColorWrong());
            dispatch(alertActions.setContentAlert('Username đã bị trùng!'));
            dispatch(alertActions.showAlert());
            return;
        }

        if (password.length >= 6 && /[^\w@_]/.test(password) === false && /\d/.test(password) === true && password !== name) {
            if (name.trim().split(" ").length < 2 && /[^\w\s]/.test(name) === false) {
                setColor(true);
                createUsers({
                    isAdmin: false,
                    orgId: {
                        Location: false,
                        Postmanager: false,
                        PaymentRecord: false,
                        Reward: false,
                    },
                    contact: email,
                    password: password,
                    username: name,
                    status: true,
                    fullname: '',
                    avatar: '',
                    cover: '',
                    bio: '',
                    information: {
                        Category: '',
                        Subname: '',
                        Work: '',
                        Education: '',
                        Live: '',
                        Countryside: '',
                        Relationship: '',
                        Join: getCurrentDate(),
                        Web: '',
                        Instagram: '',
                        Facebook: '',
                        Gender: '',
                        Datebird: '',
                    },
                })

                setContentAlert("Đăng ký thành công!");
                handleClick();
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                setColor(false)
                setContentAlert("Format tên hiển thị bạn nhập chưa đúng!");
                handleClick();
            }
        } else {
            setColor(false)
            setContentAlert("Format mật khẩu bạn nhập chưa đúng!");
            handleClick();
        }
    };


    const handleChange = (newValue: any) => {
        setFirstPhone(newValue)
    }

    const [otp, setOtp] = React.useState('')

    const handleChangeCode = (newValue: any) => {
        setOtp(newValue)
    }

    const getCurrentDate = () => {
        const currentDate = new Date();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        const formattedDate = `Join in ${month} ${year}`;
        return formattedDate;
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}
                style={{
                    display: 'flex',
                    height: '100vh',
                }}

            >
                <Grid container spacing={2} >
                    <Grid item md={7}
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'block',
                            }
                        }}
                    >
                        <Box
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <img src={navLeft}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box
                            sx={{
                                height: '80vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                width: {
                                    xs: '90%',
                                    md: '70%',
                                },
                                padding: {
                                    xs: `${height * 0.1}px 5%`,
                                    md: `${height * 0.1}px 15%`,
                                },
                            }}
                        >
                            <ThemeProvider theme={theme}>
                                <Typography variant="h4"
                                    style={{
                                        fontFamily: 'SF Pro',
                                        fontStyle: 'normal',
                                        fontWeight: '700',
                                        lineHeight: '38px',
                                        color: '#2BA84A',
                                        textAlign: 'center',
                                    }}
                                >Welcome to StartNow</Typography>
                            </ThemeProvider>
                            <StyleImgWolrd src={iconWorld}></StyleImgWolrd>

                            {/* <Box
                                style={{
                                    width: '100%',
                                    display: step === 1 ? 'block' : 'none'
                                }}
                            >
                                <Box
                                    style={{
                                        width: '100%',
                                        marginBottom: '20px'
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: 'SF Pro',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            fontSize: '20px',
                                            lineHeight: '30px',
                                            color: '#141416',
                                            margin: '0 0 7px 0',
                                        }}
                                    >Enter your phone number</p>
                                    <p
                                        style={{
                                            fontFamily: 'SF Pro',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: '15px',
                                            lineHeight: '24px',
                                            margin: '0',
                                            color: '#67686b',
                                        }}
                                    >Please enter your mobile phone to join our commuinity</p>
                                </Box>

                                <Grid container >
                                    <Grid item xs={1.5} >
                                        <Grid sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            height: "100%",
                                            ".MuiPaper-root": {
                                                height: "200px"
                                            }
                                        }}>
                                            <MuiTelInput value={firstPhone} onChange={handleChange}
                                                sx={{
                                                    '.css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input': {
                                                        display: 'none',
                                                    },
                                                    '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                                        border: 'none',
                                                    },
                                                    '.css-70qvj9 img': {
                                                        borderRadius: '50%',
                                                        width: '20px',
                                                        height: '20px',
                                                        objectFit: 'fill'
                                                    },
                                                    '.MuiButtonBase-root': {
                                                        border: '1px solid #e6e8eb',
                                                        padding: '5px',
                                                        borderRadius: '5px',
                                                    },
                                                    '& .MuiPaper-root': {
                                                        background: 'red',
                                                    },
                                                    ".MuiTelInput-Menu": {
                                                        height: "200px !important"
                                                    },
                                                    color: "red"
                                                }}
                                                inputProps={{
                                                    li: {
                                                        style: {
                                                            backgroundColor: 'red',
                                                        },
                                                    },
                                                }}

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={10.5}>
                                        <OutlinedInput
                                            value={inputPhone}
                                            placeholder="000 000 000"
                                            startAdornment={<InputAdornment position="start">{firstPhone}</InputAdornment>}
                                            onChange={(e) => {
                                                let formattedNumber = e.target.value.replace(/\s/g, '');
                                                let numericValue = formattedNumber.replace(/[^0-9]/g, '');
                                                let finalFormattedNumber = '';
                                                for (let i = 0; i < numericValue.length && i < 9; i++) {
                                                    finalFormattedNumber += numericValue[i];
                                                    if ((i + 1) % 3 === 0 && i !== numericValue.length - 1 && i !== 8) {
                                                        finalFormattedNumber += ' ';
                                                    }
                                                }
                                                setInputPhone(finalFormattedNumber);
                                            }}
                                            style={{
                                                width: '100%',
                                                color: 'rgba(0, 0, 0, 0.6)',
                                                outline: 'none',
                                                fontSize: '18px',
                                            }}
                                            sx={{
                                                ".MuiOutlinedInput-notchedOutline": {
                                                    border: 'none',
                                                },
                                                ".MuiTypography-body1": {
                                                    fontSize: '18px',
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box> */}

                            <Box
                                style={{
                                    width: '100%',
                                    display: step === 1 ? 'block' : 'none'
                                }}
                            >
                                <Box
                                    style={{
                                        width: '100%',
                                        marginBottom: '20px'
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: 'SF Pro',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            fontSize: '20px',
                                            lineHeight: '30px',
                                            color: '#141416',
                                            margin: '0 0 7px 0',
                                        }}
                                    >Enter your mail</p>
                                    <p
                                        style={{
                                            fontFamily: 'SF Pro',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: '15px',
                                            lineHeight: '24px',
                                            margin: '0',
                                            color: '#67686b',
                                        }}
                                    >Please enter your email to join our community</p>
                                </Box>

                                <TextField
                                    label="Enter your email to sign up"
                                    multiline
                                    maxRows={1}
                                    variant="filled"
                                    sx={{
                                        width: '100%',
                                    }}
                                    onChange={(e: any) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </Box>

                            <Box
                                style={{
                                    width: '100%',
                                    display: step === 2 ? 'block' : 'none'
                                }}
                            >
                                <Box
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: 'SF Pro',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            fontSize: '20px',
                                            lineHeight: '30px',
                                            color: '#141416',
                                            margin: '0 0 7px 0',
                                        }}
                                    >Vertify OTP codes</p>
                                    <p
                                        style={{
                                            fontFamily: 'SF Pro',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: '15px',
                                            lineHeight: '24px',
                                            margin: '0',
                                            color: '#67686b',
                                        }}
                                    >{`A verification codes has been sent to ${email}`}</p>
                                </Box>

                                <Box
                                    style={{
                                        width: '100%',
                                        marginTop: '20px',

                                    }}
                                >
                                    <MuiOtpInput value={otp} length={6} onChange={handleChangeCode}
                                        sx={{
                                            width: '100%',
                                            '.MuiInputBase-input': {
                                                border: '1px solid #2BA84A',
                                                borderRadius: '4px',
                                                backgroundColor: '#F4F5F6',
                                                padding: {
                                                    xs: '8px 0',
                                                    sm: '10px 0',
                                                    md: '14px 0',
                                                },

                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Box
                                style={{
                                    width: '100%',
                                    display: step === 3 ? 'block' : 'none'
                                }}
                            >
                                <FormControl sx={{ m: 1, width: '100%', margin: '20px 0' }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                    <FilledInput
                                        id="filled-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        onChange={(e) => {
                                            e.target.value === "" ? setFillInfo1(false) : setFillInfo1(true)
                                            let s = accountUser;
                                            s.password = e.target.value;
                                            setAccountUser(s);
                                        }}
                                    />
                                </FormControl>
                                <TextField id="filled-basic" label="Username" variant="filled"
                                    style={{
                                        width: '100%'
                                    }}
                                    onChange={(e) => {
                                        e.target.value === "" ? setFillInfo2(false) : setFillInfo2(true)
                                        let s = accountUser;
                                        s.name = e.target.value;
                                        setAccountUser(s);
                                    }}
                                />
                            </Box>



                            <Button variant="contained"
                                sx={{
                                    width: '100%',
                                    height: '56px',
                                    background: (inputPhone.length === 11 && step === 1) || (otp.length === 6 && step === 2) || (fillInfo1 && fillInfo2) ? '#2BA84A' : '#777E91',
                                    borderRadius: '4px',
                                    margin: {
                                        xs: '0',
                                        sm: '10px 0',
                                    }
                                }}
                                onClick={handleButton}
                            >
                                {((email.length > 6 && step === 1) || (otp.length === 6 && step === 2) || (fillInfo1 && fillInfo2)) && loading ? <CircularProgress
                                    style={{
                                        color: 'white',
                                        scale: '0.7'
                                    }}
                                /> : <span>Next</span>}
                            </Button>
                            <span
                                style={{
                                    color: 'black',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: '15px',
                                }}
                            >
                                <a
                                    style={{
                                        color: '#2BA84A',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                    }}
                                    href='/Login'
                                >Click here</a> to Sign up if you don't have an account
                            </span>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={contentAlert}
                action={action}
                sx={{
                    '.MuiSnackbarContent-root': {
                        background: color ? 'rgb(46, 125, 50)' : "rgb(211, 47, 47)"
                    }
                }}
            />
        </>
    );
}