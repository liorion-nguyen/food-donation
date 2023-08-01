import { Avatar, Box, Button, CircularProgress, Grid, InputAdornment, OutlinedInput } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

import ElementOverview from "../component/Overview";
import ElementPostmanager from "../component/Postmanager";
import ElementLocation from "../component/Location";
import ElementReward from "../component/Reward";
import ElementPaymentRecord from "../component/PaymentRecord";
import { DataHomeActions } from "../store/DataHome";

import Overview from '../Images/home/main/Overview.svg';
import Location from '../Images/home/main/Location.svg';
import PostManager from '../Images/home/main/PostManager.svg';
import IconDonation from '../Images/home/overview/IconDonation.svg';
import Reward from '../Images/home/main/Reward.svg';
import Logo from '../Images/home/main/Logo.svg'
import AlertDialogSlide from "../extension/Dialog/Dialog";
import Errol from "../Images/home/main/errol.svg";

const Cookies = require('js-cookie');

export default function Home(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('jwt') || Cookies.get('jwt') === undefined) {
            navigate('/Login');
        }
    }, [Cookies.get('jwt')])

    useEffect(() => {
        const url = window.location.pathname.split('/').pop();
        if (url !== "Overview") {
            if (url === "") {
                dispatch(DataHomeActions.setPage("Overview"))
            }
            else if (url === "Location" || url === "Postmanager" || url === "Paymentrecord" || url === "Reward") dispatch(DataHomeActions.setPage(url))
            else dispatch(DataHomeActions.setPage("errol"))
        }

    }, [window.location.pathname.split('/').pop()])

    const dispatch = useDispatch();
    const sign = useSelector((state: any) => state.sign)
    function stringToColor(string: string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }
    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const navLefts = [
        {
            icon: Overview,
            content: "Overview",
        },
        {
            icon: Location,
            content: "Location",
        },
        {
            icon: PostManager,
            content: "Postmanager",
        },
        {
            icon: Reward,
            content: "Reward"
        },
        {
            icon: IconDonation,
            content: "Paymentrecord"
        }
    ];

    const [mouseNavleft, setMouseNavleft] = useState("")
    const [heightWindow, setHeightWindow] = useState(window.innerHeight)
    const keyNavLeft = useSelector((state: any) => state.dataHome.page);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleOut = () => {
        Cookies.remove('jwt');
        window.location.reload();
    }
    return (
        <Box
            style={{
                position: 'relative',
                display: sign.check ? 'block' : 'none'
            }}
        >
            <Box
                style={{
                    height: `${heightWindow}px`,
                    width: '15%',
                    background: '#FCFCFD',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '1',
                    borderRight: '1px solid #F4F5F6',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    style={{
                        padding: '20px 10px',
                    }}
                >
                    <Box
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                        onClick={() => { window.location.href = "/" }}
                    >
                        <img src={Logo}
                            style={{
                                width: '25%',
                            }}
                        />
                        <h3
                            style={{
                                margin: '0 0 0 10px',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '800',
                                fontSize: '22px',
                                lineHeight: '150%',
                                color: '#2BA84A',
                            }}
                        >Startnow</h3>
                    </Box>
                    <Grid container spacing={1}
                        style={{
                            marginTop: `${heightWindow * 0.05}px`,
                        }}
                    >
                        {
                            navLefts.map((navLeft, index) => (
                                <Grid item xs={12} key={index}>
                                    <Box
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderRadius: '4px',
                                            padding: '15px',
                                        }}
                                        sx={{
                                            color: keyNavLeft === navLeft.content ? '#189548' : '#B1B5C3',
                                            background: keyNavLeft === navLeft.content ? '#D5EEDB' : '',
                                            '&:hover': {
                                                color: '#2BA84A',
                                                background: '#D5EEDB',
                                                opacity: '0.8',
                                                transition: 'all 0.3s',
                                                cursor: 'pointer'
                                            },
                                        }}
                                        onClick={() => {
                                            dispatch(DataHomeActions.setPage(navLeft.content))
                                            if (navLeft.content === "Overview") {
                                                navigate('/')
                                            }
                                            else {
                                                const pre = '/'
                                                navigate(pre + navLeft.content);

                                            }
                                        }}
                                        onMouseEnter={() => {
                                            setMouseNavleft(navLeft.content);
                                        }}
                                        onMouseLeave={() => {
                                            setMouseNavleft("");
                                        }}
                                    >
                                        <Box>
                                            <img src={navLeft.icon}
                                                style={{
                                                    filter: (keyNavLeft === navLeft.content) || (mouseNavleft == navLeft.content) ? '' : 'invert(49%) sepia(0%) hue-rotate(87deg) saturate(2)',
                                                }}
                                            />
                                        </Box>
                                        <p
                                            style={{
                                                margin: '0 0 0 15px',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {navLeft.content}
                                        </p>
                                    </Box>
                                </Grid>
                            ))

                        }
                    </Grid>
                </Box>

            </Box>
            <Box
                style={{
                    position: 'absolute',
                    right: '0',
                    width: '85%',
                }}
            >
                <Box
                    style={{
                        position: 'fixed',
                        zIndex: 2,
                        right: '0',
                        width: '85%',
                        height: '60px',
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 30px',
                            border: '1px solid #F4F5F6',
                            background: '#FCFCFD',
                        }}
                    >
                        <OutlinedInput
                            placeholder="Search a campaign"
                            startAdornment={<InputAdornment position="start"><SearchIcon
                                style={{
                                    fontSize: '30px',
                                    color: '#353945'
                                }}
                            /></InputAdornment>}
                            style={{
                                width: '35%',
                                background: '#F4F5F6',
                                fontSize: '18px',
                                height: '50px'

                            }}

                            sx={{
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: 'none',
                                },
                            }}
                        />

                        <Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar {...stringAvatar('Kent Dodds')}
                                            style={{
                                                scale: '1.2'
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleOut}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Fragment>
                    </Box>
                </Box>

                <Box
                    sx={{
                        marginTop: '70px',
                        height: '500px',
                        width: '100%',
                        backgorund: '#fcfcfd',
                    }}
                >
                    {keyNavLeft === "Overview" && <ElementOverview />}
                    {keyNavLeft === "Postmanager" && <ElementPostmanager />}
                    {keyNavLeft === "Location" && <ElementLocation />}
                    {keyNavLeft === "Reward" && <ElementReward />}
                    {keyNavLeft === "Paymentrecord" && <ElementPaymentRecord />}
                    {keyNavLeft === "errol" && (
                        <>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '80vh'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        width: '30%',
                                        alignItems: 'center'
                                    }}
                                >
                                    <img src={Errol}
                                        style={{
                                            width: '30%'
                                        }}
                                    />
                                    <h3>Bạn hiện không xem được nội dung này</h3>
                                    <p>Lỗi này thường do chủ sở hữu chỉ chia sẻ nội dung với một nhóm nhỏ, thay đổi người được xem hoặc đã xóa nội dung.</p>
                                    <Button variant="contained"
                                        onClick={() => {
                                            const pre = '/'
                                            navigate(pre);
                                            dispatch(DataHomeActions.setPage("Overview"))
                                        }}
                                    >Đi tới trang Overview</Button>
                                </Box>
                            </Box>
                        </>
                    )}
                    <AlertDialogSlide />
                </Box>
            </Box>
        </Box>
    );
}