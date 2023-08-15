import { Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, FormControl, Grid, InputLabel, NativeSelect, Pagination, Skeleton, Slide, TextField } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { deleteRewards, getRewards } from "../API/reward/reward.api";
import { DialogHomeActions } from "../store/DialogHome";
import { BoxPostmanger, PPostmanger, StyleSelectBox, StyleSelectP } from "../StyleComponent/Post";

import IconConfirmDelete from '../Images/table-post/IconConfirmDelete.png'
import MoreHoriz from '../Images/table-post/MoreHoriz.svg';
import { alertActions } from "../store/alert";
import { LoadingActions } from "../store/loading";
import { TransitionProps } from "@mui/material/transitions";


const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ElementReward() {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => (state.loading.mode))
    interface Reward {
        _id: string;
        imgInformation: string;
        VoucherName: string;
        VoucherCode: number;
        ExpiredDate: string;
        Description: string;
        releaseDate: string;
        status: string;
    }
    const [ListRewards, setListRewards] = useState<Reward[] | undefined>(undefined);
    const rewards = useSelector((state: any) => state.dataHome.Reward)
    const [pagination, setPagination] = useState(1)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            dispatch(LoadingActions.showLoading());
            const dataListListRewards = await getRewards(page, show);
            setListRewards(dataListListRewards.data);
            setPagination(dataListListRewards.count);
            dispatch(LoadingActions.hideLoading());
        };
        fetchData();
    }, [rewards, page, show]);

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

    const handleDelete = async (PostmanagerId: any) => {
        try {
            const response = await deleteRewards(PostmanagerId);
            const fetchData = async () => {
                const dataListListRewards = await getRewards(page, show);
                setListRewards(dataListListRewards.data);
                setPagination(dataListListRewards.count);
            };
            fetchData();
        } catch (error) {
            console.error('Error deleting location:', error);
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
                    >Reward Management</h2>
                    <Button variant="contained" color="success"
                        sx={{
                            background: '#2BA84A',
                            borderRadius: '4px',
                            height: '40px',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '20px',
                        }}
                        onClick={() => {
                            dispatch(DialogHomeActions.showDialog({
                                page: 'Reward',
                                mode: 'Create',
                                data: '',
                            }))
                        }}
                    >
                        + New voucher
                    </Button>
                </Box>

                <Box
                    style={{
                        width: '100%',
                        margin: '20px 0 20px 0',
                        padding: '10px',
                        height: '80%',
                        borderRadius: '4px',
                    }}
                >
                    <Box
                        style={{
                            padding: '15px 20px 0 20px',
                            background: '#fcfcfd'
                        }}
                    >
                        <Grid container
                            style={{
                                borderBottom: '1px solid  #EBEAED',
                            }}
                        >
                            <Grid item xs={1.5}>
                                <BoxPostmanger>
                                    <PPostmanger>
                                        VOUCHER CODE
                                    </PPostmanger>
                                </BoxPostmanger>

                            </Grid>
                            <Grid item xs={3.25}>
                                <BoxPostmanger>
                                    <PPostmanger>
                                        VOUCHER INFORMATION
                                    </PPostmanger>
                                </BoxPostmanger>
                            </Grid>
                            <Grid item xs={2.5}>
                                <BoxPostmanger>
                                    <PPostmanger>
                                        EXPIRED DATE
                                    </PPostmanger>
                                </BoxPostmanger>
                            </Grid>
                            <Grid item xs={2.5}>
                                <BoxPostmanger>
                                    <PPostmanger>
                                        ACTIVED DATE
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
                        {ListRewards === undefined || loading ? (
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
                                        <Grid item xs={3.25}>
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
                                        <Grid item xs={0.75}>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))
                        ) : (
                            ListRewards && ListRewards.map((ListReward: any, index: number) => (
                                <Box key={index}
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
                                                    {ListReward.VoucherCode}
                                                </PPostmanger>
                                            </BoxPostmanger>

                                        </Grid>
                                        <Grid item xs={3.25}>
                                            <BoxPostmanger>
                                                <img src={ListReward.imgInformation} style={{
                                                    width: '6%'
                                                }} />
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
                                                    {ListReward.VoucherName}
                                                </PPostmanger>
                                            </BoxPostmanger>
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <BoxPostmanger>
                                                <PPostmanger
                                                    style={{
                                                        fontWeight: 500,
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                    }}
                                                >
                                                    {ListReward.ExpiredDate}
                                                </PPostmanger>
                                            </BoxPostmanger>
                                        </Grid>
                                        <Grid item xs={2.5}>
                                            <BoxPostmanger>
                                                <PPostmanger
                                                    style={{
                                                        fontWeight: 500,
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                        marginLeft: ListReward.releaseDate === "" ? "25%" : "0%",
                                                    }}
                                                >
                                                    {ListReward.releaseDate === "" ? "--" : ListReward.releaseDate}
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
                                                    {ListReward.status}
                                                </PPostmanger>
                                            </BoxPostmanger>
                                        </Grid>
                                        <Grid item xs={0.75}>
                                            <BoxPostmanger
                                                style={{
                                                    justifyContent: 'end',
                                                    position: 'relative'
                                                }}
                                            >
                                                <img src={MoreHoriz}
                                                    onClick={() => {
                                                        setOpen({
                                                            mode: open.id === index ? !open.mode : true,
                                                            id: index,
                                                        })
                                                    }} />
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
                                                                page: 'Reward',
                                                                mode: 'Update',
                                                                data: ListReward,
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
                                                            <img src={ListReward.imgInformation}
                                                                style={{
                                                                    width: '10%'
                                                                }}
                                                            />
                                                            <DialogTitle
                                                                sx={{
                                                                    margin: '0',
                                                                    padding: '0 0 0 10px'
                                                                }}
                                                            >{`${ListReward.VoucherName}`}</DialogTitle>
                                                        </Box>
                                                        <DialogActions
                                                        >
                                                            <Button onClick={() => {
                                                                handleDelete(ListReward._id);
                                                                dispatch(alertActions.showAlert());
                                                                dispatch(alertActions.setContentAlert(`Bạn đã xoá Post thành công!`));
                                                                dispatch(alertActions.setColorGreen());
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
                        <Pagination count={Math.ceil(pagination / show)} shape="rounded" size='small'
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