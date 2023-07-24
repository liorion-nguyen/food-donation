import styled from "@emotion/styled"
import { Box } from "@mui/material"

export const SpanFirst = styled('span')({
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '150%',
    color: '#2BA84A',
})

export const SpanLast = styled('span')({
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '150%',
    color: '#141416',
})

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
