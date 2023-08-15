import { styled as muiStyled } from '@mui/system';

export const StyleTitleHeader = muiStyled('p')(({ theme }) => ({
    margin: '0',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
}));

export const StyleTitleLogo = muiStyled('h3')(({ theme }) => ({
    margin: '0 0 0 10px',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: '22px',
    lineHeight: '150%',
    color: '#2BA84A',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '18px'
    },
})); 

export const StyleImgLogo = muiStyled('img')(({ theme }) => ({
    width: '25%',
    [theme.breakpoints.down('sm')]: {
        width: '60%'
    },
}));