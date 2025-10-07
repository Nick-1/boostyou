// src/theme/index.ts
import { createTheme } from '@mui/material/styles';
import './mui.d.ts';

const theme = createTheme({
    palette: {
        primary: { main: '#015470' },
        secondary: { main: '#22c55e' },
        boostyou: {
            main: '#015470',
            light: '#0183af',
            dark: '#014860',
            contrastText: '#003554',
        },
    },
});

export default theme;
