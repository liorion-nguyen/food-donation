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
import { format } from 'date-fns';


const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ElementLocation() {
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
    const [ListLocations, setListLocations] = useState([]);

    const locations = useSelector((state: any) => state.dataHome.Location)
    const [pagination, setPagination] = useState(1)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            dispatch(LoadingActions.showLoading());
            const dataListLocations = await getLocations(page, show);
            setListLocations(dataListLocations.data);
            setPagination(dataListLocations.count);
            dispatch(LoadingActions.hideLoading());
        };
        fetchData();
    }, [locations, page, show]);

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
        const response = await deleteLocations(locationId);
        if (response !== "Error") {
            const fetchData = async () => {
                const dataListLocations = await getLocations(page, show);
                setListLocations(dataListLocations.data);
                setPagination(dataListLocations.count);
                dispatch(alertActions.setContentAlert(`Bạn đã xoá Post thành công!`));
                dispatch(alertActions.setColorGreen());
                dispatch(alertActions.showAlert());
            };
            fetchData();
        }
        else {
            dispatch(alertActions.setContentAlert(`Không đủ quyền để xoá Post!`));
            dispatch(alertActions.setColorWrong());
            dispatch(alertActions.showAlert());
        }



};

return (
    <Box
        style={{
            padding: '20px 30px',
            background: '#f4f5f6',
            display: 'flex',
            flexDirection: 'column',
            height: `${window.innerHeight - 110}px`,
        }}
    >
        <Box
            sx={{
                display: 'block',
                height: '100%'
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <h2
                    style={{
                        margin: '0'
                    }}
                >Location Management</h2>
                <Button variant="contained" color="success"
                    sx={{
                        background: '#2BA84A',
                        borderRadius: '4px',
                        height: '40px',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        zIndex: '1',
                    }}
                    onClick={() => {
                        dispatch(DialogHomeActions.showDialog({
                            page: 'Location',
                            mode: 'Create',
                            data: '',
                        }))
                    }}
                >
                    + New location
                </Button>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    margin: '20px 0 20px 0',
                    borderRadius: '4px',
                    padding: '10px',
                    height: '80%',
                }}
            >
                <Box
                    style={{
                        padding: '15px 20px 0 20px',
                        background: '#fcfcfd',
                    }}
                >
                    <Grid container
                        style={{
                            borderBottom: '1px solid  #EBEAED'
                        }}
                    >
                        <Grid item xs={1.5}>
                            <BoxPostmanger>
                                <PPostmanger>
                                    ADDRES ID
                                </PPostmanger>
                            </BoxPostmanger>

                        </Grid>
                        <Grid item xs={3.75}>
                            <BoxPostmanger>
                                <PPostmanger>
                                    ADDRESS
                                </PPostmanger>
                            </BoxPostmanger>
                        </Grid>
                        <Grid item xs={1.5}>
                            <BoxPostmanger>
                                <PPostmanger>
                                    LOCATION
                                </PPostmanger>
                            </BoxPostmanger>
                        </Grid>
                        <Grid item xs={3}>
                            <BoxPostmanger>
                                <PPostmanger>
                                    ADDED DATE
                                </PPostmanger>
                            </BoxPostmanger>
                        </Grid>
                        <Grid item xs={1.5}>
                            <BoxPostmanger>
                                <PPostmanger>
                                    STATUS
                                </PPostmanger>
                            </BoxPostmanger>
                        </Grid>
                        <Grid item xs={0.75}></Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        height: '90%',
                        maxHeight: '90%',
                        overflow: 'auto',
                        background: '#FCFCFD',
                    }}
                >
                    {ListLocations === undefined || loading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <Box
                                key={index}
                                style={{
                                    padding: '10px 20px',
                                    marginTop: '8px',
                                    background: '#ffffff',
                                }}
                            >
                                <Grid container
                                    style={{
                                        padding: '0 0 10px 0',
                                        borderBottom: '1px solid  #EBEAED',
                                    }}
                                >
                                    <Grid item xs={1.5}>
                                        <BoxPostmanger>
                                            <Skeleton animation="wave"
                                                sx={{
                                                    width: '70%',
                                                    height: '50px'
                                                }}
                                            />
                                        </BoxPostmanger>

                                    </Grid>
                                    <Grid item xs={3.75}>
                                        <BoxPostmanger>
                                            <Skeleton animation="wave"
                                                sx={{
                                                    width: '9%',
                                                    height: '50px'
                                                }}
                                            />
                                            <Skeleton animation="wave"
                                                sx={{
                                                    width: '70%',
                                                    marginLeft: '10px',
                                                    height: '50px'
                                                }}
                                            />
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <BoxPostmanger>
                                            <Skeleton animation="wave"
                                                sx={{
                                                    width: '70%',
                                                    height: '50px',
                                                }}
                                            />
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <BoxPostmanger>
                                            <Skeleton animation="wave"
                                                sx={{
                                                    width: '70%',
                                                    height: '50px',
                                                }}
                                            />
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <BoxPostmanger>
                                            <Skeleton animation="wave"
                                                sx={{
                                                    width: '70%',
                                                    height: '50px',
                                                }}
                                            />
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={0.75}>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))
                    ) : (
                        ListLocations && ListLocations.map((ListLocation: any, index: number) => (
                            <Box
                                key={index}
                                style={{
                                    padding: '10px 20px',
                                    marginTop: '8px',
                                    background: '#ffffff',
                                }}
                            >
                                <Grid container
                                    style={{
                                        padding: '0 0 10px 0',
                                        borderBottom: '1px solid  #EBEAED',
                                    }}
                                >
                                    <Grid item xs={1.5}>
                                        <BoxPostmanger>
                                            <PPostmanger
                                                style={{
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    lineHeight: '20px',
                                                    color: '#2BA84A',
                                                }}
                                            >
                                                {index + 1 + ((page - 1) * show)}
                                            </PPostmanger>
                                        </BoxPostmanger>

                                    </Grid>
                                    <Grid item xs={3.75}>
                                        <BoxPostmanger>
                                            <img
                                                src={ListLocation.imgAddress}
                                                style={{
                                                    width: '6%',
                                                    height: '25px'
                                                }}
                                                alt="Location"
                                            />
                                            <PPostmanger
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                    lineHeight: '20px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 1,
                                                    maxWidth: '70%',
                                                    WebkitBoxOrient: 'vertical',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                {ListLocation.address}
                                            </PPostmanger>
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <BoxPostmanger>
                                            <PPostmanger
                                                style={{
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    lineHeight: '20px',
                                                }}
                                            >
                                                {ListLocation.location}
                                            </PPostmanger>
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <BoxPostmanger>
                                            <PPostmanger
                                                style={{
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    lineHeight: '20px',
                                                }}
                                            >
                                                {ListLocation.addedDate}
                                            </PPostmanger>
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <BoxPostmanger>
                                            <PPostmanger
                                                style={{
                                                    color: '#30993B',
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    lineHeight: '20px',
                                                    background: '#D5EEDB',
                                                    borderRadius: '20px',
                                                    padding: '8px 16px',
                                                }}
                                            >
                                                {ListLocation.status}
                                            </PPostmanger>
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={0.75}>
                                        <BoxPostmanger
                                            style={{
                                                justifyContent: 'end',
                                                position: 'relative',
                                                display: loading ? 'none' : 'flex'
                                            }}
                                        >
                                            <img src={MoreHoriz}
                                                onClick={() => {
                                                    setOpen({
                                                        mode: open.id === index ? !open.mode : true,
                                                        id: index,
                                                    });
                                                }}
                                            />

                                            <Box
                                                style={{
                                                    width: '90px',
                                                    height: 'max-content',
                                                    display: open.mode && open.id === index ? 'flex' : 'none',
                                                    background: '#fcfcfd',
                                                    padding: '5px 10px',
                                                    position: 'absolute',
                                                    bottom: '0',
                                                    right: '0',
                                                    borderRadius: '5px',
                                                    flexDirection: 'column',
                                                    boxShadow: 'grey 3px 3px 5px 0px',
                                                    zIndex: '2'
                                                }}
                                                onClick={() => {
                                                    setOpen({
                                                        mode: false,
                                                        id: index,
                                                    })
                                                }}

                                            >
                                                <StyleSelectBox
                                                    onClick={() => {
                                                        handleClickOpen(index);
                                                    }}
                                                >
                                                    <DeleteIcon></DeleteIcon>
                                                    <StyleSelectP>Delete</StyleSelectP>
                                                </StyleSelectBox>

                                                <StyleSelectBox
                                                    onClick={() => {
                                                        dispatch(DialogHomeActions.showDialog({
                                                            page: 'Location',
                                                            mode: 'Update',
                                                            data: ListLocation,
                                                        }))
                                                    }}
                                                >
                                                    <EditIcon></EditIcon>
                                                    <StyleSelectP>Update</StyleSelectP>
                                                </StyleSelectBox>
                                            </Box>
                                            <Box>
                                                <Dialog
                                                    open={openConfirm.mode && openConfirm.id === index}
                                                    TransitionComponent={Transition}
                                                    keepMounted
                                                    onClose={handleClose}
                                                    aria-describedby="alert-dialog-slide-description"
                                                    sx={{
                                                        '.MuiDialogActions-root': {
                                                            justifyContent: 'center'
                                                        },
                                                        '.MuiModal-backdrop': {
                                                            backgroundColor: 'rgb(0 0 0 / 22%)',
                                                        },
                                                        '.MuiPaper-root': {
                                                            boxShadow: '#3333332b 2px 3px 8px 2px',
                                                        }

                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <img src={IconConfirmDelete}
                                                            style={{
                                                                width: '40%'
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            width: '100%',
                                                            justifyContent: 'center',
                                                            padding: '40px 0 20px 0',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <img src={ListLocation.imgAddress}
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        />
                                                        <DialogTitle
                                                            sx={{
                                                                margin: '0',
                                                                padding: '0 0 0 10px'
                                                            }}
                                                        >{`${ListLocation.address}`}</DialogTitle>
                                                    </Box>
                                                    <DialogActions>
                                                        <Button onClick={() => {
                                                            handleDelete(ListLocation._id);
                                                            handleClose();
                                                        }}>Agree</Button>
                                                        <Button onClick={handleClose}>Disagree</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </Box>
                                        </BoxPostmanger>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))
                    )}
                </Box>

            </Box>

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <p
                    style={{
                        margin: '0',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '12px',
                        lineHeight: '18px',
                        color: '#84818A',
                    }}
                >{`Show ${show} from ${pagination} posts`}</p>
                <FormControl >
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Rows Per Page
                    </InputLabel>
                    <NativeSelect
                        defaultValue={show}
                        inputProps={{
                            name: 'Rows Per Page',
                            id: 'uncontrolled-native',
                        }}
                        onChange={(e: any) => {
                            setShow(e.target.value);
                            dispatch(alertActions.showAlert());
                            dispatch(alertActions.setColorGreen());
                            dispatch(alertActions.setContentAlert(`Hiện thị ${e.target.value} thông tin.`));
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </NativeSelect>
                </FormControl>
                <Pagination count={Math.ceil(pagination / show)} shape="rounded" size='small' page={page}
                    sx={{
                        '.Mui-selected': {
                            backgroundColor: '#D5EEDB !important',
                            color: '#2BA84A',

                        }
                    }}
                    onChange={(event: any, page: number) => {
                        setPage(page);
                    }}
                />
            </Box>
        </Box>

    </Box >
);
}