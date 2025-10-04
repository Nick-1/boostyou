import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        boostyou: Palette['primary']; // можна наслідувати структуру від primary
    }

    interface PaletteOptions {
        boostyou?: PaletteOptions['primary'];
    }
}
