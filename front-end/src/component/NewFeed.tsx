import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, NativeSelect, Pagination, Skeleton, Slide, TextField, useMediaQuery, useTheme } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DialogHomeActions } from "../store/DialogHome";
import { deleteLocations, getLocations } from "../API/location/location.api";

import MoreHoriz from '../Images/table-post/MoreHoriz.svg';
import IconConfirmDelete from '../Images/table-post/IconConfirmDelete.png'
import { alertActions } from "../store/alert";
import { LoadingActions } from "../store/loading";
import { BoxPostmanger, PPostmanger, StyleBoxMain, StylePExtra, StylePMain, StyleSelectBox, StyleSelectP } from "../StyleComponent/Post";
import { TransitionProps } from "@mui/material/transitions";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ElementNewFeed() {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => (state.loading.mode))
    interface Location {
        _id: string;
        address: string;
        imgAddress: string;
        location: string;
        description: string;
        addedDate: string;
        status: string;
    }
    const [listLocations, setListLocations] = useState<Location[]>([]);

    const locations = useSelector((state: any) => state.dataHome.Location)
    const [pagination, setPagination] = useState(20)
    const [page, setPage] = useState(0)
    const [show, setShow] = useState(20)

    const [open, setOpen] = useState({
        mode: false,
        id: -1,
    });

    const [openConfirm, setOpenConfirm] = useState({
        mode: false,
        id: -1,
    });

    const handleClickOpen = (id: number) => {
        setOpenConfirm({
            mode: true,
            id: id,
        });
    };

    const handleClose = () => {
        setOpenConfirm({
            mode: false,
            id: -1,
        });
    };

    const handleDelete = async (locationId: any) => {
        try {
            const response = await deleteLocations(locationId);
            const fetchData = async () => {
                const dataListLocations = await getLocations(page, show);
                setListLocations(dataListLocations.data);
                setPagination(dataListLocations.count);
            };
            fetchData();
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };

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
                const dataListLocations = await getLocations(page === 0 ? 1 : page, show)
                if (dataListLocations !== "error") {
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

    return (
        <Box
            id="Data"
            sx={{
                backgroundColor: '#f0f2f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px 0',
            }}
        >
            {
                listLocations?.map((locations: Location, index: number) => (
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
                            <img src={locations.imgAddress}
                                style={{
                                    width: '100%',
                                    maxHeight: '250px'
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
                                <h3>{locations.address}</h3>
                            </Box>
                            <StyleBoxMain>
                                <StylePMain>ID: </StylePMain>
                                <StylePExtra>{index + 1}</StylePExtra>
                            </StyleBoxMain>
                            <StyleBoxMain>
                                <StylePMain>ADDRESS: </StylePMain>
                                <StylePExtra>{locations.address}</StylePExtra>
                            </StyleBoxMain>
                            <StyleBoxMain>
                                <StylePMain>LOCATION: </StylePMain>
                                <StylePExtra>{locations.location}</StylePExtra>
                            </StyleBoxMain>
                            <StyleBoxMain >
                                <StylePMain>DESCRIPTION: </StylePMain>
                                <StylePExtra>{locations.description}</StylePExtra>
                            </StyleBoxMain>
                            <Button variant="contained"
                                sx={{
                                    background: locations.status === 'Active' ? '#2ba84a' : '#dd8181',
                                    width: '100%',
                                    margin: '7px 0'
                                }}
                            >{locations.status}</Button>
                        </Box>
                    </Box>
                ))
            }
            <div ref={sentinelRef}></div>

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
    );
}