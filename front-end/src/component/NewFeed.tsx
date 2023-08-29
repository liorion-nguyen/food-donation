import { Box, Button, Skeleton, Slide } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingActions } from "../store/loading";
import { StyleBoxMain, StylePExtra, StylePMain } from "../StyleComponent/Post";
import { TransitionProps } from "@mui/material/transitions";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Post from "./Post";
import { getNewFeeds } from "../API/postmanager/postmanager.api";
import { Link } from 'react-router-dom';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
interface Location {
    _id: string;
    address: string;
    imgAddress: string;
    location: string;
    description: string;
    addedDate: string;
    status: string;
}
export default function ElementNewFeed() {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => (state.loading.mode))
    const [listLocations, setListLocations] = useState<Location[]>([]);
    const [pagination, setPagination] = useState(20)
    const [page, setPage] = useState(0)
    const [show, setShow] = useState(20)

    const sentinelRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };

        const handleIntersect = (entries: any) => {
            if (entries[0].isIntersecting) {
                const fetchData = async () => {
                    dispatch(LoadingActions.showLoading());
                    setPage(prev => {
                        return prev + 1;
                    });
                };
                if (listLocations.length < pagination || listLocations.length === 0) {
                    fetchData()
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersect, options);

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [sentinelRef.current]);

    useEffect(() => {
        const fetch = async () => {
            if (page !== 0) {
                const dataListLocations = await getNewFeeds(page === 0 ? 1 : page, show)
                console.log(dataListLocations);

                if (dataListLocations !== "Error") {
                    setListLocations((prev) => {
                        const newData = dataListLocations.data;
                        return [...prev, ...newData];
                    });
                    setPagination(dataListLocations.count);
                    dispatch(LoadingActions.hideLoading());
                }
            }
        }
        if (listLocations.length < pagination || listLocations.length === 0) {
            fetch()
        }
    }, [page])

    const advertisements = [
        {
            img: "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            title: "Liorion",
            content: "Social networking site",
            link: "http://liorion0708.000webhostapp.com/NTPTW",
        },
        {
            img: "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            title: "Facebook",
            content: "Social networking site",
            link: "http://liorion0708.000webhostapp.com/NTPTW",
        },
        {
            img: "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            title: "Instagram",
            content: "Social networking site",
            link: "http://liorion0708.000webhostapp.com/NTPTW",
        },
        {
            img: "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            title: "Liorion",
            content: "Social networking site",
            link: "http://liorion0708.000webhostapp.com/NTPTW",
        },
        {
            img: "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            title: "Facebook",
            content: "Social networking site",
            link: "http://liorion0708.000webhostapp.com/NTPTW",
        },
        {
            img: "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            title: "Instagram",
            content: "Social networking site",
            link: "http://liorion0708.000webhostapp.com/NTPTW",
        },
    ]

    return (
        <Box
            id="Data"
            sx={{
                backgroundColor: '#f0f2f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px 0',
                height: '88vh',
                overflowY: 'scroll',
            }}
        >
            <Box
                sx={{
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        width: '65%'
                    }}
                >
                    <Post />
                    {
                        listLocations.length < pagination || listLocations.length === 0 ?
                            (
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    {
                                        Array.from({ length: 3 }).map((_, index) => (
                                            <Box key={index}
                                                sx={{
                                                    width: '80%',
                                                    backgroundColor: '#fff',
                                                    marginTop: '50px',
                                                    display: 'flex',
                                                    borderRadius: '10px',
                                                    padding: '30px',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '20%',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Skeleton animation="wave"
                                                        sx={{
                                                            width: '100%',
                                                            height: '120%'
                                                        }}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: '75%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <Skeleton animation="wave"
                                                            sx={{
                                                                width: '20%',
                                                                height: '20px'
                                                            }}
                                                        />
                                                    </Box>
                                                    <StyleBoxMain>
                                                        <Skeleton animation="wave"
                                                            sx={{
                                                                width: '50%',
                                                                height: '15px'
                                                            }}
                                                        />
                                                    </StyleBoxMain>
                                                    <StyleBoxMain>
                                                        <Skeleton animation="wave"
                                                            sx={{
                                                                width: '50%',
                                                                height: '30px'
                                                            }}
                                                        />
                                                    </StyleBoxMain>
                                                    <StyleBoxMain>
                                                        <Skeleton animation="wave"
                                                            sx={{
                                                                width: '50%',
                                                                height: '20px'
                                                            }}
                                                        />
                                                    </StyleBoxMain>
                                                    <StyleBoxMain >
                                                        <Skeleton animation="wave"
                                                            sx={{
                                                                width: '50%',
                                                                height: '20px'
                                                            }}
                                                        />
                                                    </StyleBoxMain>
                                                    <Skeleton animation="wave"
                                                        sx={{
                                                            width: '100%',
                                                            height: '30px'
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: '20px',
                                    }}
                                >
                                    <TaskAltIcon
                                        sx={{
                                            fontSize: '99px',
                                            color: '#f1ab3d'
                                        }}
                                    ></TaskAltIcon>
                                    <h3
                                        style={{
                                            lineHeight: 'var(--base-line-clamp-line-height)',
                                            fontWeight: 400,
                                            margin: '0',
                                            fontSize: '25px'
                                        }}
                                    >You're all caught up</h3>
                                    <p
                                        style={{
                                            color: '#737373',
                                            fontSize: '16px'
                                        }}
                                    >You have seen all the latest posts.</p>
                                </Box>
                            )
                    }
                </Box>
                <Box
                    sx={{
                        width: '20%',
                        height: '100%',
                        overflow: 'auto',
                        position: 'fixed',
                        top: '97px',
                        right: '0'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            overflow: 'auto',
                            height: '110%',
                        }}
                    >
                        <h3
                            style={{
                                fontWeight: 600,
                                fontSize: '19px',
                                color: '#6b6969',
                            }}
                        >Sponsored by</h3>
                        {
                            advertisements.map((advertisement, index) => (
                                <a href={advertisement.link} target="_blank" rel="noopener noreferrer">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '7px',
                                            ':hover': {
                                                borderTopLeftRadius: '10px',
                                                background: '#80808036',
                                            }
                                        }}
                                    >
                                        <Box>
                                            <img src={advertisement.img}
                                                style={{
                                                    borderRadius: '10px',
                                                    width: '130px',
                                                    height: '130px'
                                                }}
                                            />
                                        </Box>
                                        <Box>
                                            <h3
                                                style={{
                                                    fontWeight: 500,
                                                }}
                                            >{advertisement.title}</h3>
                                            <p
                                                style={{
                                                    fontSize: '12px',
                                                    color: '#484e48'
                                                }}
                                            >{advertisement.content}</p>
                                        </Box>
                                    </Box>
                                </a>

                            ))
                        }
                    </Box>
                </Box>
            </Box>
            <div ref={sentinelRef}></div>

        </Box >
    );
}