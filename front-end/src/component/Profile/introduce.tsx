import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { BoxStyle, BoxStyleMainTitle, BoxStyleTitle, PStyleContent, PStyleTitle } from '../../StyleComponent/Profile';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Input } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUsers } from '../../API/user/user.api';
import { alertActions } from '../../store/alert';
import { userActions } from '../../store/user';

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
    const user = useSelector((state: any) => state.user.user)
    const [users, setUsers] = useState(user);

    const [inpFullname, setInpFullname] = useState(users.fullname)
    const [inpUsername, setInpUsername] = useState(users.username)
    const [inpContact, setInpContact] = useState(users.contact)

    const [value, setValue] = useState(4);

    const [editFullname, setEditFullname] = useState(false)
    const [editUsername, setEditUsername] = useState(false)
    const [editContact, setEditContact] = useState(false)

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
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                            </TabPanel>
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
                        </BoxStyle>
                    </Box>
                )
            }
        </>

    );
}