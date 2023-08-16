import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, FormControl, Grid, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { DialogHomeActions } from '../store/DialogHome';
import { createRewards, updateRewards } from '../API/reward/reward.api';
import { DataHomeActions } from '../store/DataHome';
import { alertActions } from '../store/alert';

import FormatListTich from '../Images/description/FormatListTich.svg';
import FormatListNumber from '../Images/description/FormatListNumber.svg';
import FormatListDot from '../Images/description/FormatListDot.svg';
import Picture from '../Images/description/Picture.svg';
import code from '../Images/description/code.svg';
import format_quote from '../Images/description/format_quote.svg';
import AddLink from '../Images/description/AddLink.svg';
import format_underlined from '../Images/description/format_underlined.svg';
import format_strikethrough from '../Images/description/format_strikethrough.svg';
import format_bold from '../Images/description/format_bold.svg';
import format_lean from '../Images/description/format_lean.svg';
import IconPicture from '../Images/add-post/IconPicture.svg';
import IconEye from '../Images/add-post/IconEye.svg'
import IconDelete from '../Images/add-post/IconDelete.svg';
import { updatePaymentrecords } from '../API/paymentrecord/paymentrecord.api';
import { LoadingActions } from '../store/loading';
import { IConFormatText } from '../StyleComponent/Post';

