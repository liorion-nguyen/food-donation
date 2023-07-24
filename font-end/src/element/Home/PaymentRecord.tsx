import { Box, Button, CircularProgress, Grid, Pagination } from "@mui/material";
import { BoxPostmanger, PPostmanger } from "../../StyleComponentMui";
import MoreHoriz from '../../Images/MoreHoriz.svg'
import { useEffect, useState } from "react";
import { DialogHomeActions } from "../../store/DialogHome";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentrecords } from "../../API/Api";

export default function ElementReward() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [ListPaymentRecords, setListPaymentRecords] = useState()
    const Paymentrecords = useSelector((state: any) => state.dataHome.Paymentrecord)
    useEffect(() => {
        const fetchData = async () => {
            const dataPaymentrecord = await getPaymentrecords();
            setListPaymentRecords(dataPaymentrecord);
            setLoading(false)
        };
        fetchData();
    }, [Paymentrecords]);

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
                            >Payment Record</h2>
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
                                        page: 'Paymentrecord',
                                    }))
                                }}
                            >
                                + New payment record
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
                                                LOG ID
                                            </PPostmanger>
                                        </BoxPostmanger>

                                    </Grid>
                                    <Grid item xs={3.25}>
                                        <BoxPostmanger>
                                            <PPostmanger>
                                                EVENT
                                            </PPostmanger>
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={2.5}>
                                        <BoxPostmanger>
                                            <PPostmanger>
                                                MONEY USED
                                            </PPostmanger>
                                        </BoxPostmanger>
                                    </Grid>
                                    <Grid item xs={2.5}>
                                        <BoxPostmanger>
                                            <PPostmanger>
                                                USED DATE
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
                                ListPaymentRecords &&
                                (ListPaymentRecords as any).slice((pagination - 1) * 8, pagination * 8).map((ListPaymentRecord: any, index: number) => (
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
                                                    <img src={ListPaymentRecord.imgEvent} style={{
                                                        width: '6%',
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
                                                        {ListPaymentRecord.event}
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
                                                        {`$${ListPaymentRecord.moneyUsed}`}
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
                                                            marginLeft: ListPaymentRecord.usedDate === "" ? "30%" : "0%",

                                                        }}
                                                    >
                                                        {ListPaymentRecord.usedDate === "" ? "--" : ListPaymentRecord.usedDate}
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
                                                        {ListPaymentRecord.status}
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
                            >{`Show 8 from ${ListPaymentRecords && (ListPaymentRecords as any).length} posts`}</p>
                            <Pagination count={Math.ceil((ListPaymentRecords as any) && (ListPaymentRecords as any).length / 8)} shape="rounded" size='small'
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