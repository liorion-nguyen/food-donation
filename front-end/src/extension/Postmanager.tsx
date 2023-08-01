import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, FormControl, Grid, MenuItem, Select, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { DialogHomeActions } from '../store/DialogHome';
import { IConFormatText } from '../StyleComponentMui';
import { alertActions } from '../store/alert';
import { DataHomeActions } from '../store/DataHome';
import { createPostmanagers, updatePostmanagers } from '../API/postmanager/postmanager.api';

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
import { LoadingActions } from '../store/loading';

export default function Postmanager() {
    const postmanagers = useSelector((state: any) => state.dialog.data)
    const mode = postmanagers.mode;
    const data = postmanagers.data;

    const [inpTitle, setInpTitle] = useState(data.title || "")
    const [inpRasing, setInpRasing] = useState(data.rasing || "")
    const [inpType, setInpType] = useState(data.type || "USD")
    const [inpLocation, setInpLocation] = useState(data.location || "")
    const [inpAddress, setInpAddress] = useState(data.address || "")
    const [inpDescription, setInpDescription] = useState(data.description || "")
    const [imageUrl, setImageUrl] = useState(data.imgTitle || "");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const check_postmanagers = useSelector((state: any) => state.dataHome.Postmanager);

    const getDate = () => {
        const date = new Date();

        const time = `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
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

        if ((selectedFile !== null || imageUrl !== "") && inpTitle !== "" && inpRasing !== "" && inpLocation !== "" && inpDescription !== "" && inpAddress !== "") {
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

                            const response = await createPostmanagers({
                                imgTitle: downloadURL,
                                title: inpTitle,
                                rasing: inpRasing,
                                type: inpType,
                                location: inpLocation,
                                address: inpAddress,
                                description: inpDescription,
                                releaseDate: getDate(),
                                status: 'Online'
                            });
                            dispatch(DataHomeActions.getPostmanager());
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

                            const response = await updatePostmanagers(data._id, {
                                imgTitle: downloadURL,
                                title: inpTitle,
                                rasing: inpRasing,
                                type: inpType,
                                location: inpLocation,
                                address: inpAddress,
                                description: inpDescription,
                                releaseDate: getDate(),
                                status: 'Online'
                            })
                            dispatch(DataHomeActions.getPaymentrecord());
                        }
                    );
                }
                else {
                    dispatch(LoadingActions.showLoading());
                    const update = async () => {
                        const response = await updatePostmanagers(data._id, {
                            imgTitle: imageUrl,
                            title: inpTitle,
                            rasing: inpRasing,
                            type: inpType,
                            location: inpLocation,
                            address: inpAddress,
                            description: inpDescription,
                            releaseDate: getDate(),
                            status: 'Online'
                        })
                        dispatch(DataHomeActions.getPaymentrecord());
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
            }, 2000)
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
                >Add new post</h3>
            </Box>
            <p
                style={{
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '22px',
                }}
            >Post Information</p>
            <Box>
                <p
                    style={{
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#504F54',
                    }}
                >Title</p>
                <input type="text" placeholder="Crawford Room, Mortlock Wing...."
                    style={{
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1px solid #EBEAED',
                        borderRadius: '4px',
                        height: '48px',
                        padding: '0 0 0 10px',
                    }}
                    value={inpTitle}
                    onChange={(e) => {
                        setInpTitle(e.target.value)
                    }}
                />
            </Box>
            <Box>
                <p
                    style={{
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#504F54',
                    }}
                >Rasing</p>
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <input type="number" placeholder="1000"
                        style={{
                            width: '81%',
                            background: '#FFFFFF',
                            border: '1px solid #EBEAED',
                            borderRadius: '4px',
                            height: '48px',
                            padding: '0 0 0 10px',
                        }}
                        value={inpRasing}
                        onChange={(e) => {
                            setInpRasing(e.target.value)
                        }}
                    />
                    <FormControl sx={{
                        m: 1, width: '15%',
                        background: '#FFFFFF',
                        border: '1px solid #EBEAED',
                        borderRadius: '4px',
                        height: '48px',
                        margin: '0',
                        '.MuiOutlinedInput-notchedOutline': {
                            outline: 'none',
                            border: 'none',
                        }
                    }}
                    >
                        <Select
                            value={inpType}
                            onChange={(e) => {
                                setInpType(e.target.value)
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"VNĐ"}>VNĐ</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        style={{
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
                        >Location</p>
                        <FormControl sx={{
                            m: 1, width: '100%',
                            background: '#FFFFFF',
                            border: '1px solid #EBEAED',
                            borderRadius: '4px',
                            height: '48px',
                            margin: '0',
                            '.MuiOutlinedInput-notchedOutline': {
                                outline: 'none',
                                border: 'none',
                            }
                        }}
                        >
                            <Select
                                value={inpLocation}
                                onChange={(e) => {
                                    setInpLocation(e.target.value)
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={"Sydney"}>Sydney</MenuItem>
                                <MenuItem value={"Melbourne"}>Melbourne</MenuItem>
                                <MenuItem value={"Auckland"}>Auckland</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        style={{
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
                        >Address</p>
                        <FormControl sx={{
                            m: 1, width: '100%',
                            background: '#FFFFFF',
                            border: '1px solid #EBEAED',
                            borderRadius: '4px',
                            height: '48px',
                            margin: '0',
                            '.MuiOutlinedInput-notchedOutline': {
                                outline: 'none',
                                border: 'none',
                            }
                        }}
                        >
                            <Select
                                onChange={(e) => {
                                    setInpAddress(e.target.value)
                                }}
                                value={inpAddress}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={"Crawford Room, Mortlock ...."}>Crawford Room, Mortlock ....</MenuItem>
                                <MenuItem value={"Exhibition Hall, Cultural Center ..."}>Exhibition Hall, Cultural Center ...</MenuItem>
                                <MenuItem value={"Historical Heritage Museum, Art Gallery ..."}>Historical Heritage Museum, Art Gallery ...</MenuItem>
                            </Select>
                        </FormControl>
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
                                                width: '100%'
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
                                onChange={(e) => {
                                    setInpDescription(e.target.value)
                                }}
                                value={inpDescription}
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
                    /> : <span>{mode !== "Update" ? "Create new post" : "Update post"}</span>}

                </Button>
            </Box>
        </Box>
    );
}