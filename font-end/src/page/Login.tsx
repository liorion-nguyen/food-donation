import { Box, Button, Grid, TextField } from '@mui/material';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../store/alert';
import { CheckLogin } from '../API/Api';
import Logo from '../Images/Logo.svg';
import navLeft from '../Images/SignUp_NavLeft.png';


const Cookies = require('js-cookie');
interface AccountUser {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (Cookies.get('jwt') || Cookies.get('jwt') !== undefined) {
            navigate('/');
        }
    }, [Cookies.get('jwt')])
    const dispatch = useDispatch();
    const alert = useSelector((state: any) => state.alert)
    const Data = [
        {
            username: 'QuocChung',
            password: '070803'
        },
        {
            username: 'liorion',
            password: 'chung123'
        },
    ]

    const [accountUser, setAccountUser] = useState<AccountUser>({
        username: '',
        password: ''
    });
    const [height, setHeight] = useState(document.documentElement.scrollHeight)
    const handleLogin = () => {
        const Check = async () => {
            try {
                const response = await CheckLogin({
                    username: accountUser.username,
                    password: accountUser.password,
                });
                dispatch(alertActions.showAlert());
                dispatch(alertActions.setColorGreen());
                dispatch(alertActions.setContentAlert('Đăng nhập thành công'));
                const accessToken = response.accessToken;
                Cookies.set('jwt', accessToken, { expires: 0.001, secure: true, sameSite: 'strict' });
                const jwtCookie = Cookies.get('jwt');
                return true;
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
            password: ''
        })
        usernameInputRef.current?.focus();
    };
    return (
        <Box style={{ height: `${height}px` }}>
            <Grid container>
                <Grid item xs={8}>
                    <img
                        src={navLeft}
                        style={{
                            width: '100%',
                            height: height,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            width: '70%',
                            textAlign: 'center',
                            height: `${height * 0.7}px`,
                            padding: `${height * 0.15}px 15%`,
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
                                <FacebookTwoToneIcon style={{ marginRight: '5px' }} />
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
                        <p>OR</p>
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
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            value={accountUser.password}
                            style={{ margin: '15px 0 30px 0' }}
                            onChange={(e) => {
                                setAccountUser((prevAccountUser) => ({
                                    ...prevAccountUser,
                                    password: e.target.value,
                                }));
                            }}
                        />
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

