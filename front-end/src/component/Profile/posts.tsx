import { Box, Button, Grid, ImageList, ImageListItem, LinearProgress } from "@mui/material";
import { AvatarStyle, BoxStatusStyle, BoxStyle } from "../../StyleComponent/Profile";
import { useEffect, useState } from "react";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Live from '@mui/icons-material/House';
import Work from '@mui/icons-material/Work';
import Education from '@mui/icons-material/School';
import Countryside from '@mui/icons-material/LocationOn';
import Relationship from '@mui/icons-material/FiberSmartRecord';
import Join from '@mui/icons-material/JoinInner';
import Category from '@mui/icons-material/Category';
import Datebird from '@mui/icons-material/CalendarMonth';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LikeTrue from '@mui/icons-material/ThumbUp';
import CommentFalse from '@mui/icons-material/ChatBubbleOutline';
import ShareFalse from '@mui/icons-material/IosShare';
import LikeFalse from '@mui/icons-material/ThumbUpOffAlt';
import LoveTrue from '@mui/icons-material/Favorite';
import LoveFalse from '@mui/icons-material/FavoriteBorder';
import HahaTrue from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserCommnet, updateUsers } from "../../API/user/user.api";
import { userActions } from "../../store/user";
import { alertActions } from "../../store/alert";
import AvatarSmall from "./avatar";
import { format } from 'date-fns';
import { getPostSelf, getPostmanagers, updatePostmanagers } from "../../API/postmanager/postmanager.api";
import { Information, User } from "../../schema/user";
import { Postmanager } from "../../schema/post";
import { DialogHomeActions } from "../../store/DialogHome";

