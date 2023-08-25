import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BoxStyle = styled(Box)({
    background: 'white',
    borderRadius: '10px',
    boxShadow: '#80808030 0px 0px 2px 1px',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
})

export const BoxStatusStyle = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '10px 0',
    borderRadius: '6px',
    color: '#65676b',
    gap: '8px',
    ':hover': {
        background: '#80808021'
    }
})

export const AvatarStyle = styled('img')({
    width: '40px',
    height: '40px',
    borderRadius: '50%'
})

export const PStyleTitle = styled('p')({
    fontSize: '18px',
    fontWeight: '550',
})

export const BoxStyleTitle = styled(Box)({
    display: 'flex',
    gap: '7px',
    color: '#77c271',
    alignItems: 'center'
})

export const BoxStyleMainTitle = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
})

export const PStyleContent = styled('p')({
    ':hover': {
        textDecoration: 'underline',
        cursor: 'pointer'
    }
})



