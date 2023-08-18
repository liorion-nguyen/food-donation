import { Avatar, Box, Divider, IconButton, InputAdornment, ListItemIcon, Menu, MenuItem, OutlinedInput, Tab, Tabs, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import logo from "../Images/home/main/Logo.svg"
import HomeIcon from '@mui/icons-material/Home';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Fragment, useEffect, useState } from "react";
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { decodedAT } from "../API/decodedAccessToken/decodedAccessToken.api";
import { useDispatch } from "react-redux";
import { DataHomeActions } from "../store/DataHome";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Posts from "../component/Profile/posts";


const Cookies = require('js-cookie');

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!Cookies.get('jwt') || Cookies.get('jwt') === undefined) {
            navigate('/Login');
        }
        else {
            const decoded = async () => {
                const user = await decodedAT(Cookies.get('jwt'))

                if (user.error === "Invalid Access Token") {
                    Cookies.remove('jwt');
                    navigate('/Login');
                }
                else {
                    dispatch(DataHomeActions.getUser())
                }
            }
            decoded();
        }
    }, [Cookies.get('jwt')])

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

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                overflowY: 'scroll'
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '99',
                    width: '100%',
                    background: '#fff',
                    boxShadow: '#80808054 0px 0px 4px 2px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '5px 15px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '20%'
                        }}
                    >
                        <img src={logo}
                            style={{
                                width: '50px',
                                height: '50px',
                            }}
                        />
                        <OutlinedInput
                            placeholder="Search on Food Donation"
                            startAdornment={<InputAdornment position="start"><SearchIcon
                                style={{
                                    fontSize: '23px',
                                    color: '#65676b',

                                }}
                            /></InputAdornment>}
                            sx={{
                                width: {
                                    xs: '80%',
                                    sm: '80%',
                                    md: '80%',
                                },
                                background: '#f0f2f5',
                                fontSize: '15px',
                                height: '40px',
                                borderRadius: '20px',
                                marginLeft: '10px',
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: 'none'
                                },
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            color: '#868686d6',
                            minWidth: '25%',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <HomeIcon
                            sx={{
                                fontSize: '32px',
                                padding: '10px 40px',
                                borderRadius: '10px',
                                backgroundColor: 'transparent',
                                ':hover': {
                                    background: '#f0f0f0',
                                }
                            }}
                        ></HomeIcon>
                        <AddToQueueIcon
                            sx={{
                                fontSize: '32px',
                                padding: '10px 40px',
                                borderRadius: '10px',
                                backgroundColor: 'transparent',
                                ':hover': {
                                    background: '#f0f0f0',
                                }
                            }}
                        ></AddToQueueIcon>
                        <GroupWorkIcon
                            sx={{
                                fontSize: '32px',
                                padding: '10px 40px',
                                borderRadius: '10px',
                                backgroundColor: 'transparent',
                                ':hover': {
                                    background: '#f0f0f0',
                                }
                            }}
                        ></GroupWorkIcon>
                        <SportsEsportsIcon
                            sx={{
                                fontSize: '32px',
                                padding: '10px 40px',
                                borderRadius: '10px',
                                backgroundColor: 'transparent',
                                ':hover': {
                                    background: '#f0f0f0',
                                }
                            }}
                        ></SportsEsportsIcon>
                    </Box>

                    <Box>
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
                                        <Avatar
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
                                <MenuItem onClick={() => {
                                    window.location.href = "/Profile"
                                    handleClose();
                                }}>
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
            </Box>

            <Box
                sx={{
                    width: '100vw',
                    background: '#ebedf1',
                    overflowY: 'scroll',
                    height: '1800px',

                }}
            >
                <Box
                    sx={{
                        width: '70vw',
                        padding: '0 15vw',
                        background: 'white',
                        boxShadow: '#80808054 0px 0px 6px 1px'
                    }}
                >
                    <Box
                        sx={{
                            height: '470px',
                            position: 'relative',
                        }}
                    >
                        <img src="https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg"
                            style={{
                                height: '100%',
                                width: '100%',
                                borderBottomLeftRadius: '10px',
                                borderBottomRightRadius: '10px',
                                objectFit: 'cover',
                                position: 'absolute',
                                top: '0',
                                left: '0'
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '20px',
                                right: '30px',
                                zIndex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                background: '#6c6a6ac2',
                                padding: '7px',
                                borderRadius: '10px',
                                color: 'white',
                                fontWeight: '500'
                            }}
                        >
                            <CameraAltIcon></CameraAltIcon>
                            <p
                                style={{
                                    marginLeft: '5px',

                                }}
                            >Add cover photo</p>
                        </Box>

                    </Box>

                    <Box
                        sx={{
                            position: 'relative',
                            marginTop: '-40px',
                            zIndex: '1',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 25px',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: '180px',
                                height: '180px'
                            }}
                        >
                            <img src="https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg"
                                style={{
                                    width: '170px',
                                    height: '170px',
                                    objectFit: 'cover',
                                    border: '5px solid white',
                                    borderRadius: '50%'
                                }}
                            />
                            <CameraAltIcon
                                sx={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '10px',
                                    background: '#e4e6ea',
                                    borderRadius: '50%',
                                    padding: '7px'
                                }}
                            ></CameraAltIcon>
                        </Box>

                        <Box
                            sx={{
                                padding: '0 15px'
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: '32px',
                                    margin: '0'
                                }}
                            >Nguyen Quoc Chung</h1>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #cbcdd3',
                            margin: '15px 25px 0 25px',
                            alignItems: 'center',
                        }}
                    >
                        <Tabs value={value} onChange={handleChange} centered
                            sx={{
                                color: '#65676b'
                            }}
                        >
                            <Tab label="Posts"
                                sx={{
                                    padding: '17px',
                                    fontWeight: 600,
                                }}
                            />
                            <Tab label="Introduce"
                                sx={{
                                    padding: '17px',
                                    fontWeight: 600,
                                }}
                            />
                            <Tab label="Album"
                                sx={{
                                    padding: '17px',
                                    fontWeight: 600,
                                }}
                            />
                            <Tab label="See more"
                                sx={{
                                    padding: '17px',
                                    fontWeight: 600,
                                }}
                            />
                        </Tabs>
                        <MoreHorizIcon
                            sx={{
                                background: '#e4e6ea',
                                padding: '6px 15px',
                                borderRadius: '10px'
                            }}
                        ></MoreHorizIcon>
                    </Box>
                </Box>

                { value === 0 && <Posts />}
            </Box>
        </Box >
    );
}