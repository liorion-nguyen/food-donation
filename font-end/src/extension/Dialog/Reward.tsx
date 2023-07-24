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
import { DataHomeActions } from '../../store/DataHome';
import { alertActions } from '../../store/alert';
import { createRewards } from '../../API/Api';

export default function Reward() {
    const [inputData, setInputData] = useState({
        VoucherName: "",
        ExpiredDate: "",
        VoucherCode: "",
        Description: "",
    })
    const [chossePicture, setChossePicture] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(DialogHomeActions.hideDialog());
    };

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
            setChossePicture(true);
        };
        fileInput.click();
    };
    const [fontFamily, setFontFamily] = useState("Headline 1");
    const handleSelector = (event: any) => {
        setFontFamily(event.target.value);
    };
    const Nextstep = async () => {
        setLoading(true)
        if (selectedFile !== null && inputData.Description !== "" && inputData.ExpiredDate !== "" && inputData.VoucherCode !== "" && inputData.VoucherName !== "") {
            createRewards({
                "imgInformation": "IMG",
                "information": inputData.VoucherName,
                "expiredDate": inputData.ExpiredDate,
                "activeDate": getDate(),
                "status": "Active",
            })
            dispatch(DataHomeActions.getReward());
            dispatch(alertActions.showAlert());
            dispatch(alertActions.setColorGreen());
            dispatch(alertActions.setContentAlert('Thêm thông tin thành công!'));
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
                    onChange={(e) => {
                        let d = inputData
                        d.VoucherName = e.target.value
                        setInputData(d);
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
                            onChange={(e) => {
                                let d = inputData
                                d.ExpiredDate = e.target.value
                                setInputData(d);
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
                            onChange={(e) => {
                                let d = inputData
                                d.VoucherCode = e.target.value
                                setInputData(d);
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
                                onChange={(e) => {
                                    let d = inputData
                                    d.Description = e.target.value
                                    setInputData(d);
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
                    /> : <span>Create new voucher</span>}

                </Button>
            </Box>
        </Box>
    );
}