import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Button, Grid, InputBase, LinearProgress, Menu, MenuItem, TextareaAutosize, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import '../styleCSS/message.css'
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { alertActions } from "../store/alert";
import { useDispatch, useSelector } from "react-redux";
import { createMessageAI, deleteMessageAI, getMessageAI } from "../API/messageAI/messageai.api";
import { Message } from "../schema/messageAI";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getUserCommnet } from "../API/user/user.api";
import AvatarSmall from "../component/Profile/avatar";
import { decodedAT } from "../API/decodedAccessToken/decodedAccessToken.api";
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Logout from "@mui/icons-material/Logout";
import socketIOClient, { Socket, io } from 'socket.io-client';
import { DataHomeActions } from "../store/DataHome";
import Overview from '../Images/home/main/Overview.svg';
import newFeed from '../Images/home/main/newFeed.png';
import Manager from '../Images/home/main/Manager.png';
import Location from '../Images/home/main/Location.svg';
import PostManager from '../Images/home/main/PostManager.svg';
import IconDonation from '../Images/home/overview/IconDonation.svg';
import Reward from '../Images/home/main/Reward.svg';
import { StyleTitleHeader } from "../StyleComponent/Home";

const Cookies = require('js-cookie');

const drawerWidth = 240;

const socket = io('http://localhost:8000');



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export function MessageAI() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const user = useSelector((state: any) => state.user.user)
    const keyNavLeft = useSelector((state: any) => state.dataHome.page);
    const [open, setOpen] = useState(false);
    const [inpMess, setInpMess] = useState("");
    const [conversations, setConversations] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true)
    const [chat, setChat] = useState<Message[]>([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [authorUser, setAuthortUser] = useState<{ [key: string]: any }>({});
    const [showProfile, setShowProfile] = useState(-1)
    const [mouseNavleft, setMouseNavleft] = useState("")

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



    const copyToClipboard = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content);
            dispatch(alertActions.showAlert());
            dispatch(alertActions.setContentAlert("Bạn đã copy nội dung thành công!"));
            dispatch(alertActions.setColorGreen());
        } catch (error) {
            console.error('Sao chép thất bại: ', error);
        }
    };
    const openn = Boolean(anchorEl);
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
    const handleSend = (e: any, content: string) => {
        e.preventDefault();
        socket.emit('chat', conversations);
        if (!authorUser[user._id]) {
            setAuthortUser(prevState => ({
                ...prevState,
                [user._id]: {
                    id: user._id,
                    fullname: user.fullname,
                    username: user.username,
                    avatar: user.avatar,
                }
            }));
        }
        setInpMess("");
        const createMessage = async (content: string) => {
            await createMessageAI({ author: user._id, content: content })
            if (content.length > 0) {
                const newConversations = [...conversations, { author: user._id, content: content }];
                setConversations(newConversations);
            }
        }
        createMessage(content);
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id: string) => {
        await deleteMessageAI(id);
        socket.emit('chat', conversations);
        dispatch(alertActions.showAlert());
        dispatch(alertActions.setContentAlert("Bạn đã xoá tin nhắn thành công"));
        dispatch(alertActions.setColorGreen());
        socket.on('chat', (conversations) => {
            setChat(conversations);
        });
        const fetchMessages = async () => {
            try {
                const response = await getMessageAI();
                const uniqueAuthors = new Set();

                response.data.forEach((item: any) => {
                    uniqueAuthors.add(item.author);
                });
                const uniqueAuthorArray = Array.from(uniqueAuthors);
                uniqueAuthorArray.map((uni) => {
                    const fetch = async (uni: any) => {
                        if (uni) {
                            const Uni_User = await getUserCommnet(uni);
                            setAuthortUser(prevState => ({
                                ...prevState,
                                [Uni_User.id]: Uni_User,
                            }));
                        }
                    }
                    fetch(uni);
                })
                setConversations(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }

    const handleTime = (time: string) => {
        const moment = require('moment');
        const currentTime = moment();
        const targetTime = moment(time, 'YYYY/MM/DD HH:mm.SSS');
        console.log(targetTime);

        const duration = moment.duration(currentTime.diff(targetTime));

        if (duration.asYears() >= 1) {
            return (`${Math.floor(duration.asYears())} years`);
        } else if (duration.asMonths() >= 1) {
            return (`${Math.floor(duration.asMonths())} months`);
        } else if (duration.asWeeks() >= 1) {
            return (`${Math.floor(duration.asWeeks())} weeks`);
        } else if (duration.asDays() >= 1) {
            return (`${Math.floor(duration.asDays())} days`);
        } else if (duration.asHours() >= 1) {
            return (`${Math.floor(duration.asHours())} hours`);
        } else if (duration.asMinutes() >= 1) {
            return (`${Math.floor(duration.asMinutes())} minutes`);
        } else {
            return ('Now');
        }
    }

    useEffect(() => {
        if (user.fullname === undefined) {
            setLoading(true);
        }
        else {
            setLoading(false);
        }
    }, [user])

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
            }
            decoded();
        }
    }, [Cookies.get('jwt')])

    useEffect(() => {
        socket.on('chat', (conversations) => {
            setChat(conversations);
        });
        const fetchMessages = async () => {
            try {
                const response = await getMessageAI();
                const uniqueAuthors = new Set();

                response.data.forEach((item: any) => {
                    uniqueAuthors.add(item.author);
                });
                const uniqueAuthorArray = Array.from(uniqueAuthors);
                uniqueAuthorArray.map((uni) => {
                    const fetch = async (uni: any) => {
                        if (uni) {
                            const Uni_User = await getUserCommnet(uni);
                            setAuthortUser(prevState => ({
                                ...prevState,
                                [Uni_User.id]: Uni_User,
                            }));
                        }
                    }
                    fetch(uni);
                })
                setConversations(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [chat]);

    useEffect(() => {
        if (user.username) {
            let extraNavLeft = [...navLefts];
            if (user.orgId.Location && !extraNavLeft.some(navItem => navItem.content === 'Location')) {
                extraNavLeft.push({
                    icon: Location,
                    content: "Location",
                })
            }
            if (user.orgId.Postmanager && !extraNavLeft.some(navItem => navItem.content === 'Postmanager')) {
                extraNavLeft.push({
                    icon: PostManager,
                    content: "Postmanager",
                })
            }
            if (user.orgId.Paymentrecord && !extraNavLeft.some(navItem => navItem.content === 'Paymentrecord')) {
                extraNavLeft.push({
                    icon: IconDonation,
                    content: "Paymentrecord",
                })
            }
            if (user.orgId.Reward && !extraNavLeft.some(navItem => navItem.content === 'Reward')) {
                extraNavLeft.push({
                    icon: Reward,
                    content: "Reward",
                })
            }
            if (user.isAdmin && !extraNavLeft.some(navItem => navItem.content === 'Manager')) {
                extraNavLeft.push({
                    icon: Manager,
                    content: "Manager",
                })
            }
            setNavLefts(extraNavLeft)
        }
    }, [user])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" noWrap component="div">
                            Food Donation Community
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
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
                                        <AvatarSmall value={user.avatar} size={40} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={openn}
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
                                    window.location.href = `/Profile?id=${user._id}`;
                                    handleClose();
                                }}>
                                    <AvatarSmall value={user.avatar} size={40} /> {user.fullname}
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => {
                                    window.location.href = `/MessageAI`;
                                    handleClose();
                                }}>
                                    <ListItemIcon>
                                        <ChatBubbleOutlineIcon fontSize="small" />
                                    </ListItemIcon>
                                    Message
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
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    '.MuiPaper-elevation': {
                        background: 'transparent'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}
                        sx={{
                            color: 'white'
                        }}
                    >
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
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
            </Drawer>
            <Main open={open}
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    padding: '0'
                }}
            >
                <div className="bg"></div>

                <div className="star-field">
                    <div className="layer"></div>
                    <div className="layer"></div>
                    <div className="layer"></div>
                </div>
                <DrawerHeader />
                <Box
                    sx={{
                        width: '80%',
                        height: 'calc(100vh - 64px)',
                        boxShadow: '#aabdbc 0 0 15px 10px',
                        position: 'relative'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            height: '82%',
                            overflowY: 'auto',
                        }}
                    >
                        {
                            loading ? (
                                <LinearProgress />
                            ) : (
                                <Box
                                    className="chat-box"
                                    sx={{
                                        minHeight: '100vh',
                                        background: '#43434352',
                                    }}
                                >
                                    {
                                        conversations.map((conversation, index) => (
                                            <Box
                                                key={index}
                                                className={
                                                    conversation.author === user._id
                                                        ? 'your-message'
                                                        : 'other-person-message'
                                                }
                                                sx={{
                                                    display: 'flex',
                                                    padding: '20px',
                                                    gap: '20px',
                                                    borderBottom: '5px solid #e6e6e66e',
                                                    background: conversation.author === user._id ? '#ffffff99' : `rgb(${index * 10} ${index * 8} ${index * 6} / 45%)`,
                                                    color: conversation.author === user._id ? 'black' : 'rgb(255 255 255)',
                                                    position: 'relative'
                                                }}
                                            >
                                                <Avatar alt={authorUser[conversation.author] ? authorUser[conversation.author].avatar : ''} src={authorUser[conversation.author] ? authorUser[conversation.author].avatar : ''}
                                                    onMouseEnter={() => {
                                                        setShowProfile(index)
                                                    }}
                                                    onMouseLeave={() => {
                                                        setShowProfile(-1)
                                                    }}
                                                    onClick={() => window.location.href = `/Profile?id=${authorUser[conversation.author].id}`}
                                                />
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        background: 'white',
                                                        display: showProfile === index ? 'flex' : 'none',
                                                        flexDirection: 'column',
                                                        zIndex: '1',
                                                        top: '0',
                                                        left: '0',
                                                        padding: '20px',
                                                        borderRadius: '10px',
                                                        alignItems: 'center',
                                                        color: 'black',
                                                        width: 'auto',
                                                        gap: '10px'
                                                    }}
                                                    onMouseEnter={() => {
                                                        setShowProfile(index)
                                                    }}
                                                    onMouseLeave={() => {
                                                        setShowProfile(-1)
                                                    }}
                                                >
                                                    <AvatarSmall value={authorUser[conversation.author] ? authorUser[conversation.author].avatar : ''} size={100} />
                                                    <p
                                                        style={{
                                                            fontSize: "19px",
                                                            fontWeight: '500'
                                                        }}
                                                    >Fullname: <span
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: '300'
                                                        }}
                                                    >{authorUser[conversation.author] ? authorUser[conversation.author].fullname : ''}</span></p>
                                                    <p
                                                        style={{
                                                            fontSize: "19px",
                                                            fontWeight: '500'
                                                        }}
                                                    >Username: <span
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: '300'
                                                        }}
                                                    >{authorUser[conversation.author] ? authorUser[conversation.author].username : ''}</span></p>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: 'calc(100% - 200px)',
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '20px',
                                                            width: 'fit-content',
                                                        }}
                                                        onClick={() => window.location.href = `/Profile?id=${authorUser[conversation.author].id}`}
                                                    >
                                                        {authorUser[conversation.author] ? authorUser[conversation.author].fullname || authorUser[conversation.author].username : ''}
                                                    </p>
                                                    <p
                                                        style={{
                                                            fontSize: '18px',
                                                        }}
                                                    >
                                                        {conversation.content}
                                                    </p>
                                                </Box>
                                                <p>{handleTime(conversation.createdAt || "")}</p>
                                                {conversation.author !== user._id ? (
                                                    <ContentPasteIcon
                                                        sx={{
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => {
                                                            copyToClipboard(conversation.content);
                                                        }}
                                                    />
                                                ) : (
                                                    <DeleteOutlineIcon
                                                        sx={{
                                                            fontSize: '28px'
                                                        }}
                                                        onClick={() => handleDelete(conversation._id || "")}
                                                    />
                                                )
                                                }
                                            </Box>
                                        ))
                                    }
                                </Box>
                            )
                        }
                    </Box>
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: '0',
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px',
                            padding: '20px 0'
                        }}
                    >
                        <Box
                            sx={{
                                width: '80%',
                                fontSize: '18px',
                                padding: '20px',
                                borderRadius: '20px',
                                border: '1px solid #808080a1',
                                boxShadow: '#bdbdbd85 0 0 5px 2px',
                                background: '#fff',
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TextareaAutosize
                                minRows={1}
                                maxRows={5}
                                placeholder="Send a message..."
                                style={{
                                    resize: 'none',
                                    lineHeight: '25px',
                                    width: 'calc(100% - 50px)',
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                }}
                                value={inpMess}
                                onChange={(e) => {
                                    setInpMess(e.target.value)
                                }}
                                onKeyDown={async (e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSend(e, inpMess);
                                    }
                                }}
                            />
                            <SendIcon
                                sx={{
                                    color: inpMess.length > 0 ? '#5f8f98' : '#8080809c',
                                    fontSize: '26px',
                                    ':hover': {
                                        scale: '1.3'
                                    }
                                }}
                                onClick={(e) => handleSend(e, inpMess)}
                            />
                        </Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Use ChatAi for free. Copyright belongs to <u>Liorion</u>
                        </Typography>
                    </Box>
                </Box>
            </Main >
        </Box >
    );
}