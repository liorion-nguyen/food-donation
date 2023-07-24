import { Box, Button, CircularProgress, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider, Typography, cardContentClasses, createTheme, responsiveFontSizes } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import navLeft from "../Images/SignUp_NavLeft.png"
import iconWorld from "../Images/SignUp_IconWorld.svg"
import React, { useEffect, useState } from "react";
import { MuiTelInput } from "mui-tel-input";
import { MuiOtpInput } from "mui-one-time-password-input";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { createUsers } from "../API/Api";
import { useNavigate } from "react-router-dom";


const Cookies = require('js-cookie');

export default function SignUp() {
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get('jwt') || Cookies.get('jwt') !== undefined) {
            navigate('/');
        }
    }, [Cookies.get('jwt')])
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
    const [color, setColor] = useState(true)
    const [vertifyOTP, setVertifyOTP] = useState("123456")

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
            inputPhone.length === 11 && otp.length === 0 ? setStep(2) : (
                otp.length === 6 ? setStep(3) : setStep(1)
            )
            setLoading(false)
        }, Math.random() * 1000)
    }
    const handleButton = () => {
        switch (step) {
            case 1:
                Nextstep()
                break;
            case 2:
                if (vertifyOTP === otp) {
                    setContentAlert("Verify Correct!");
                    setColor(true)
                    handleClick();
                    Nextstep();
                }
                else {
                    setContentAlert("Incorrect!");
                    handleClick();
                    setColor(false)
                    setLoading(true)
                    setTimeout(() => {
                        setOtp("")
                        setLoading(false)
                    }, Math.random() * 1000)
                }
                break;

            case 3:
                handleValidation();
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

    const handleValidation = () => {
        const password = accountUser.password;
        const name = accountUser.name;
        if (password.length >= 6 && /[^\w@_]/.test(password) === false && /\d/.test(password) === true && password !== name) {
            if (name.trim().split(" ").length < 2 && /[^\w\s]/.test(name) === false) {
                setColor(true);
                createUsers({
                    phone: `${firstPhone} ${inputPhone}`,
                    password: password,
                    username: name,
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

    return (
        <>
            <Box sx={{ flexGrow: 1 }}
                style={{
                    display: 'flex',
                    height: `${height}px`
                }}

            >
                <Grid container spacing={2} >
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <Box
                            style={{
                                width: '70%',
                                height: `${height * 0.8}px`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: `${height * 0.1}px 15%`,
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
                                    }}
                                >Welcome to StartNow</Typography>
                            </ThemeProvider>
                            <img src={iconWorld}
                                style={{
                                    width: '100%'
                                }}
                            />

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
                                    >{`A verification codes has been sent to (+${firstPhone}) ${inputPhone}`}</p>
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
                                style={{
                                    width: '100%',
                                    height: '56px',
                                    background: (inputPhone.length === 11 && step === 1) || (otp.length === 6 && step === 2) || (fillInfo1 && fillInfo2) ? '#2BA84A' : '#777E91',
                                    borderRadius: '4px',
                                }}
                                onClick={handleButton}
                            >
                                {((inputPhone.length === 11 && step === 1) || (otp.length === 6 && step === 2) || (fillInfo1 && fillInfo2)) && loading ? <CircularProgress
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
                                    marginTop: '-15px'
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