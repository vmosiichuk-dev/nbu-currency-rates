import { useTheme } from '@mui/material';
import { capitalize } from '@utils/capitalize.js';

export const usePalette = () => {
    const paletteColors = {};
    const theme = useTheme();

    for (const [color, colorVariants] of Object.entries(theme.palette.custom)) {
        for (const [colorVariant, value] of Object.entries(colorVariants)) {
            const colorName = color + capitalize(colorVariant);
            paletteColors[colorName] = value;
        }
    }

    return paletteColors;
};
