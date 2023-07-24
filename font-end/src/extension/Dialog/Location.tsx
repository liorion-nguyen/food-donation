import FormatListTich from '../../Images/FormatListTich.svg';
import FormatListNumber from '../../Images/FormatListNumber.svg';
import FormatListDot from '../../Images/FormatListDot.svg';
import Picture from '../../Images/Picture.svg';
import code from '../../Images/code.svg';
import format_quote from '../../Images/format_quote.svg';
import AddLink from '../../Images/AddLink.svg';
import format_underlined from '../../Images/format_underlined.svg';
import format_strikethrough from '../../Images/format_strikethrough.svg';
import format_bold from '../../Images/format_bold.svg';
import format_lean from '../../Images/format_lean.svg';
import { IConFormatText } from '../../StyleComponentMui';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import IconPicture from '../../Images/IconPicture.svg'
import Home_Readew from '../../Images/Home_ReadNew1.png'
import IconEye from '../../Images/IconEye.svg'
import IconDelete from '../../Images/IconDelete.svg';
import { useDispatch, useSelector } from 'react-redux';
import { DialogHomeActions } from '../../store/DialogHome';
import { Box, Button, CircularProgress, FormControl, Grid, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { alertActions } from '../../store/alert'
import { DataHomeActions } from '../../store/DataHome';
import { createLocations, getLocations, updateLocations } from '../../API/location/location.api';

export default function Location() {
    const locations = useSelector((state: any) => state.dialog.data)
    const mode = locations.mode;
    const data = locations.data;
    const [inpLocation, setInpLocation] = useState(data.location)
    const [inpAddress, setInpAddress] = useState(data.address)
    const [inpDescription, setInpDescription] = useState(data.description)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const getDate = () => {
        const date = new Date();
      
        const time = `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
        return time;
      };
    
    const [selectedFile, setSelectedFile] = useState(null);

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
        if (selectedFile !== null && inpLocation !== "" && inpAddress !== "" && inpDescription !== "") {
            if (mode !== "Update") {
                const response = await createLocations({
                    imgAddress: "https://sgv.edu.vn/uploads/images/info/doraemon-trong-tieng-trung-la-gi.png",
                    address: inpAddress,
                    location: inpLocation,
                    addedDate: getDate(),
                    description: inpDescription,
                    status: "Active"
                })
                const fetchData = async () => {
                    const dataListLocations = await getLocations();
                    setLoading(false)
                };

            }
            else {
                const response = await updateLocations(data._id, {
                    imgAddress: "IMG",
                    address: inpAddress,
                    location: inpLocation,
                    addedDate: getDate(),
                    description: inpDescription,
                    status: "Active"
                })
                const fetchData = async () => {
                    const dataListLocations = await getLocations();
                    setLoading(false)
                };

            }
            dispatch(DataHomeActions.getLocation())
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
            }, Math.random() * 200)
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
                >{mode !== "Update" ? "Add new location" : "Update location"}</h3>
            </Box>
            <p
                style={{
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '22px',
                }}
            >Location Information</p>
            <Box>
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
            <Box>
                <p
                    style={{
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#504F54',
                    }}
                >Address</p>
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <input type="text" placeholder="Crawford Room, Mortlock Wing...."
                        style={{
                            width: '100%',
                            background: '#FFFFFF',
                            border: '1px solid #EBEAED',
                            borderRadius: '4px',
                            height: '48px',
                            padding: '0 0 0 10px',
                            fontSize: '16px'
                        }}
                        onChange={(e) => {
                            setInpAddress(e.target.value)
                        }}
                        value={inpAddress}
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
                                placeholder='Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
                                onChange={(e) => {
                                    setInpDescription(e.target.value)
                                }}
                                value={inpDescription}
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
                                    display: selectedFile !== null ? 'flex' : 'none',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '10px',

                                }}
                            >
                                <img src={selectedFile !== null ? URL.createObjectURL(selectedFile) : Home_Readew}
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
                    /> : <span>{mode !== "Update" ? "Create new location" : "Update location"}</span>}

                </Button>
            </Box>
        </Box>
    );
}