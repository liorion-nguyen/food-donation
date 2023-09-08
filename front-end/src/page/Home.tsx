import { Avatar, Box, Button, CircularProgress, Dialog, Grid, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";
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
import ElementNewFeed from "../component/NewFeed";
import ElementManager from "../component/Manager";
import { DataHomeActions } from "../store/DataHome";

import Overview from '../Images/home/main/Overview.svg';
import newFeed from '../Images/home/main/newFeed.svg';
import Manager from '../Images/home/main/Manager.png';
import Location from '../Images/home/main/Location.svg';
import PostManager from '../Images/home/main/PostManager.svg';
import IconDonation from '../Images/home/overview/IconDonation.svg';
import Reward from '../Images/home/main/Reward.svg';
import Logo from '../Images/home/main/Logo.svg'
import AlertDialogSlide from "../extension/Dialog/Dialog";
import Errol from "../Images/home/main/errol.svg";
import { decodedAT } from "../API/decodedAccessToken/decodedAccessToken.api";
import { StyleTitleHeader, StyleTitleLogo } from "../StyleComponent/Home";
import Error from "../component/Error";
import { getUser } from "../API/user/user.api";
import { userActions } from "../store/user";
import AvatarSmall from "../component/Profile/avatar";


const Cookies = require('js-cookie');

export default function Home(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.user.user)
    useEffect(() => {
        if (users.username) {
            let extraNavLeft = [...navLefts];
            if (users.orgId.Location && !extraNavLeft.some(navItem => navItem.content === 'Location')) {
                extraNavLeft.push({
                    icon: Location,
                    content: "Location",
                })
            }
            if (users.orgId.Postmanager && !extraNavLeft.some(navItem => navItem.content === 'Postmanager')) {
                extraNavLeft.push({
                    icon: PostManager,
                    content: "Postmanager",
                })
            }
            if (users.orgId.Paymentrecord && !extraNavLeft.some(navItem => navItem.content === 'Paymentrecord')) {
                extraNavLeft.push({
                    icon: IconDonation,
                    content: "Paymentrecord",
                })
            }
            if (users.orgId.Reward && !extraNavLeft.some(navItem => navItem.content === 'Reward')) {
                extraNavLeft.push({
                    icon: Reward,
                    content: "Reward",
                })
            }
            if (users.isAdmin && !extraNavLeft.some(navItem => navItem.content === 'Manager')) {
                extraNavLeft.push({
                    icon: Manager,
                    content: "Manager",
                })
            }
            setNavLefts(extraNavLeft)
        }
    }, [users])

    const [navLefts, setNavLefts] = useState([
        {
            icon: Overview,
            content: "Overview",
        },
        {
            icon: newFeed,
            content: "NewFeed"
        },
    ])


    useEffect(() => {
        if (!Cookies.get('jwt') || Cookies.get('jwt') === undefined) {
            navigate('/Login');
        }
        else {
            const decoded = async () => {
                const use = await decodedAT(Cookies.get('jwt'))

                if (use.error === "Invalid Access Token") {
                    Cookies.remove('jwt');
                    navigate('/Login');
                }
                else {
                    dispatch(DataHomeActions.getUser())
                    const u = await getUser(use.user._id);
                    dispatch(userActions.setUser(u))
                }

            }
            decoded();
        }
    }, [Cookies.get('jwt')])

    useEffect(() => {
        const url = window.location.pathname.split('/').pop();
        if (url !== "Overview") {
            if (url === "") {
                dispatch(DataHomeActions.setPage("Overview"))
            }
            else if (url === "Location" || url === "Postmanager" || url === "Paymentrecord" || url === "Reward" || url === "NewFeed" || url === "Manager") dispatch(DataHomeActions.setPage(url))
            else dispatch(DataHomeActions.setPage("errol"))
        }

    }, [window.location.pathname.split('/').pop()])

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

    const [search, setSearch] = useState("");

    const handleChange = async (event: any) => {
        setSearch(event.target.value);
        if (event.key === "Enter") {
            dispatch(DataHomeActions.setSearch(search));
            await dispatch(DataHomeActions.setPage(''));
            setTimeout(() => {
                dispatch(DataHomeActions.setPage(keyNavLeft))
            }, 1)
        }
    }

    useEffect(() => {
        if (keyNavLeft !== "") {
            dispatch(DataHomeActions.setSearch(""));
            setSearch("")
        }
    }, [keyNavLeft])

    return (
        <Box
            style={{
                position: 'relative',
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
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                md: 'row',
                            },
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                        onClick={() => { window.location.href = "/" }}
                    >
                        <img src={Logo} />
                        <StyleTitleLogo>Startnow</StyleTitleLogo>
                    </Box>
                    <Grid container spacing={1}
                        style={{
                            marginTop: `${heightWindow * 0.05}px`,
                        }}
                    >
                        {
                            navLefts.map((navLeft) => (
                                <Grid item xs={12} key={navLeft.content}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: {
                                                xs: 'column',
                                                md: 'row',
                                            },
                                            alignItems: 'center',
                                            borderRadius: '4px',
                                            padding: '10px 0',
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
                                                    filter: (navLeft.content === "NewFeed" || navLeft.content === "Manager") ? ((keyNavLeft === navLeft.content) || (mouseNavleft == navLeft.content) ? 'invert(53%) sepia(45%) saturate(722%) hue-rotate(83deg) brightness(92%) contrast(88%)' : '') : (keyNavLeft === navLeft.content) || (mouseNavleft == navLeft.content) ? '' : 'invert(49%) sepia(0%) hue-rotate(87deg) saturate(2)',
                                                    margin: '0 15px',
                                                    width: '20px'
                                                }}
                                            />
                                        </Box>
                                        <StyleTitleHeader>
                                            {navLeft.content}
                                        </StyleTitleHeader>
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
                            startAdornment={<InputAdornment position="start"
                            ><SearchIcon
                                    style={{
                                        fontSize: '30px',
                                        color: '#353945'
                                    }}
                                /></InputAdornment>}
                            sx={{
                                width: {
                                    xs: '90%',
                                    sm: '60%',
                                    md: '35%',
                                },
                                background: '#F4F5F6',
                                fontSize: '18px',
                                height: '50px',
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: 'none',
                                },
                            }}
                            value={search}
                            onChange={handleChange} onKeyUp={handleChange}
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
                                        <AvatarSmall value={users.avatar} size={50} />
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
                                <MenuItem onClick={() => {
                                    window.location.href = "/Profile"
                                    handleClose();
                                }}>
                                    <AvatarSmall value={users.avatar} size={40} /> Profile
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
                    {keyNavLeft === "Manager" && <ElementManager />}
                    {keyNavLeft === "Overview" && <ElementOverview />}
                    {keyNavLeft === "Postmanager" && <ElementPostmanager />}
                    {keyNavLeft === "Location" && <ElementLocation />}
                    {keyNavLeft === "Reward" && <ElementReward />}
                    {keyNavLeft === "NewFeed" && <ElementNewFeed />}
                    {keyNavLeft === "Paymentrecord" && <ElementPaymentRecord />}
                    {keyNavLeft === "errol" && <Error />}
                    <AlertDialogSlide />
                </Box>
            </Box>
        </Box>
    );
}