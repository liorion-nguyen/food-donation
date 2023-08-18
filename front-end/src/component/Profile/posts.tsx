import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { BoxStyle } from "../../StyleComponent/Profile";
import { useState } from "react";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import live from '@mui/icons-material/House';
import workplace from '@mui/icons-material/Work';
import school from '@mui/icons-material/School';
import country from '@mui/icons-material/LocationOn';

export default function Posts() {
    const User = {
        bio: "Xin chao tat ca moi nguoi",
        information: [
            {
                icon: workplace,
                content: "Teacher at Mindx School",
            },
            {
                icon: school,
                content: "Studied at Hanoi Pedagogical University"
            },
            {
                icon: live,
                content: "32 Pho Vien, HaNoi"
            },
            {
                icon: country,
                content: "Nghi Xuan, Ha Tinh"
            },
        ],
        image: [
            "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
            "https://i.pinimg.com/736x/f7/4c/2c/f74c2c1d36987fd5246c1899e3db110b.jpg",
        ]
    }
    const [inpBio, setInpBio] = useState(User.bio)
    const [modeBio, setModeBio] = useState(false)

    return (
        <Box
            sx={{
                width: '70vw',
                margin: '0 15vw',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    width: '40%',
                    margin: '20px',
                    gap: '15px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <BoxStyle
                    sx={{
                        gap: '15px',
                        justifyContent: 'space-between'
                    }}
                >
                    <h3
                        style={{
                            fontSize: '23px',
                            margin: '0'
                        }}
                    >Introduce</h3>
                    {
                        !modeBio ?
                            <Button
                                sx={{
                                    background: '#e4e6ea',
                                    color: 'black',
                                    fontWeight: '550',
                                }}
                                onClick={() => {
                                    setModeBio(!modeBio)
                                }}
                            >{inpBio === '' ? 'Add bio' : 'Change bio'}</Button> :
                            <Box>
                                <TextareaAutosize placeholder="description of the version"
                                    style={{
                                        width: '94%',
                                        border: '1px solid #ccd0d4',
                                        height: '70px',
                                        borderRadius: '10px',
                                        padding: '3%',
                                        resize: 'none',
                                        background: '#e4e6e9',
                                        fontSize: '16px'
                                    }}
                                    value={inpBio}
                                    onChange={(e) => {
                                        setInpBio(e.target.value)
                                    }}
                                ></TextareaAutosize>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'end'
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            setModeBio(!modeBio)
                                            setInpBio(User.bio)
                                        }}
                                    >Cancel</Button>
                                    <Button disabled={inpBio === User.bio}>
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                    }
                    {
                        User.information.map((information: any, index: number) => (
                            <Box key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <information.icon
                                    sx={{
                                        color: '#8a939e',
                                        marginRight: '10px'
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: '15px'
                                    }}
                                >{information.content}</p>
                            </Box>
                        ))
                    }


                    <Button
                        sx={{
                            background: '#e4e6ea',
                            color: 'black',
                            fontWeight: '550',
                        }}
                    >Detailed editing</Button>
                    <Button
                        sx={{
                            background: '#e4e6ea',
                            color: 'black',
                            fontWeight: '550',
                        }}
                    >More hobbies</Button>

                    <Button
                        sx={{
                            background: '#e4e6ea',
                            color: 'black',
                            fontWeight: '550',
                        }}
                    >Edit Notables</Button>
                </BoxStyle>

                <BoxStyle
                    sx={{
                        gap: '15px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'end'
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '23px',
                                margin: '0'
                            }}
                        >Picture</h3>
                        <p
                            style={{
                                color: '#366bd1'
                            }}
                        >See all photos</p>
                    </Box>
                    <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={150}>
                        {User.image.map((item) => (
                            <ImageListItem key={item}>
                                <img
                                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </BoxStyle>
            </Box>
            <Box
                sx={{
                    width: '58%',
                    padding: '20px',
                }}
            >

            </Box>
        </Box>
    );
}