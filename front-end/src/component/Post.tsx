import { Backdrop, Box, Button, CircularProgress, Dialog, Grid, LinearProgress, Menu, MenuItem, TextareaAutosize } from "@mui/material";
import AvatarSmall from "./Profile/avatar";
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentFalse from '@mui/icons-material/ChatBubbleOutline';
import ShareFalse from '@mui/icons-material/IosShare';
import LikeFalse from '@mui/icons-material/ThumbUpOffAlt';
import { BoxStatusStyle, BoxStyle } from "../StyleComponent/Profile";
import { Postmanager } from "../schema/post";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../schema/user";
import { deletePostmanagers, getNewFeeds, updatePostmanagers } from "../API/postmanager/postmanager.api";
import { format } from "date-fns";
import { getUserCommnet } from "../API/user/user.api";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';


import Haha from "../Images/post/haha.png";
import Love from "../Images/post/love.png";
import Sad from "../Images/post/sad.png";
import Wow from "../Images/post/wow.png";
import Like from "../Images/post/like.png";
import { StyleImgIcon, StyleImgIcon2, StyleImgIcon3 } from "../StyleComponent/Post";
import { DialogHomeActions } from "../store/DialogHome";
import { alertActions } from "../store/alert";

export default function Post() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [users, setUsers] = useState<User | null>(null);
    const [posts, setPosts] = useState<Array<Postmanager> | null>(null)
    const [commentContents, setCommentContents] = useState<{ [key: string]: string }>({});
    const search = useSelector((state: any) => (state.dataHome.search));
    const [page, setPage] = useState(0)
    const [show, setShow] = useState(20)

    const handleComment = async (post: Postmanager) => {
        const content = commentContents[post._id] || '';
        setCommentContents(prevState => ({
            ...prevState,
            [post._id]: '',
        }));
        const currentTime = new Date();
        const formattedTime = format(currentTime, 'dd/MM/yyyy HH:mm.SSS');
        post.actions.comments.push({
            username: user._id,
            content: content,
            time: formattedTime,
        })
        await updatePostmanagers(post._id, post)
        const newfeed = await getNewFeeds(page === 0 ? 1 : page, show, search)
        setPosts(newfeed.data)
    };

    const handleLike = async (status: string, post: Postmanager) => {
        const selectedAction = status as keyof typeof post.actions.likes;
        const userLikes: { like: string[]; love: string[]; haha: string[]; sad: string[]; wow: string[]; } = { ...post.actions.likes };
        const actions: Array<keyof typeof userLikes> = ['like', 'love', 'haha', 'sad', 'wow'];
        let check = true;
        actions.forEach((action) => {
            if (userLikes[action].includes(user._id)) {
                userLikes[action] = userLikes[action].filter((item) => item !== user._id);
                if (selectedAction === action) {
                    check = false;
                }
            }
        });
        if (check) {
            userLikes[selectedAction].push(user._id);
        }

        await updatePostmanagers(post._id, { ...post, actions: { ...post.actions, likes: userLikes } });
        const newfeed = await getNewFeeds(page === 0 ? 1 : page, show, search)
        setPosts(newfeed.data)
    }

    const [isBoxVisible, setIsBoxVisible] = useState(false);

    const handleBoxStatusHover = () => {
        setIsBoxVisible(true);
    };

    const handleBoxStatusLeave = () => {
        setIsBoxVisible(false);
    };

    const updateCommentContent = (postId: string, newContent: string) => {
        setCommentContents(prevState => ({
            ...prevState,
            [postId]: newContent,
        }));
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'tr';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    const handleTime = (time: string) => {
        const moment = require('moment');
        const currentTime = moment();
        const targetTime = moment(time, 'DD/MM/YYYY HH:mm.SSS');
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
        setUsers(user);
        const fetchData = async () => {
            const post = await getNewFeeds(page === 0 ? 1 : page, show, search);
            setPosts(post.data);
        };
        fetchData();
    }, [user]);

    const [commentUser, setCommentUser] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        if (posts && posts.length > 0) {
            posts.map((post) => {
                post.actions.comments.map((comment) => {
                    const fetch = async () => {
                        const user = await getUserCommnet(comment.username);
                        setCommentUser(prevState => ({
                            ...prevState,
                            [user.id]: {
                                id: user.id,
                                fullname: user.fullname,
                                username: user.username,
                                avatar: user.avatar,
                            }
                        }));
                    }
                    fetch();
                })
            })
        }
    }, [posts])

    const [authorUser, setAuthortUser] = useState<{ [key: string]: any }>({});
    useEffect(() => {
        if (posts && posts.length > 0) {
            posts.map((post) => {
                const fetch = async () => {
                    const authorUser = await getUserCommnet(post.author);
                    setAuthortUser(prevState => ({
                        ...prevState,
                        [authorUser.id]: {
                            id: authorUser.id,
                            fullname: authorUser.fullname,
                            username: authorUser.username,
                            avatar: authorUser.avatar,
                        }
                    }));
                }
                fetch();
            })
        }
    }, [posts])

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMore = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMore = () => {
        setAnchorEl(null);
    };
    const handleDelete = async (PostmanagerId: any) => {
        try {
            const response = await deletePostmanagers(PostmanagerId);
            const fetchData = async () => {
                const dataListPostMangers = await getNewFeeds(page === 0 ? 1 : page, show, search)
                setPosts(dataListPostMangers.data);
            };
            fetchData();
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };
    return (
        <>
            {
                users && posts ? (<Box
                    sx={{
                        gap: '20px',
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {
                        posts && posts.map((post, index) => (
                            <BoxStyle key={index}
                                sx={{
                                    gap: '10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '40px',
                                                height: '40px',
                                            }}
                                        >
                                            <AvatarSmall value={authorUser[post.author] ? authorUser[post.author].avatar : ''} size={40} />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '3px'
                                            }}
                                        >
                                            <h4>{authorUser[post.author] ? authorUser[post.author].fullname || authorUser[post.author].username : ''}</h4>
                                            <p
                                                style={{
                                                    color: 'grey',
                                                    fontSize: '13px'
                                                }}
                                            >{handleTime(post.releaseDate)}</p>
                                        </Box>
                                    </Box>

                                    <div>
                                        <Button
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <MoreHorizIcon></MoreHorizIcon>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={openMore}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={() => {
                                                handleCloseMore()
                                                dispatch(DialogHomeActions.showDialog({
                                                    page: 'Postmanager',
                                                    mode: 'Update',
                                                    data: post,
                                                }));
                                            }}>Edit</MenuItem>
                                            <MenuItem onClick={() => {
                                                handleCloseMore();
                                                handleDelete(post._id);
                                                dispatch(alertActions.showAlert());
                                                dispatch(alertActions.setContentAlert(`Bạn đã xoá Post thành công!`));
                                                dispatch(alertActions.setColorGreen());
                                            }}
                                            >Delete</MenuItem>
                                            <MenuItem onClick={handleCloseMore}>Details</MenuItem>
                                        </Menu>
                                    </div>

                                </Box>

                                <Box>
                                    <p>{post.description}</p>
                                </Box>

                                <Box
                                    sx={{
                                        width: 'calc(100% + 36px)',
                                        marginLeft: '-18px',
                                        position: 'relative',
                                    }}
                                >
                                    <img src={post.imgTitle}
                                        onClick={handleOpen}
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        maxWidth={"lg"}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        sx={{
                                            width: '100vw',
                                            height: '100vh'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100vw',
                                                height: '100vh',
                                                position: 'relative'
                                            }}
                                        >
                                            <img src={post.imgTitle}
                                                style={{
                                                    height: '80%',
                                                    position: 'absolute',
                                                    bottom: '0'
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    zIndex: 1
                                                }}
                                            >
                                                <ZoomOutIcon />
                                                <ZoomInIcon />
                                            </Box>
                                        </Box>
                                    </Dialog>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        color: '#65676b'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: '5px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {post.actions?.likes.like.length !== 0 && <StyleImgIcon3 src={Like} />}
                                        {post.actions?.likes.love.length !== 0 && <StyleImgIcon3 src={Love} />}
                                        {post.actions?.likes.haha.length !== 0 && <StyleImgIcon3 src={Haha} />}
                                        {post.actions?.likes.wow.length !== 0 && <StyleImgIcon3 src={Wow} />}
                                        {post.actions?.likes.sad.length !== 0 && <StyleImgIcon3 src={Sad} />}

                                        <p>{formatNumber((post.actions?.likes.like.length || 0) + (post.actions?.likes.love.length || 0) + (post.actions?.likes.haha.length || 0) + (post.actions?.likes.wow.length || 0) + (post.actions?.likes.sad.length || 0))}</p>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: '5px'
                                        }}
                                    >
                                        <p>{`${post.actions.comments.length} comment`}</p>
                                        <p>{`${post.actions.shares.length} share`}</p>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        width: '100%',
                                        borderTop: '1px solid #c5c5c5',
                                        borderBottom: '1px solid #c5c5c5',
                                        padding: '4px 0'
                                    }}
                                >
                                    <Grid container>
                                        <Grid item xs={4}
                                            sx={{
                                                position: 'relative'
                                            }}
                                            onMouseEnter={handleBoxStatusHover}
                                            onMouseLeave={handleBoxStatusLeave}
                                        >
                                            <BoxStatusStyle
                                                sx={{
                                                    color: '#58d43b',
                                                }}
                                                onClick={() => {
                                                    const userLikes: { like: string[]; love: string[]; haha: string[]; sad: string[]; wow: string[]; } = { ...post.actions.likes };
                                                    const actions: Array<keyof typeof userLikes> = ['like', 'love', 'haha', 'sad', 'wow'];
                                                    let check = true;
                                                    actions.forEach((action) => {
                                                        if (userLikes[action].includes(user._id)) {
                                                            check = false
                                                            handleLike(action, post);
                                                        }
                                                    });
                                                    if (check) {
                                                        handleLike('like', post);
                                                    }
                                                }}
                                            >
                                                {post.actions?.likes.like.includes(users._id) ? (
                                                    <><StyleImgIcon2 src={Like} />
                                                        <p>Like</p></>
                                                ) : (
                                                    post.actions?.likes.love.includes(users._id) ? (
                                                        <><StyleImgIcon2 src={Love} />
                                                            <p>Love</p></>
                                                    ) : (
                                                        post.actions?.likes.haha.includes(users._id) ? (
                                                            <><StyleImgIcon2 src={Haha} />
                                                                <p>Haha</p></>
                                                        ) : (
                                                            post.actions?.likes.wow?.includes(users._id) ? (
                                                                <><StyleImgIcon2 src={Wow} />
                                                                    <p>Wow</p></>
                                                            ) : (
                                                                post.actions?.likes.sad.includes(users._id) ? (
                                                                    <><StyleImgIcon2 src={Sad} />
                                                                        <p>Sad</p></>
                                                                ) : (
                                                                    <>
                                                                        <LikeFalse />
                                                                        <p style={{ color: 'black' }}>Like</p>
                                                                    </>
                                                                )
                                                            )
                                                        )
                                                    )
                                                )}
                                            </BoxStatusStyle>
                                            <Box
                                                sx={{
                                                    height: '50px',
                                                    background: 'white',
                                                    borderRadius: '30px',
                                                    boxShadow: 'grey 0 0 10px 2px',
                                                    position: 'absolute',
                                                    top: '-100%',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    display: isBoxVisible ? 'flex' : 'none',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    padding: '2px 10px',
                                                }}
                                                onClick={handleBoxStatusLeave}
                                            >
                                                <StyleImgIcon src={Like} onClick={() => { handleLike('like', post) }} />
                                                <StyleImgIcon src={Love} onClick={() => { handleLike('love', post) }} />
                                                <StyleImgIcon src={Haha} onClick={() => { handleLike('haha', post) }} />
                                                <StyleImgIcon src={Wow} onClick={() => { handleLike('wow', post) }} />
                                                <StyleImgIcon src={Sad} onClick={() => { handleLike('sad', post) }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <BoxStatusStyle>
                                                <CommentFalse />
                                                <p>Comment</p>
                                            </BoxStatusStyle>

                                        </Grid>
                                        <Grid item xs={4}>
                                            <BoxStatusStyle>
                                                <ShareFalse />
                                                <p>Share</p>
                                            </BoxStatusStyle>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        height: '40px',
                                    }}
                                >
                                    <AvatarSmall value={users.avatar} size={40} />
                                    <Box
                                        sx={{
                                            width: 'calc(100% - 55px)',
                                            background: '#f0f2f5',
                                            borderRadius: '20px',
                                            padding: '8px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <TextareaAutosize
                                            placeholder="Write a comment..."
                                            style={{
                                                color: '#606266',
                                                background: 'transparent',
                                                width: 'calc(95% - 16px)',
                                                height: '100%',
                                                border: '0',
                                                fontSize: '15px',
                                                resize: 'none',
                                            }}
                                            onChange={(event) => updateCommentContent(post._id, event.target.value)}
                                        />
                                        <SendIcon
                                            sx={{
                                                width: '5%',
                                            }}
                                            onClick={() => handleComment(post)}
                                        />
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px'
                                    }}
                                >
                                    {
                                        commentUser && post.actions.comments?.map((comment, index) => (
                                            <Box key={index}
                                                sx={{
                                                    display: 'flex',
                                                    gap: '15px'
                                                }}
                                            >
                                                <Box>
                                                    <AvatarSmall value={commentUser[comment.username] && commentUser[comment.username].avatar} size={40} />
                                                </Box>
                                                <Box>
                                                    <Box
                                                        sx={{
                                                            borderRadius: '10px',
                                                            background: '#f0f2f5',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '5px',
                                                            padding: '6px',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        <h4
                                                            onClick={() => {
                                                                window.location.href = `/Profile?id=${commentUser[comment.username].id}`;
                                                            }}
                                                        >{commentUser[comment.username] && (commentUser[comment.username].fullname || commentUser[comment.username].username)}</h4>
                                                        <p>{comment.content}</p>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            gap: '8px',
                                                            padding: '6px',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <h5
                                                            style={{
                                                                fontSize: '13px',
                                                                color: '#5d5d5d',
                                                            }}
                                                        >Like</h5>
                                                        <h5
                                                            style={{
                                                                fontSize: '13px',
                                                                color: '#5d5d5d',
                                                            }}
                                                        >Reply</h5>
                                                        <p
                                                            style={{
                                                                fontSize: '11px',
                                                                color: '#565252ad',
                                                            }}
                                                        >{handleTime(comment.time)}</p>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>

                            </BoxStyle>
                        ))
                    }
                </Box>) : (<LinearProgress
                    sx={{
                        width: '100%'
                    }}
                />)
            }

        </>

    );
}