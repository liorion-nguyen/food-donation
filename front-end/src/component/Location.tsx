import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, NativeSelect, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { BoxPostmanger, PPostmanger } from "../StyleComponentMui";
import { DialogHomeActions } from "../store/DialogHome";
import { deleteLocations, getLocations } from "../API/location/location.api";

import MoreHoriz from '../Images/table-post/MoreHoriz.svg';
import { alertActions } from "../store/alert";
import { LoadingActions } from "../store/loading";

export default function ElementLocation() {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => (state.loading.mode))
    const [ListLocations, setListLocations] = useState(0)
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

    return (
        <Box
            style={{
                padding: '20px 30px',
                background: '#f4f5f6',
                display: 'flex',
                flexDirection: 'column',
                minHeight: `${window.innerHeight - 110}px`,
            }}
        >
            <Box
                sx={{
                    height: `${window.innerHeight - 110}px`,
                    width: '100%',
                    display: loading ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress color="inherit" />
            </Box>
            <Box
                style={{
                    display: loading ? 'none' : 'block'
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
                    style={{
                        width: '100%',
                        margin: '20px 0 20px 0',
                        background: '#FCFCFD',
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

                    {

                        ListLocations && (ListLocations as any).map((ListLocation: any, index: number) => (
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
                                                {index + 1 + ((page - 1) * show)}
                                            </PPostmanger>
                                        </BoxPostmanger>

                                    </Grid>
                                    <Grid item xs={3.75}>
                                        <BoxPostmanger>
                                            <img src={ListLocation.imgAddress}
                                                style={{
                                                    width: '6%'
                                                }}
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
                                            }}
                                        >
                                            <img src={MoreHoriz}
                                                onClick={() => {
                                                    setOpen({
                                                        mode: open.id === index ? !open.mode : true,
                                                        id: index,
                                                    })
                                                }}
                                            />
                                            <Box
                                                style={{
                                                    width: 'max-content',
                                                    height: 'max-content',
                                                    display: open.mode && open.id === index ? 'flex' : 'none',
                                                    background: '#b1b6bb',
                                                    padding: '5px 10px',
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    borderRadius: '5px',
                                                    flexDirection: 'column',
                                                }}
                                                onClick={() => {
                                                    setOpen({
                                                        mode: false,
                                                        id: index,
                                                    })
                                                }}

                                            >
                                                <DeleteIcon
                                                    onClick={() => handleDelete(ListLocation._id)}
                                                ></DeleteIcon>
                                                <EditIcon
                                                    onClick={() => {
                                                        dispatch(DialogHomeActions.showDialog({
                                                            page: 'Location',
                                                            mode: 'Update',
                                                            data: ListLocation,
                                                        }))
                                                    }}
                                                ></EditIcon>
                                            </Box>
                                        </BoxPostmanger>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))
                    }

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
                                    dispatch(alertActions.setContentAlert(`Hiện thị ${show} thông tin.`));
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