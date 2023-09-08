import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { BoxStyle, BoxStyleMainTitle, BoxStyleTitle, PStyleContent, PStyleTitle } from '../../StyleComponent/Profile';
import EditIcon from '@mui/icons-material/Edit';
import { Button, FormControl, FormControlLabel, FormLabel, Input, InputLabel, NativeSelect, Radio, RadioGroup } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUsers } from '../../API/user/user.api';
import { alertActions } from '../../store/alert';
import { userActions } from '../../store/user';
import Province from './province';
import { profileActions } from '../../store/profile';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{
                width: '100%'
            }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Introduce() {
    const dispatch = useDispatch();
    const [value, setValue] = useState(4);
    const user = useSelector((state: any) => state.user.user)
    const [users, setUsers] = useState(user);

    const [inpFullname, setInpFullname] = useState(users.fullname)
    const [inpUsername, setInpUsername] = useState(users.username)
    const [inpContact, setInpContact] = useState(users.contact)

    const [editFullname, setEditFullname] = useState(false)
    const [editUsername, setEditUsername] = useState(false)
    const [editContact, setEditContact] = useState(false)

    const [inpJob, setInpJob] = useState(users.information.Work)
    const [inpEducation, setInpEducation] = useState(users.information.Education)

    const [editJob, setEditJob] = useState(false)
    const [editEducation, setEditEducation] = useState(false)

    const [editRelationship, setEditRelationship] = useState(false)
    const [editGender, setEditGender] = useState(false)
    const [editDatebird, setEditDatebird] = useState(false)

    const [inpRelationship, setInpRelationship] = useState(users.information.Relationship)
    const [inpGender, setInpGender] = useState(users.information.Gender)
    const [inpDatebird, setInpDatebird] = useState(users.information.Datebird)

    useEffect(() => {
        setUsers(user)
        setInpUsername(users.username);
        setInpContact(users.contact)
        setInpFullname(users.fullname)
    }, [user, inpUsername])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleUpdate = async () => {
        let Updateuser = { ...users };
        Updateuser.fullname = inpFullname;
        Updateuser.username = inpUsername;
        Updateuser.contact = inpContact;
        try {
            await updateUsers(users._id, Updateuser);
            const user = await getUser(users._id);
            dispatch(userActions.setUser(user))
            dispatch(alertActions.setColorGreen());
            dispatch(alertActions.setContentAlert(`Cập nhật thông tin thành công!`));
            dispatch(alertActions.showAlert());
        } catch (error) {
            dispatch(alertActions.setColorWrong());
            dispatch(alertActions.setContentAlert(`Cập nhật thông tin khong thành công!`));
            dispatch(alertActions.showAlert());
        }
    }

    return (
        <>
            {
                users.username === "" || users.username === "undefined" ? (
                    <p>{users.username}</p>
                ) : (
                    <Box
                        sx={{
                            width: '70vw',
                            margin: '20px 15vw',
                            display: 'flex',
                        }}
                    >
                        <BoxStyle
                            sx={{
                                flexDirection: 'row !important',
                                width: '100%'
                            }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider', width: '30%' }}
                            >
                                <Tab label="Overview" {...a11yProps(0)} />
                                <Tab label="Word and education" {...a11yProps(1)} />
                                <Tab label="Where I used to live" {...a11yProps(2)} />
                                <Tab label="Details about you" {...a11yProps(3)} />
                                <Tab label="Edit village information" {...a11yProps(3)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '96%',
                                        padding: '0 5%',
                                        gap: '20px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        }}
                                    >
                                        <PStyleTitle>Gender</PStyleTitle>
                                        <BoxStyleMainTitle>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <FormControl
                                                    sx={{
                                                        display: users.information.Gender !== '' || editGender ? 'block' : 'none'
                                                    }}
                                                >
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'row'
                                                        }}
                                                        onChange={(e) => {
                                                            setInpGender(e.target.value)
                                                        }}
                                                    >
                                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <BoxStyleTitle
                                                    onClick={() => {
                                                        setEditGender(true)
                                                    }}
                                                >
                                                    <AddCircleOutlineIcon
                                                        sx={{
                                                            fontSize: '27px'
                                                        }}
                                                    />
                                                    <PStyleContent>{users.information.Gender === '' ? 'Add Current Gender' : 'Change Current Gender'}</PStyleContent>
                                                </BoxStyleTitle>
                                            </Box>
                                        </BoxStyleMainTitle>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        }}
                                    >
                                        <PStyleTitle>Date of birth</PStyleTitle>
                                        <BoxStyleMainTitle>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Controlled picker"
                                                        value={inpDatebird}
                                                        onChange={(e) => {
                                                            const formattedDate = format(e.$d, 'dd/MM/yyyy');
                                                            setInpDatebird(formattedDate)
                                                        }}
                                                        sx={{
                                                            display: users.information.Datebird !== '' || editDatebird ? 'block' : 'none',
                                                            maxWidth: '50%',
                                                            width: '50%',
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                                <BoxStyleTitle
                                                    onClick={() => {
                                                        setEditDatebird(true)
                                                    }}
                                                >
                                                    <AddCircleOutlineIcon
                                                        sx={{
                                                            fontSize: '27px'
                                                        }}
                                                    />
                                                    <PStyleContent>{users.information.Datebird === '' ? 'Add Current Date of birth' : 'Change Current Date of birth'}</PStyleContent>
                                                </BoxStyleTitle>
                                            </Box>
                                        </BoxStyleMainTitle>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        }}
                                    >
                                        <PStyleTitle>Relationship</PStyleTitle>
                                        <BoxStyleMainTitle>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <FormControl
                                                    sx={{
                                                        maxWidth: '50%',
                                                        width: '50%',
                                                        display: users.information.Relationship !== '' || editRelationship ? 'block' : 'none'
                                                    }}
                                                >
                                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                        Relationship
                                                    </InputLabel>
                                                    <NativeSelect
                                                        defaultValue={user.information.Relationship}
                                                        inputProps={{
                                                            name: 'Relationship',
                                                            id: 'uncontrolled-native',
                                                        }}
                                                        onChange={(e) => {
                                                            setInpRelationship(e.target.value)
                                                        }}
                                                    >
                                                        <option value={'none'}>Status</option>
                                                        <option value={'Dating'}>Dating</option>
                                                        <option value={'Single'}>Single</option>
                                                        <option value={'Marry'}>Marry</option>
                                                        <option value={'Engaged'}>Engaged</option>
                                                        <option value={'Live together'}>Live together</option>
                                                        <option value={'Learn about'}>Learn about</option>
                                                        <option value={'Divorced'}>Divorced</option>
                                                        <option value={'Widow'}>Widow</option>
                                                        <option value={'Separated'}>Separated</option>
                                                        <option value={'There is a complicated relationship'}>There is a complicated relationship</option>
                                                        <option value={'Registered'}>Registered</option>
                                                        <option value={'Cohabitation'}>Cohabitation</option>
                                                                 
                                                    </NativeSelect>
                                                </FormControl>
                                                <BoxStyleTitle
                                                    onClick={() => {
                                                        setEditRelationship(true)
                                                    }}
                                                >
                                                    <AddCircleOutlineIcon
                                                        sx={{
                                                            fontSize: '27px'
                                                        }}
                                                    />
                                                    <PStyleContent>{users.information.Relationship === '' ? 'Add Current Relationship' : 'Change Current Relationship'}</PStyleContent>
                                                </BoxStyleTitle>
                                            </Box>
                                        </BoxStyleMainTitle>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: editGender || editDatebird || editRelationship ? 'flex' : 'none',
                                            justifyContent: 'end'
                                        }}
                                    >
                                        <Button
                                            onClick={() => {
                                                setEditRelationship(false)
                                                setEditGender(false)
                                                setEditDatebird(false)
                                            }}
                                        >Cancel</Button>
                                        <Button disabled={inpRelationship === users.information.Relationship && inpDatebird === users.information.Datebird && inpGender === users.information.Gender}
                                            onClick={async () => {
                                                const updatedUser = { ...user };
                                                if (inpGender !== user.information.Gender) {
                                                    updatedUser.information = { ...updatedUser.information, Gender: inpGender };
                                                }
                                                if (inpDatebird !== user.information.Datebird) {
                                                    updatedUser.information = { ...updatedUser.information, Datebird: inpDatebird };
                                                }
                                                if (inpRelationship !== user.information.Relationship) {
                                                    updatedUser.information = { ...updatedUser.information, Relationship: inpRelationship };
                                                }
                                                await updateUsers(user._id, updatedUser);
                                                const users = await getUser(updatedUser._id);
                                                dispatch(userActions.setUser(users))
                                                dispatch(alertActions.setColorGreen());
                                                dispatch(alertActions.setContentAlert(`Cập nhật thông tin thành công!`));
                                                dispatch(alertActions.showAlert());
                                                setEditRelationship(false)
                                                setEditGender(false)
                                                setEditDatebird(false)
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Box>

                            </TabPanel>

                            <TabPanel value={value} index={1}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '96%',
                                        padding: '0 2%',
                                        gap: '25px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        }}
                                    >
                                        <PStyleTitle>Job</PStyleTitle>
                                        <BoxStyleMainTitle>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Input disabled={!editJob} defaultValue={user.information.Work}
                                                    sx={{
                                                        maxWidth: '50%',
                                                        width: '50%',
                                                        display: users.information.Work !== '' || editJob ? 'block' : 'none'
                                                    }}
                                                    onChange={(e) => {
                                                        setInpJob(e.target.value)
                                                    }}
                                                />
                                                <BoxStyleTitle
                                                    onClick={() => {
                                                        setEditJob(true)
                                                    }}
                                                >
                                                    <AddCircleOutlineIcon
                                                        sx={{
                                                            fontSize: '27px'
                                                        }}
                                                    />
                                                    <PStyleContent>{users.information.Work === '' ? 'Add Current Work' : 'Change Current Work'}</PStyleContent>
                                                </BoxStyleTitle>
                                            </Box>
                                        </BoxStyleMainTitle>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        }}
                                    >
                                        <PStyleTitle>Schools</PStyleTitle>
                                        <BoxStyleMainTitle>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Input disabled={!editEducation} defaultValue={user.information.Education}
                                                    sx={{
                                                        maxWidth: '50%',
                                                        width: '50%',
                                                        display: users.information.Education !== '' || editEducation ? 'block' : 'none'
                                                    }}
                                                    onChange={(e) => {
                                                        setInpEducation(e.target.value)
                                                    }}
                                                />
                                                <BoxStyleTitle
                                                    onClick={() => {
                                                        setEditEducation(true)
                                                    }}
                                                >
                                                    <AddCircleOutlineIcon
                                                        sx={{
                                                            fontSize: '27px'
                                                        }}
                                                    />
                                                    <PStyleContent>{users.information.Education === '' ? 'Add Current Schools' : 'Change Current Schools'}</PStyleContent>
                                                </BoxStyleTitle>
                                            </Box>
                                        </BoxStyleMainTitle>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: editJob || editEducation ? 'flex' : 'none',
                                            justifyContent: 'end'
                                        }}
                                    >
                                        <Button
                                            onClick={() => {
                                                setEditJob(false)
                                                setEditEducation(false)
                                            }}
                                        >Cancel</Button>
                                        <Button disabled={inpJob === users.information.Work && inpEducation === users.information.Education}
                                            onClick={async () => {
                                                const updatedUser = { ...user };
                                                if (inpJob !== user.information.Work) {
                                                    updatedUser.information = { ...updatedUser.information, Work: inpJob };
                                                }
                                                if (inpEducation !== user.information.Education) {
                                                    updatedUser.information = { ...updatedUser.information, Education: inpEducation };
                                                }
                                                console.log(updatedUser);
                                                await updateUsers(user._id, updatedUser);
                                                const users = await getUser(updatedUser._id);
                                                dispatch(userActions.setUser(users))
                                                dispatch(alertActions.setColorGreen());
                                                dispatch(alertActions.setContentAlert(`Cập nhật thông tin thành công!`));
                                                dispatch(alertActions.showAlert());
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Box>

                                </Box>
                            </TabPanel>

                            <TabPanel value={value} index={2}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '96%',
                                        padding: '0 2%',
                                        gap: '25px'
                                    }}
                                >
                                    <PStyleTitle>Where I used to live</PStyleTitle>
                                    <BoxStyleMainTitle>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: users.information.Live !== '' ? 'block' : 'none'
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        color: '#4caf50',
                                                        fontWeight: '500'
                                                    }}
                                                >{users.information.Live}</h3>
                                                <p
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#4f4b4b96'
                                                    }}
                                                >Current province/city</p>
                                            </Box>
                                            <BoxStyleTitle
                                                onClick={() => {
                                                    dispatch(profileActions.GetProvince({
                                                        open: true,
                                                        mode: "live"
                                                    }))
                                                }}
                                            >
                                                <AddCircleOutlineIcon
                                                    sx={{
                                                        fontSize: '27px'
                                                    }}
                                                />
                                                <PStyleContent>{users.information.Live === '' ? 'Add Current Residence' : 'Change Current Residence'}</PStyleContent>
                                            </BoxStyleTitle>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: users.information.Countryside !== '' ? 'block' : 'none'
                                                }}
                                            >
                                                <h3
                                                    style={{
                                                        color: '#4caf50',
                                                        fontWeight: '500'
                                                    }}
                                                >{users.information.Countryside}</h3>
                                                <p
                                                    style={{
                                                        fontSize: '14px',
                                                        color: '#4f4b4b96'
                                                    }}
                                                >Home town</p>
                                            </Box>
                                            <BoxStyleTitle
                                                onClick={() => {
                                                    dispatch(profileActions.GetProvince({
                                                        open: true,
                                                        mode: "countryside"
                                                    }))
                                                }}
                                            >
                                                <AddCircleOutlineIcon
                                                    sx={{
                                                        fontSize: '27px'
                                                    }}
                                                />
                                                <PStyleContent>{users.information.Countryside === '' ? 'Add Countryside' : 'Change Countryside'}</PStyleContent>
                                            </BoxStyleTitle>
                                        </Box>


                                    </BoxStyleMainTitle>
                                    <Province />


                                </Box>
                            </TabPanel >

                            <TabPanel value={value} index={3}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '96%',
                                        padding: '0 2%',
                                        gap: '25px'
                                    }}
                                >
                                    <BoxStyleMainTitle>
                                        <PStyleTitle>Introduce yourself</PStyleTitle>
                                        <BoxStyleTitle>
                                            <AddCircleOutlineIcon
                                                sx={{
                                                    fontSize: '27px'
                                                }}
                                            />
                                            <PStyleContent>Write something about yourself</PStyleContent>
                                        </BoxStyleTitle>
                                    </BoxStyleMainTitle>

                                    <BoxStyleMainTitle>
                                        <PStyleTitle>How to pronounce name</PStyleTitle>
                                        <BoxStyleTitle>
                                            <AddCircleOutlineIcon
                                                sx={{
                                                    fontSize: '27px'
                                                }}
                                            />
                                            <PStyleContent>More ways to pronounce names</PStyleContent>
                                        </BoxStyleTitle>
                                    </BoxStyleMainTitle>

                                    <BoxStyleMainTitle>
                                        <PStyleTitle>How to pronounce name</PStyleTitle>
                                        <BoxStyleTitle>
                                            <AddCircleOutlineIcon
                                                sx={{
                                                    fontSize: '27px'
                                                }}
                                            />
                                            <PStyleContent>Add nicknames, common names...</PStyleContent>
                                        </BoxStyleTitle>
                                    </BoxStyleMainTitle>

                                    <BoxStyleMainTitle>
                                        <PStyleTitle>Favorite Quote</PStyleTitle>
                                        <BoxStyleTitle>
                                            <AddCircleOutlineIcon
                                                sx={{
                                                    fontSize: '27px'
                                                }}
                                            />
                                            <PStyleContent>Add your favorite quote</PStyleContent>
                                        </BoxStyleTitle>
                                    </BoxStyleMainTitle>

                                    <BoxStyleMainTitle>
                                        <PStyleTitle>Blood Donation</PStyleTitle>
                                        <BoxStyleTitle>
                                            <AddCircleOutlineIcon
                                                sx={{
                                                    fontSize: '27px'
                                                }}
                                            />
                                            <PStyleContent>Learn about blood donation</PStyleContent>
                                        </BoxStyleTitle>
                                    </BoxStyleMainTitle>
                                </Box>
                            </TabPanel>

                            <TabPanel value={value} index={4}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '90%',
                                        padding: '0 5%',
                                        gap: '20px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                width: '15%'
                                            }}
                                        >
                                            <p>Full name</p>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '80%'
                                            }}
                                        >
                                            <Input disabled={!editFullname} defaultValue={inpFullname}
                                                sx={{
                                                    maxWidth: '90%',
                                                    width: 'inherit'
                                                }}
                                                onChange={(e) => {
                                                    setInpFullname(e.target.value)
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                color: '#868a8ce8',
                                                alignItems: 'center',
                                                gap: '8px',
                                                width: '5%',
                                                justifyContent: 'end'
                                            }}
                                            onClick={() => {
                                                setEditFullname(!editFullname)
                                            }}
                                        >
                                            <EditIcon />
                                            <p>Edit</p>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                width: '15%'
                                            }}
                                        >
                                            <p>User name</p>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '80%'
                                            }}
                                        >
                                            <Input disabled={!editUsername} defaultValue={inpUsername}
                                                sx={{
                                                    maxWidth: '90%',
                                                    width: 'inherit'
                                                }}
                                                onChange={(e) => {
                                                    setInpUsername(e.target.value)
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                color: '#868a8ce8',
                                                alignItems: 'center',
                                                gap: '8px',
                                                width: '5%',
                                                justifyContent: 'end'
                                            }}
                                            onClick={() => {
                                                setEditUsername(!editUsername)
                                            }}
                                        >
                                            <EditIcon />
                                            <p>Edit</p>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                width: '15%'
                                            }}
                                        >
                                            <p>Contact</p>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '80%'
                                            }}
                                        >
                                            <Input disabled={!editContact} defaultValue={inpContact}
                                                sx={{
                                                    maxWidth: '90%',
                                                    width: 'inherit'
                                                }}
                                                onChange={(e) => {
                                                    setInpContact(e.target.value)
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                color: '#868a8ce8',
                                                alignItems: 'center',
                                                gap: '8px',
                                                width: '5%',
                                                justifyContent: 'end'
                                            }}
                                            onClick={() => {
                                                setEditContact(!editContact)
                                            }}
                                        >
                                            <EditIcon />
                                            <p>Edit</p>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: editFullname || editUsername || editContact ? 'flex' : 'none',
                                            justifyContent: 'end'
                                        }}
                                    >
                                        <Button
                                            onClick={() => {
                                                setEditContact(false)
                                                setEditUsername(false)
                                                setEditFullname(false)
                                            }}
                                        >Cancel</Button>
                                        <Button disabled={inpContact === users.contact && inpFullname === users.fullname && inpUsername === users.username}
                                            onClick={handleUpdate}
                                        >
                                            Save
                                        </Button>
                                    </Box>

                                </Box>
                            </TabPanel>
                        </BoxStyle >
                    </Box >
                )
            }
        </>

    );
}