import { Box, Grid, LinearProgress, TextareaAutosize } from "@mui/material";
import AvatarSmall from "./Profile/avatar";
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LikeTrue from '@mui/icons-material/ThumbUp';
import CommentFalse from '@mui/icons-material/ChatBubbleOutline';
import ShareFalse from '@mui/icons-material/IosShare';
import LikeFalse from '@mui/icons-material/ThumbUpOffAlt';
import LoveTrue from '@mui/icons-material/Favorite';
import LoveFalse from '@mui/icons-material/FavoriteBorder';
import HahaTrue from '@mui/icons-material/EmojiEmotions'
import { BoxStatusStyle, BoxStyle } from "../StyleComponent/Profile";
import { Postmanager } from "../schema/post";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../schema/user";
import { getNewFeeds, updatePostmanagers } from "../API/postmanager/postmanager.api";
import { format } from "date-fns";
import { getUserCommnet } from "../API/user/user.api";

export default function Post() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [users, setUsers] = useState<User | null>(null);
    const [posts, setPosts] = useState<Array<Postmanager> | null>(null)
    const [commentContents, setCommentContents] = useState<{ [key: string]: string }>({});
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
        const newfeed = await getNewFeeds(page === 0 ? 1 : page, show)
        setPosts(newfeed.data)
    };

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
                }
                await updatePostmanagers(post._id, post)
                const newfeed = await getNewFeeds(page === 0 ? 1 : page, show)
                setPosts(newfeed.data)
        }
    }

    const updateCommentContent = (postId: string, newContent: string) => {
        setCommentContents(prevState => ({
            ...prevState,
            [postId]: newContent,
        }));
    };

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

    useEffect(() => {
        setUsers(user);
        const fetchData = async () => {
            const post = await getNewFeeds(page === 0 ? 1 : page, show);
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
    
    
    return (
        <>
            {
                users && posts ? (<Box
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
                </Box>) : (<LinearProgress
                    sx={{
                        width: '100%'
                    }}
                />)
            }

        </>

    );
}