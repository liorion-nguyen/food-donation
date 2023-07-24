import { Box, Button, CircularProgress, Grid, Pagination } from "@mui/material";
import { BoxPostmanger, PPostmanger } from "../../StyleComponentMui";
import MoreHoriz from '../../Images/MoreHoriz.svg'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogHomeActions } from "../../store/DialogHome";
import { getRewards } from "../../API/Api";

export default function ElementReward() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true) 
    const [ListRewards, setListRewards] = useState()
    const Rewards = useSelector((state: any) => state.dataHome.Reward)
    useEffect(() => {
        const fetchData = async () => {
            const dataListListRewards = await getRewards();
            setListRewards(dataListListRewards);
            setLoading(false)
        };
        fetchData();
    }, [Rewards]);

    const [pagination, setPagination] = useState(1)
    const handlePagination = (event: any, page: number) => {
        setPagination(page)
    }
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
            {
                loading ?
                    <Box
                        sx={{
                            height: `${window.innerHeight - 110}px`,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress color="inherit" />
                    </Box>
                    :
                    <Box>
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

                {

                    ListRewards && (ListRewards as any).slice((pagination - 1) * 8, pagination * 8).map((ListReward: any, index: number) => (
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
                                            {index + 1 + ((pagination - 1) * 8)}
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
                                            {ListReward.Information}
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
                                            {ListReward.expiredDate}
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
                                                marginLeft: ListReward.activeDate === "" ? "25%" : "0%",

                                            }}
                                        >
                                            {ListReward.activeDate === "" ? "--" : ListReward.activeDate}
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
                                            justifyContent: 'end'
                                        }}
                                    >
                                        <img src={MoreHoriz} />
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
                >{`Show 8 from ${ListRewards && (ListRewards as any).length} posts`}</p>
                <Pagination count={(ListRewards as any) && Math.ceil((ListRewards as any).length / 8)} shape="rounded" size='small'
                    sx={{
                        '.Mui-selected': {
                            backgroundColor: '#D5EEDB !important',
                            color: '#2BA84A',

                        }
                    }}
                    onChange={handlePagination}
                />
            </Box>
                    </Box>
            }

            
        </Box >
    );
}