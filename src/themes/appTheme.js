import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

export const appTheme = createTheme({
    typography: {
        fontFamily: [
            'Lexend'
        ]
    },
    palette: {
        primary: orange,
        mode: 'dark',
        background: {
            default: "#222222"
        }
    }
});