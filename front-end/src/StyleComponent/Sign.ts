import { styled as muiStyled } from '@mui/system';

export const StyleImgWolrd = muiStyled('img')(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        width: '65%',
    },
}));