export default function Posts() {

    const dispatch = useDispatch();
    const [posts, setPosts] = useState<Array<Postmanager> | null>(null)
    const user = useSelector((state: any) => state.user.user);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id') || user._id;
    const [users, setUsers] = useState<User | null>(null);
    const [inpBio, setInpBio] = useState('');
    const [inpInfomation, setInpInfomation] = useState<Information | null>(null);

    const [modeBio, setModeBio] = useState(false)

    function formatNumber(num: number) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'tr';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    function handleTime(time: string) {
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

    const handleLike = async (status: string, post: Postmanager) => {
        switch (status) {
            case 'like':
                if (post.actions?.likes.like.includes(user._id)) {
                    const valueToRemove = user._id;
                    const newArray = post.actions.likes.like.filter(item => item !== valueToRemove);
                    post.actions.likes.like = newArray;
                    console.log(post);
                }
                else {
                    post.actions.likes.like.push(user._id);
                    console.log(post);
                }
                await updatePostmanagers(post._id, post)
                setPosts(await getPostSelf(id))
        }
    }

    const handleCreatePost = () => {
        dispatch(DialogHomeActions.showDialog({
            page: 'Postmanager',
            mode: 'Create',
            data: '',
        }))
    }

    const [commentContents, setCommentContents] = useState<{ [key: string]: string }>({});

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
        setPosts(await getPostSelf(id))
    };

    const updateCommentContent = (postId: string, newContent: string) => {
        setCommentContents(prevState => ({
            ...prevState,
            [postId]: newContent,
        }));
    };

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

    useEffect(() => {
        setUsers(user);
        const fetchData = async () => {
            const post = await getPostSelf(id);
            setPosts(post);
        };
        fetchData();
        setInpBio(user?.bio || '');
        setInpInfomation(user?.information || null);
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

    return (
        <>
            {users && posts ? (
                <Box
                    sx={{
                        width: '70vw',
                        margin: '0 15vw',
                        display: 'flex',
                    }}
                >
                    <Box
                        sx={{
                            width: '40%',
                            margin: '20px',
                            gap: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'sticky',
                            top: 0,
                        }}
                    >
                        <BoxStyle
                            sx={{
                                gap: '15px',
                                justifyContent: 'space-between'
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: '23px',
                                    margin: '0'
                                }}
                            >Introduce</h3>
                            {inpBio !== '' && !modeBio ? (
                                <p
                                    style={{
                                        color: '#6f746e',
                                        textAlign: 'center',
                                        fontSize: '15px'
                                    }}
                                >{user.bio}</p>
                            ) : null}
                            {user._id === users._id ? (
                                !modeBio ? (
                                    <Button
                                        sx={{
                                            background: '#e4e6ea',
                                            color: 'black',
                                            fontWeight: '550',
                                        }}
                                        onClick={() => {
                                            setModeBio(!modeBio);
                                        }}
                                    >
                                        {inpBio === '' ? 'Add bio' : 'Change bio'}
                                    </Button>
                                ) : (
                                    <Box>
                                        <TextareaAutosize
                                            placeholder="description of the version"
                                            style={{
                                                width: '94%',
                                                border: '1px solid #ccd0d4',
                                                height: '70px',
                                                borderRadius: '10px',
                                                padding: '3%',
                                                resize: 'none',
                                                background: '#e4e6e9',
                                                fontSize: '16px',
                                            }}
                                            value={inpBio}
                                            onChange={(e) => {
                                                setInpBio(e.target.value);
                                            }}
                                        ></TextareaAutosize>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'end',
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    setModeBio(!modeBio);
                                                    setInpBio(users.bio);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={inpBio === users.bio}
                                                onClick={async () => {
                                                    let Updateuser = { ...users };
                                                    Updateuser.bio = inpBio;
                                                    try {
                                                        await updateUsers(users._id, Updateuser);
                                                        const user = await getUser(id);
                                                        dispatch(userActions.setUser(user));
                                                        dispatch(alertActions.setColorGreen());
                                                        dispatch(alertActions.setContentAlert(`Cập nhật thông tin thành công!`));
                                                        dispatch(alertActions.showAlert());
                                                    } catch (error) {
                                                        dispatch(alertActions.setColorWrong());
                                                        dispatch(alertActions.setContentAlert(`Cập nhật thông tin không thành công!`));
                                                        dispatch(alertActions.showAlert());
                                                    }
                                                    setModeBio(!modeBio);
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </Box>
                                    </Box>
                                )
                            ) : null}

                            {inpInfomation?.Category && <Box sx={{ display: 'flex', alignItems: 'center' }}> <Category sx={{ color: '#8a939e', marginRight: '10px' }} /><p style={{ fontSize: '15px' }}>{inpInfomation?.Category}</p></Box>}
                            {inpInfomation?.Work && <Box sx={{ display: 'flex', alignItems: 'center' }}> <Work sx={{ color: '#8a939e', marginRight: '10px' }} /><p style={{ fontSize: '15px' }}>{inpInfomation?.Work}</p></Box>}
                            {inpInfomation?.Education && <Box sx={{ display: 'flex', alignItems: 'center' }}> <Education sx={{ color: '#8a939e', marginRight: '10px' }} /><p style={{ fontSize: '15px' }}>{inpInfomation?.Education}</p></Box>}
                            {inpInfomation?.Live && <Box sx={{ display: 'flex', alignItems: 'center' }}> <Live sx={{ color: '#8a939e', marginRight: '10px' }} /><p style={{ fontSize: '15px' }}>{inpInfomation?.Live}</p></Box>}
                            {inpInfomation?.Countryside && <Box sx={{ display: 'flex', alignItems: 'center' }}> <Countryside sx={{ color: '#8a939e', marginRight: '10px' }} /><p style={{ fontSize: '15px' }}>{inpInfomation?.Countryside}</p></Box>}
                            {inpInfomation?.Relationship && <Box sx={{ display: 'flex', alignItems: 'center' }}> <Relationship sx={{ color: '#8a939e', marginRight: '10px' }} /><p style={{ fontSize: '15px' }}>{inpInfomation?.Relationship}</p></Box>}
                            {inpInfomation?.Join && <Box sx={{ display: 'flex', alignItems: 'center' }}> <Join sx={{ color: '#8a939e', marginRight: '10px' }} /><p style={{ fontSize: '15px' }}>{inpInfomation?.Join}</p></Box>}
                            {inpInfomation?.Datebird && <Box sx={{ display: 'flex', alignItems: 'center' }}> <Datebird sx={{ color: '#8a939e', marginRight: '10px' }} /><p style={{ fontSize: '15px' }}>{inpInfomation?.Datebird}</p></Box>}

                            <Button
                                sx={{
                                    background: '#e4e6ea',
                                    color: 'black',
                                    fontWeight: '550',
                                }}
                            >Detailed editing</Button>
                            <Button
                                sx={{
                                    background: '#e4e6ea',
                                    color: 'black',
                                    fontWeight: '550',
                                }}
                            >More hobbies</Button>

                            <Button
                                sx={{
                                    background: '#e4e6ea',
                                    color: 'black',
                                    fontWeight: '550',
                                }}
                            >Edit Notables</Button>
                        </BoxStyle>

                        <BoxStyle
                            sx={{
                                gap: '15px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'end'
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '23px',
                                        margin: '0'
                                    }}
                                >Picture</h3>
                                <p
                                    style={{
                                        color: '#366bd1'
                                    }}
                                >See all photos</p>
                            </Box>
                            <ImageList sx={{ width: '100%' }} cols={3} rowHeight={150}>
                                {posts.map((item, index) => (
                                    <ImageListItem key={index}>
                                        <img
                                            src={`${item.imgTitle}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.imgTitle}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            loading="lazy"
                                            style={{
                                                borderTopLeftRadius: index === 0 ? '20px' : '0px',
                                                borderTopRightRadius: index === 2 ? '20px' : '0px',
                                                borderBottomRightRadius: (index === posts.length - 1 && posts.length % 3 === 0) ? '20px' : '0px',
                                                borderBottomLeftRadius: index === (Math.ceil(posts.length / 3) - 1) * 3 ? '20px' : '0px',
                                            }}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </BoxStyle>
                    </Box>

                    <Box
                        sx={{
                            width: '58%',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '25px',
                        }}
                    >
                        <BoxStyle
                            sx={{
                                gap: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    height: '40px',
                                }}>
                                <AvatarSmall value={users.avatar} size={40} />
                                <Button
                                    sx={{
                                        background: '#f0f2f5',
                                        color: '#606266',
                                        borderRadius: '20px',
                                        width: '90%',
                                        height: '100%'
                                    }}
                                    onClick={handleCreatePost}
                                >What are you thinking?</Button>
                            </Box>

                            <hr
                                style={{
                                    height: '1px',
                                    width: '100%',
                                    border: 0,
                                    background: '#8080804d',
                                }}
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    ':hover': {
                                        background: '#babbc43d',
                                        borderRadius: '20px',
                                    },
                                    justifyContent: 'center',
                                    padding: '8px 0'
                                }}
                                onClick={handleCreatePost}
                            >
                                <PhotoLibraryIcon
                                    sx={{
                                        color: '#44be62',
                                        fontSize: '30px'
                                    }}
                                ></PhotoLibraryIcon>
                                <p
                                    style={{
                                        color: '#606266',
                                        fontWeight: '500',
                                        margin: '0'
                                    }}
                                >Picture/Video</p>
                            </Box>
                        </BoxStyle>

                        <Box
                            sx={{
                                gap: '20px',
                                width: '100%',
                                height: '100%',
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
                                            <MoreHorizIcon></MoreHorizIcon>
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
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
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
                                                {post.actions?.likes.like.length !== 0 && <LikeTrue sx={{ color: '#58d43b' }} />}
                                                {post.actions?.likes.love.length !== 0 && <LoveTrue sx={{ color: '#e82323ad' }} />}
                                                {post.actions?.likes.haha.length !== 0 && <HahaTrue sx={{ color: 'yellow' }} />}
                                                <p>{formatNumber((post.actions?.likes.like.length || 0) + (post.actions?.likes.love.length || 0) + (post.actions?.likes.haha.length || 0))}</p>
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
                                                <Grid item xs={4}>
                                                    <BoxStatusStyle onClick={() => {
                                                        handleLike('like', post)
                                                    }}
                                                    >
                                                        {post.actions?.likes.like.includes(users._id) ? (
                                                            <LikeTrue
                                                                sx={{
                                                                    color: '#58d43b'
                                                                }}
                                                            />
                                                        ) : (
                                                            <LikeFalse />
                                                        )}
                                                        <p
                                                            style={{
                                                                color: post.actions?.likes.like.includes(users._id) ? '#58d43b' : ''
                                                            }}
                                                        >Like</p>
                                                    </BoxStatusStyle>
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
                                                                <h4>{commentUser[comment.username] && (commentUser[comment.username].fullname || commentUser[comment.username].username)}</h4>
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
                        </Box>
                    </Box>
                </Box >
            ) : (
                <LinearProgress
                    sx={{
                        width: '100%'
                    }}
                />
            )}
        </>

    );
}