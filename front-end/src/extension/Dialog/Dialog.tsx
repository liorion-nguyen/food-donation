import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { DialogHomeActions } from '../../store/DialogHome';
import { Box, Button } from '@mui/material';
import { forwardRef } from 'react';
import { DataHomeActions } from '../../store/DataHome';
import { TransitionProps } from '@mui/material/transitions';
import Location from '../Location';
import Reward from '../Reward';
import Postmanager from '../Postmanager';
import Paymentrecord from '../Paymentrecord';

import AddSucces from '../../Images/success-message/AddSucces.svg'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function AlertDialogSlide() {
    const dispatch = useDispatch();
    const dialog = useSelector((state: any) => state.dialog)
    const handleClose = () => {
        dispatch(DialogHomeActions.hideDialog());
    };

    return (
        <Box>
            <Dialog
                fullWidth={true}
                open={dialog.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <Box
                    style={{
                        width: '100%',
                        background: '#FCFCFD',
                        display: dialog.succes ? 'none' : 'block',
                    }}
                >
                    {dialog.data.page === 'Location' && <Location />}
                    {dialog.data.page === 'Reward' && <Reward />}
                    {dialog.data.page === 'Postmanager' && <Postmanager />}
                    {dialog.data.page === 'Paymentrecord' && <Paymentrecord />}
                </Box>


                <Box
                    style={{
                        width: '100%',
                        background: '#FCFCFD',
                        display: !dialog.succes ? 'none' : 'flex',
                    }}
                >
                    <Box
                        style={{
                            width: '100%',
                            padding: '30px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <h3
                            style={{
                                fontWeight: 700,
                                fontSize: '24px',
                                lineHeight: '32px',
                                color: '#2BA84A',
                                margin: '0',
                            }}
                        >Create successfully</h3>
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: '16px',
                            }}
                        >Your post created successfully.</p>
                        <img src={AddSucces}
                            style={{
                                width: '40%',
                                margin: '20px 0',
                            }}
                        />
                        <Button variant='contained'
                            style={{
                                height: '48px',
                                background: '#2BA84A',
                                borderRadius: '4px',
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: '20px',
                                color: '#FCFCFD',
                            }}
                            onClick={() => {
                                dispatch(DialogHomeActions.hideDialog())
                                dispatch(DataHomeActions.setPage(dialog.data.page))
                            }}
                        >
                            {`Back to ${dialog.data.page}`}
                        </Button>
                    </Box>

                </Box>

            </Dialog >
        </Box >
    );
}