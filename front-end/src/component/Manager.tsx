import { Box, Button, Dialog, DialogActions, DialogTitle, FormControl, Grid, InputLabel, NativeSelect, Pagination, Skeleton, Slide } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import IconConfirmDelete from '../Images/table-post/IconConfirmDelete.png'
import { alertActions } from "../store/alert";
import { LoadingActions } from "../store/loading";
import { BoxPostmanger, PPostmanger, StyleSelectBox, StyleSelectP } from "../StyleComponent/Post";
import { TransitionProps } from "@mui/material/transitions";
import { deleteUser, getUsers } from "../API/user/user.api";
import { DialogHomeActions } from "../store/DialogHome";
import Error from "./Error";


const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ElementManager() {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => (state.loading.mode))
    interface User {
        _id: string;
        username: string;
        password: string;
        contact: string;
        orgId: object;
        isAdmin: boolean;
        status: boolean;
    }
    const [error, setError] = useState(false)
    const [ListUsers, setListUsers] = useState<User[] | undefined>(undefined);
    const users = useSelector((state: any) => state.dataHome.User)
    const search = useSelector((state: any) => state.dataHome.search)
    const [pagination, setPagination] = useState(1)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            dispatch(LoadingActions.showLoading());
            const dataListUsers = await getUsers(page, show, search);
            console.log(dataListUsers);
            
            if (dataListUsers === "Error") {
                setError(true);
                dispatch(alertActions.setColorWrong());
                dispatch(alertActions.setContentAlert('Không có quyền để vào!'));
                dispatch(alertActions.showAlert());
            } else {
                setError(false)
            }
            setListUsers(dataListUsers.data);
            setPagination(dataListUsers.count);
            dispatch(LoadingActions.hideLoading());
        };
        fetchData();
    }, [users, page, show, search]);

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

    const handleDelete = async (userId: any) => {
        const response = await deleteUser(userId);
        if (response !== "Error") {
            const fetchData = async () => {
                const dataListUsers = await getUsers(page, show, search);
                setListUsers(dataListUsers.data);
                setPagination(dataListUsers.count);
                dispatch(alertActions.setContentAlert(`Bạn đã xoá User thành công!`));
                dispatch(alertActions.setColorGreen());
                dispatch(alertActions.showAlert());
            };
            fetchData();
        }
        else {
            dispatch(alertActions.setContentAlert(`Không đủ quyền để xoá User!`));
            dispatch(alertActions.setColorWrong());
            dispatch(alertActions.showAlert());
        }
    };

    return (
        <>
            <Box
                style={{
                    padding: '20px 30px',
                    background: '#f4f5f6',
                    display: error ? 'none' : 'flex',
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
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h2
                            style={{
                                margin: '0'
                            }}
                        >User management </h2>
                        <Button variant="contained" color="success"
                            sx={{
                                background: '#2BA84A',
                                borderRadius: '4px',
                                height: '40px',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '20px',
                            }}
                        >
                            + New account user
                        </Button>
                    </Box>

                    <Box
                        style={{
                            width: '100%',
                            margin: '20px 0 20px 0',
                            borderRadius: '4px',
                            padding: '10px',
                            height: '80%'
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
                                    borderBottom: '1px solid  #EBEAED',
                                }}
                            >
                                <Grid item xs={2}>
                                    <BoxPostmanger>
                                        <PPostmanger>
                                            USER ID
                                        </PPostmanger>
                                    </BoxPostmanger>

                                </Grid>
                                <Grid item xs={2.5}>
                                    <BoxPostmanger>
                                        <PPostmanger>
                                            USERNAME
                                        </PPostmanger>
                                    </BoxPostmanger>
                                </Grid>
                                <Grid item xs={3}>
                                    <BoxPostmanger>
                                        <PPostmanger>
                                            CONTACT
                                        </PPostmanger>
                                    </BoxPostmanger>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <BoxPostmanger>
                                        <PPostmanger>
                                            CreateAt
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
                                <Grid item xs={0.5}></Grid>
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
                            {
                                ListUsers === undefined || loading ? (
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
                                                <Grid item xs={2}>
                                                    <BoxPostmanger>
                                                        <Skeleton animation="wave"
                                                            sx={{
                                                                width: '70%',
                                                                height: '50px'
                                                            }}
                                                        />
                                                    </BoxPostmanger>

                                                </Grid>
                                                <Grid item xs={2.5}>
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
                                                <Grid item xs={2.5}>
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
                                                <Grid item xs={0.5}>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))
                                ) : (
                                    ListUsers && ListUsers.map((ListUser: any, index: number) => (
                                        <Box key={index}
                                            style={{
                                                padding: '10px 20px',
                                                background: '#ffffff',
                                                marginTop: '8px',
                                            }}
                                        >
                                            <Grid container
                                                style={{
                                                    padding: '0 0 10px 0',
                                                    borderBottom: '1px solid  #EBEAED',
                                                }}
                                            >
                                                <Grid item xs={2}>
                                                    <BoxPostmanger>
                                                        <PPostmanger
                                                            style={{
                                                                fontWeight: 500,
                                                                fontSize: '14px',
                                                                lineHeight: '20px',
                                                                color: '#2BA84A',
                                                            }}
                                                        >
                                                            {ListUser._id}
                                                        </PPostmanger>
                                                    </BoxPostmanger>

                                                </Grid>
                                                <Grid item xs={2.5}>
                                                    <BoxPostmanger>
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
                                                            {ListUser.username}
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
                                                                marginLeft: '10px',
                                                            }}
                                                        >
                                                            {ListUser.contact}
                                                        </PPostmanger>
                                                    </BoxPostmanger>
                                                </Grid>
                                                <Grid item xs={2.5}>
                                                    <BoxPostmanger>
                                                        <PPostmanger
                                                            style={{
                                                                fontWeight: 500,
                                                                fontSize: '14px',
                                                                lineHeight: '14px',
                                                            }}
                                                        >
                                                            {new Date(ListUser.createdAt).toISOString().slice(0, 10)}
                                                        </PPostmanger>
                                                    </BoxPostmanger>
                                                </Grid>
                                                <Grid item xs={1.5}>
                                                    <BoxPostmanger>
                                                        <PPostmanger
                                                            style={{
                                                                color: ListUser.status ? '#30993B' : 'red',
                                                                fontWeight: 500,
                                                                fontSize: '14px',
                                                                lineHeight: '20px',
                                                                background: ListUser.status ? '#D5EEDB' : '#ff00006e',
                                                                borderRadius: '20px',
                                                                padding: '8px 16px',
                                                                minWidth: '60px',
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            {ListUser.status ? "Active" : "InActive"}
                                                        </PPostmanger>
                                                    </BoxPostmanger>
                                                </Grid>
                                                <Grid item xs={0.5}>
                                                    <BoxPostmanger
                                                        style={{
                                                            justifyContent: 'end',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <StyleSelectBox
                                                            onClick={() => {
                                                                dispatch(DialogHomeActions.showDialog({
                                                                    page: 'Manager',
                                                                    mode: 'Update',
                                                                    data: ListUser,
                                                                }))
                                                            }}
                                                        >
                                                            <EditIcon
                                                                sx={{
                                                                    color: '#4e4848c2',
                                                                }}
                                                            ></EditIcon>
                                                        </StyleSelectBox>
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
                                                                    <img src={ListUser.imgAddress}
                                                                        style={{
                                                                            width: '10%'
                                                                        }}
                                                                    />
                                                                    <DialogTitle
                                                                        sx={{
                                                                            margin: '0',
                                                                            padding: '0 0 0 10px'
                                                                        }}
                                                                    >{`${ListUser.username}`}</DialogTitle>
                                                                </Box>
                                                                <DialogActions>
                                                                    <Button onClick={() => {
                                                                        handleDelete(ListUser._id);
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
                                )
                            }
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
                                    if (e.target.value > 0) {
                                        setShow(e.target.value);
                                        dispatch(alertActions.showAlert());
                                        dispatch(alertActions.setColorGreen());
                                        dispatch(alertActions.setContentAlert(`Hiện thị ${e.target.value} thông tin.`));
                                    }
                                    else {
                                        setShow(1);
                                        dispatch(alertActions.showAlert());
                                        dispatch(alertActions.setColorWrong());
                                        dispatch(alertActions.setContentAlert('Không thể hiện thị ít hơn một thông tin.'));
                                    }
                                }}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </NativeSelect>
                        </FormControl>

                        <Pagination count={Math.ceil(pagination / show) || 0} shape="rounded" size='small' page={page}
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
            {error && <Error />}
        </>
    );
}