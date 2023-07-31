import { Box, Button, Grid } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import { useDispatch } from "react-redux";

import { DialogHomeActions } from "../store/DialogHome";

import PostManager from "../Images/home/main/PostManager.svg";
import Reward from "../Images/home/main/Reward.svg";
import Location from "../Images/home/main/Location.svg";
import Donation from "../Images/home/main/Donation.svg";

export default function ElementOverview() {
    const dispatch = useDispatch();
    const ListOverViews = [
        {
            title: 'Add a new post',
            note: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
            icon: PostManager,
            button: 'New post',
        },
        {
            title: 'Add a new location to the application map',
            note: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
            icon: Reward,
            button: 'Add location'
        },
        {
            title: 'Add new rewards and vouchers',
            note: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
            icon: Location,
            button: 'Add reward'
        },
        {
            title: 'Update the amount of used money for donations',
            note: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. ',
            icon: Donation,
            button: 'Add new payment record'
        }
    ]
    return (
        <Box
            style={{
                padding: '40px 30px',
                background: '#fcfcfd',
            }}
        >
            <Box>
                <h3
                    style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '28px',
                        color: '#141416',
                        margin: '0'
                    }}
                >Welcome back, Milly Nguyen</h3>
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid #E6E8EC'
                    }}
                >
                    <PlaceIcon
                        style={{
                            color: '#2BA84A'
                        }}
                    />
                    <p
                        style={{
                            fontSize: '20px',
                            lineHeight: '32px'
                        }}
                    >South Australia(SA), 5583</p>
                </Box>
            </Box>

            <Box
                style={{
                    margin: '30px 0'
                }}
            ><Grid container spacing={5} >
                    {
                        ListOverViews.map((ListOverView, index) => (

                            <Grid item xs={12} md={6} key={index}>
                                <Box
                                    style={{
                                        background: '#FFFFFF',
                                        border: '1px solid #EBEAED',
                                        borderRadius: '4px',
                                        padding: '20px',
                                        height: '220px'
                                    }}
                                >
                                    <Box
                                        style={{
                                            height: '50px'
                                        }}
                                    >
                                        <img src={ListOverView.icon}
                                            style={{
                                                width: '5%',
                                            }} alt="error"
                                        />
                                    </Box>
                                    <h4
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '20px',
                                            lineHeight: '32px',
                                            margin: '15px 0 10px 0',
                                        }}
                                    >{ListOverView.title}</h4>
                                    <p
                                        style={{
                                            fontFamily: 'Inter',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: '13px',
                                            lineHeight: '150%',
                                            color: '#353945',
                                            margin: '0 0 20px 0'
                                        }}
                                    >{ListOverView.note}</p>
                                    <Button variant="contained" color="success"
                                        sx={{
                                            background: '#2BA84A',
                                            borderRadius: '4px',
                                            width: '100%',
                                            height: '40px',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                        }}
                                        onClick={() => {
                                            if (ListOverView.button === "New post") {
                                                dispatch(DialogHomeActions.showDialog({
                                                    page: 'Postmanager',
                                                    mode: 'Create',
                                                    data: '',
                                                }))
                                            }
                                            else if (ListOverView.button === "Add location") {
                                                dispatch(DialogHomeActions.showDialog({
                                                    page: 'Location',
                                                    mode: 'Create',
                                                    data: '',
                                                }))
                                            }
                                            else if (ListOverView.button === "Add reward") {
                                                dispatch(DialogHomeActions.showDialog({
                                                    page: 'Reward',
                                                    mode: 'Create',
                                                    data: '',
                                                }))
                                            }
                                            else if (ListOverView.button === "Add new payment record") {
                                                dispatch(DialogHomeActions.showDialog({
                                                    page: 'Paymentrecord',
                                                    mode: 'Create',
                                                    data: '',
                                                }))
                                            }
                                        }}
                                    >
                                        {ListOverView.button}
                                    </Button>

                                </Box>
                            </Grid>

                        ))
                    }
                </Grid>
            </Box>
        </Box >
    );
}