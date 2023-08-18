import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { alertActions } from '../store/alert';
import { CheckLogin } from '../API/user/user.api';

import Logo from '../Images/home/main/Logo.svg';
import navLeft from '../Images/sign/sign-up/SignUp_NavLeft.png';
import { decodedAT } from '../API/decodedAccessToken/decodedAccessToken.api';

const Cookies = require('js-cookie');
interface AccountUser {
    username: string;
    password: string;
    contact: string;
    isAdmin: boolean;
    orgId: Object;
    status: boolean;
}

const Login: React.FC = () => {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const decoded = async () => {
            const encode = Cookies.get('jwt') || "liorion";

            const user = await decodedAT(encode)
            
            if (user.error === "Invalid Access Token") {
                Cookies.remove('jwt');
            }
            else {
                navigate('/');
            }
        }
        decoded();
    }, [Cookies.get('jwt')])

    const dispatch = useDispatch();
    const alert = useSelector((state: any) => state.alert)

    const [accountUser, setAccountUser] = useState<AccountUser>({
        username: '',
        password: '',
        contact: '',
        isAdmin: false,
        orgId: {},
        status: false,
    });
    const [height, setHeight] = useState(document.documentElement.scrollHeight)
    const handleLogin = () => {
        const Check = async () => {
            try {
                const response = await CheckLogin({
                    username: accountUser.username,
                    password: accountUser.password,
                });
                if (!response) {
                    dispatch(alertActions.showAlert());
                    dispatch(alertActions.setColorWrong());
                    dispatch(alertActions.setContentAlert('Tài khoản đã bị khoá!'));
                    return false;
                } else {
                    dispatch(alertActions.showAlert());
                    dispatch(alertActions.setColorGreen());
                    dispatch(alertActions.setContentAlert('Đăng nhập thành công'));
                    const accessToken = response.accessToken;
                    Cookies.set('jwt', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
                    const jwtCookie = Cookies.get('jwt');
                    return true;
                }


            } catch (error) {
                dispatch(alertActions.showAlert());
                dispatch(alertActions.setColorWrong());
                dispatch(alertActions.setContentAlert('Tên đăng nhập hoặc mật khẩu không chính xác'));
                return false;
            }
        };
        Check()
        setAccountUser({
            username: '',
            password: '',
            contact: '',
            isAdmin: false,
            orgId: {},
            status: false,
        })
        usernameInputRef.current?.focus();
    };

    const [showPassword, setShowPassword] = useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box style={{ height: '100vh' }}>
            <Grid container>
                <Grid item md={7}
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'block'
                        }
                    }}
                >
                    <img
                        src={navLeft}
                        style={{
                            width: '100%',
                            height: height,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            width: {
                                xs: '90%',
                                md: '70%',
                            },
                            textAlign: 'center',
                            height: '70vh',
                            padding: {
                                xs: `${height * 0.15}px 5%`,
                                md: `${height * 0.15}px 15%`,
                            },
                        }}
                    >
                        <img
                            src={Logo}
                            style={{
                                width: '70%',
                                padding: '20px 15%',
                            }}
                        />
                        <p style={{ fontSize: '35px', fontWeight: '500', margin: '10px 0' }}>Hello Again!</p>
                        <p style={{ fontSize: '12px', color: 'grey', margin: '10px 0 20px 0' }}>
                            Welcome to Food Donation, where we make a difference. Join us in our mission to combat hunger and food
                            waste. Together, we can make a positive impact!
                        </p>
                        <Box style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: '#3b5998',
                                    padding: '9px 0',
                                    borderRadius: '5px',
                                    width: '38%',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                <FacebookTwoToneIcon />
                                <span>Facebook</span>
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: '#d82424',
                                    padding: '9px 0',
                                    borderRadius: '5px',
                                    width: '38%',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                                <MailOutlineTwoToneIcon style={{ marginRight: '5px' }} />
                                <span>Google</span>
                            </Box>
                        </Box>
                        <p
                            style={{
                                margin: '20px 0'
                            }}
                        >OR</p>
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            value={accountUser.username}
                            onChange={(e) => {
                                setAccountUser((prevAccountUser) => ({
                                    ...prevAccountUser,
                                    username: e.target.value,
                                }));
                            }}
                            inputRef={usernameInputRef}
                        />
                        <Box
                            sx={{
                                '.MuiFormControl-root': {
                                    width: '100%',
                                    margin: '15px 0 30px 0'
                                }
                            }}
                        >
                            <FormControl
                                sx={{
                                    m: 1, width: '25ch',
                                }}
                                variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'password' : 'text'}
                                    value={accountUser.password}
                                    onChange={(e) => {
                                        setAccountUser((prevAccountUser) => ({
                                            ...prevAccountUser,
                                            password: e.target.value,
                                        }));
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Box>


                        <Button
                            variant="contained"
                            style={{
                                padding: '10px 0',
                                background: accountUser.username !== '' && accountUser.password !== '' ? '#2BA84A' : '#777E91',
                            }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0 20px 0' }}>
                            <a style={{ color: '#4d96ff', textDecoration: 'none', fontSize: '14px' }} href="/SignUp">
                                Register for an account now
                            </a>
                            <a style={{ color: '#4d96ff', textDecoration: 'none', fontSize: '14px' }} href="#">
                                I can't remember my password
                            </a>
                        </Box>
                        <hr
                            style={{
                                height: '1px',
                                backgroundColor: 'rgba(128, 128, 128, 0.39)',
                                border: 'none',
                                width: '100%',
                                margin: '0 0 20px 0',
                            }}
                        />
                        <span style={{ fontSize: '12px' }}>
                            This site is protected by reCAPTCHA and{' '}
                            <a href="#" style={{ color: '#4d96ff', textDecoration: 'none', fontSize: '12px' }}>
                                Terms of Use
                            </a>{' '}
                            apply
                        </span>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;