export default function Reward() {
    const rewards = useSelector((state: any) => state.dialog.data)
    const mode = rewards.mode;
    const data = rewards.data;

    const [inpVoucherName, setInpVoucherName] = useState(data.VoucherName || "")
    const [inpExpiredDate, setInpExpiredDate] = useState(data.ExpiredDate || "")
    const [inpVoucherCode, setInpVoucherCode] = useState(data.VoucherCode || "")
    const [inpDescription, setInpDescription] = useState(data.Description || "")
    const [imageUrl, setImageUrl] = useState(data.imgInformation || "");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const check_rewards = useSelector((state: any) => state.dataHome.Reward)

    const getDate = () => {
        const date = new Date();

        const time = `${date.toLocaleTimeString('en-GB')} ${date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}`;
        return time;
    };

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [url, setUrl] = useState("");

    const handleLoadFile = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event: any) => {
            const file = event.target.files[0];
            setSelectedFile(file);
        };
        fileInput.click();
    };

    const [fontFamily, setFontFamily] = useState("Headline 1");
    const handleSelector = (event: any) => {
        setFontFamily(event.target.value);
    };

    const Nextstep = async () => {
        setLoading(true)
        if ((selectedFile !== null || imageUrl !== "") && inpVoucherName !== "" && inpVoucherCode !== "" && inpExpiredDate !== "" && inpDescription !== "") {
            dispatch(LoadingActions.showLoading());
            if (mode !== "Update") {
                if (selectedFile !== null) {
                    const storageRef = firebase.storage().ref();
                    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile);
                    uploadTask.on(
                        'state_changed',
                        (snapshot: any) => { },
                        (error: any) => {
                            console.error('Error uploading image:', error);
                        },
                        async () => {
                            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                            setUrl(downloadURL);

                            const response = await createRewards({
                                imgInformation: downloadURL,
                                VoucherName: inpVoucherName,
                                VoucherCode: inpVoucherCode,
                                ExpiredDate: inpExpiredDate,
                                Description: inpDescription,
                                releaseDate: getDate(),
                                status: 'Active'
                            });
                            dispatch(DataHomeActions.getReward());
                        }
                    );
                }

            }
            else {
                if (selectedFile !== null) {
                    dispatch(LoadingActions.showLoading());
                    const storageRef = firebase.storage().ref();
                    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile);

                    uploadTask.on(
                        'state_changed',
                        (snapshot: any) => { },
                        (error: any) => {
                            console.error('Error uploading image:', error);
                        },
                        async () => {
                            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                            setUrl(downloadURL);

                            const response = await updateRewards(data._id, {
                                imgInformation: downloadURL,
                                VoucherName: inpVoucherName,
                                VoucherCode: inpVoucherCode,
                                ExpiredDate: inpExpiredDate,
                                Description: inpDescription,
                                releaseDate: getDate(),
                                status: 'Active'
                            })
                            dispatch(DataHomeActions.getReward());
                        }
                    );
                }
                else {
                    dispatch(LoadingActions.showLoading());
                    const update = async () => {
                        const response = await updateRewards(data._id, {
                            imgInformation: imageUrl,
                            VoucherName: inpVoucherName,
                            VoucherCode: inpVoucherCode,
                            ExpiredDate: inpExpiredDate,
                            Description: inpDescription,
                            releaseDate: getDate(),
                            status: 'Active'
                        })
                        dispatch(DataHomeActions.getReward());
                    }
                    update();
                }
            }
            dispatch(alertActions.showAlert());
            dispatch(alertActions.setColorGreen());
            if (mode !== "Update") {
                dispatch(alertActions.setContentAlert('Thêm thông tin thành công!'));
            }
            else {
                dispatch(alertActions.setContentAlert('Cập nhật thông tin thành công!'));
            }
            setTimeout(() => {
                dispatch(DialogHomeActions.handleAdd());
                setLoading(false)
                setSelectedFile(null);
            }, 500)
        }
        else {
            dispatch(alertActions.showAlert());
            dispatch(alertActions.setContentAlert("Bạn chưa điền đủ thông tin!"));
            dispatch(alertActions.setColorWrong());
            setTimeout(() => {
                setLoading(false)
            }, Math.random() * 800)
        }
    }
    return (
        <Box
            style={{
                padding: '30px',
            }}
        >
            <Box
                style={{
                    width: '100%',
                }}
            >
                <h3
                    style={{
                        padding: '0 0 20px 0px',
                        borderBottom: '1px dashed #B1B5C4',
                        margin: '0',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '32px',
                        lineHeight: '40px',
                        color: '#2E2C34',
                        width: '100%',
                    }}
                >Add new voucher</h3>
            </Box>
            <p
                style={{
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '22px',
                }}
            >Voucher Information</p>
            <Box>
                <p
                    style={{
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#504F54',
                    }}
                >Voucher name</p>
                <input type="text" placeholder="Sydney"
                    style={{
                        fontSize: '14px',
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1px solid #EBEAED',
                        borderRadius: '4px',
                        height: '48px',
                        padding: '0 0 0 10px',
                    }}
                    value={inpVoucherName}
                    onChange={(e) => {
                        setInpVoucherName(e.target.value)
                    }}
                />
            </Box>
            <Box>
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '48%',
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '20px',
                                color: '#504F54',
                            }}
                        >Expired Date</p>
                        <input type="text" placeholder="20/10/2022"
                            style={{
                                fontSize: '14px',
                                width: '94%',
                                background: '#FFFFFF',
                                border: '1px solid #EBEAED',
                                borderRadius: '4px',
                                height: '48px',
                                padding: '10px 3%',
                            }}
                            value={inpExpiredDate}
                            onChange={(e) => {
                                setInpExpiredDate(e.target.value)
                            }}
                        />
                    </Box>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '48%',
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 500,
                                fontSize: '14px',
                                lineHeight: '20px',
                                color: '#504F54',
                            }}
                        >Voucher Code</p>
                        <input type="text" placeholder="123098123"
                            style={{
                                fontSize: '14px',
                                width: '94%',
                                background: '#FFFFFF',
                                border: '1px solid #EBEAED',
                                borderRadius: '4px',
                                height: '48px',
                                padding: '10px 3%',
                            }}
                            value={inpVoucherCode}
                            onChange={(e) => {
                                setInpVoucherCode(e.target.value)
                            }}
                        />
                    </Box>
                </Box>

                <Box>
                    <p
                        style={{
                            fontWeight: 500,
                            fontSize: '14px',
                            lineHeight: '20px',
                            color: '#504F54',
                        }}
                    >Description</p>
                    <Box
                        style={{
                            background: '#FFFFFF',
                            border: '1px solid #EBEAED',
                            borderRadius: '4px 4px 0px 0px',
                        }}
                    >
                        <Box
                            style={{
                                height: '44px',
                                width: '100%',
                                borderBottom: '1px solid #EBEAED',
                            }}
                        >
                            <Grid container columnSpacing={0.5}
                                style={{
                                    width: '100%',
                                    height: '45px'
                                }}
                            >
                                <Grid item xs={3}
                                    style={{
                                        height: '100%'
                                    }}
                                >
                                    <Box
                                        style={{
                                            minWidth: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <FormControl
                                            sx={{
                                                m: 1,
                                                minWidth: 120,
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                                '.MuiFormControl-root': {
                                                    minWidth: 'auto',
                                                    height: '100%',
                                                },
                                                '.MuiInputBase-root': {
                                                    height: '100%',
                                                },
                                                height: '100%',
                                                margin: '0',
                                                width: '100%',
                                            }}
                                        >
                                            <Select
                                                sx={{
                                                    fontSize: '14px',
                                                }}
                                                value={fontFamily}
                                                onChange={handleSelector}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={"Headline 1"}>Headline 1</MenuItem>
                                                <MenuItem value={"Headline 2"}>Headline 2</MenuItem>
                                                <MenuItem value={"Headline 3"}>Headline 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={2.75}>
                                    <Box
                                        style={{
                                            width: '80%',
                                            height: '100%',
                                            padding: '0 10%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IConFormatText src={format_bold} />
                                        <IConFormatText src={format_lean}
                                            style={{
                                                width: '12.5%'
                                            }}
                                        />
                                        <IConFormatText src={format_underlined} />
                                        <IConFormatText src={format_strikethrough} />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box
                                        style={{
                                            width: '80%',
                                            height: '100%',
                                            padding: '0 10%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IConFormatText src={AddLink} />
                                        <IConFormatText src={format_quote} />
                                        <IConFormatText src={code} />
                                        <IConFormatText src={Picture} />
                                    </Box>
                                </Grid>
                                <Grid item xs={2.5}>
                                    <Box
                                        style={{
                                            width: '80%',
                                            height: '100%',
                                            padding: '0 10%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IConFormatText src={FormatListDot} />
                                        <IConFormatText src={FormatListNumber} />
                                        <IConFormatText src={FormatListTich} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            style={{
                                width: '96%',
                                padding: '2%'
                            }}
                        >
                            <TextareaAutosize minRows={5}
                                style={{
                                    width: '100%',
                                    outline: 'none',
                                    border: 'none',
                                    resize: 'none',
                                    color: '#2E2C34',
                                    fontSize: '14px',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '24px',
                                    maxHeight: '80px',
                                }}
                                value={inpDescription}
                                onChange={(e: any) => {
                                    setInpDescription(e.target.value)
                                }}
                                placeholder='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
                            />
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <h3
                        style={{
                            fontWeight: 600,
                            fontSize: '18px',
                            lineHeight: '22px',
                            color: '#2E2C34',
                        }}
                    >Media</h3>
                    <Box
                        style={{
                            display: 'flex'
                        }}
                    >
                        <Box
                            style={{
                                width: '25%',
                                marginRight: '20px',
                            }}
                        >
                            <Box
                                style={{
                                    minWidth: '100%',
                                    background: '#FFFFFF',
                                    border: '1px solid #E6E8EC',
                                    borderRadius: '4px',
                                    minHeight: '120px',
                                    display: (selectedFile || imageUrl) !== null ? 'flex' : 'none',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10px',

                                }}
                            >
                                <img src={selectedFile !== null ? URL.createObjectURL(selectedFile) : imageUrl}
                                    style={{
                                        width: '80%',
                                        minHeight: '96px',
                                    }}
                                />
                            </Box>

                            <Box
                                style={{
                                    height: '48px',
                                    width: '100%',
                                    background: '#FFFFFF',
                                    border: '1px solid #EBEAED',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}
                            >
                                <img src={IconEye}
                                    style={{
                                        width: '12%',
                                        paddingLeft: '10px'
                                    }}
                                />
                                <hr
                                    style={{
                                        border: 'none',
                                        background: '#EBEAED',
                                        height: '25px',
                                        width: '1px',
                                        margin: '0'
                                    }}
                                />
                                <img src={IconDelete}
                                    style={{
                                        width: '8%',
                                        paddingRight: '10px'
                                    }}
                                    onClick={() => {
                                        setSelectedFile(null);
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '25%',
                                background: '#FFFFFF',
                                border: '1px dashed #E6E8EC',
                                borderRadius: '4px',
                                height: '120px',
                            }}
                            onClick={handleLoadFile}
                        >
                            <img src={IconPicture}
                                style={{
                                    width: '15%'
                                }}
                            />
                            <p
                                style={{
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    textAlign: 'center',
                                    color: '#2BA84A',
                                    margin: '20px 0 0 0',
                                }}
                            >Browse image..</p>
                        </Box>
                    </Box>
                </Box>

                <Button variant="contained" color="success"
                    style={{
                        width: '100%',
                        marginTop: '30px',
                        background: '#2BA84A',
                        borderRadius: '4px',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#FCFCFD',
                        height: '48px',
                    }}
                    onClick={Nextstep}
                >
                    {loading ? <CircularProgress
                        style={{
                            color: 'white',
                            scale: '0.7'
                        }}
                    /> : <span>{mode !== "Update" ? "Create new voucher" : "Update voucher"}</span>}

                </Button>
            </Box>
        </Box>
    );
}