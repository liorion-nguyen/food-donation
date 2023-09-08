import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { all } from "axios"

export const BoxPostmanger = styled(Box)({
    width: '100%',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
})

export const PPostmanger = styled('p')({
    fontFamily: "'Inter', sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#141416",
    margin: '0',
})

export const IConFormatText = styled('img')({
    width: '22%'
})

export const StyleSelectP = styled('p')({
    fontSize: '17px',
    margin: '0'
})

export const StyleSelectBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px 0'
})

export const StylePMain = styled('p')({
    margin: '0',
    color: '#dd8181',
    fontWeight: 600,
})

export const StylePExtra = styled('p')({
    margin: '0',
    color: '#5f5c5c'
})

export const StyleBoxMain = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '7px 0'
})

export const StyleImgIcon = styled('img')({
    width: '40px',
    height: '40px',
    ':hover': {
        scale: '1.3',
        transition: 'transform 0.3s',
    }
})

export const StyleImgIcon2 = styled('img')({
    width: '23px',
    height: '23px',
})

export const StyleImgIcon3 = styled('img')({
    width: '18px',
    height: '18px',
})