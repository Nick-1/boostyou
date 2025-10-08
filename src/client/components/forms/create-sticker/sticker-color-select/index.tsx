import { useEffect, useState } from 'react';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { ColorCode, ColorName } from '../../../../enum';
import ColorMarker from '../../../color-marker';

export interface colorSelectOptionsItem {
    value: ColorName;
    markerColor: ColorCode,
    label: string,
}

interface StickerColorProps {
    list: colorSelectOptionsItem[];
    name: string;
    defaultValue: ColorName;
    onChange: (e: any) => void,
}

interface ColorProps {
    value: string;
    name: string;
}

const StickerColorSelect = (props: StickerColorProps) => {
    const { list, name, defaultValue, onChange } = props;
    const [color, setColor] = useState<ColorProps>({ value: defaultValue, name });

    useEffect(() => {
        setColor(prev => ({ ...prev, value: defaultValue }));
    }, [defaultValue]);

    const handleChange = (e: any) => {
        const newValue = e.target.value as string;

        setColor(prev => ({ ...prev, value: newValue }));
        onChange(e);
    };

    return (
        <>
            <InputLabel id="sticker-color-label">Sticker color</InputLabel>
            <Select
                labelId="sticker-color-label"
                id="stickerColor"
                name={color.name}
                size="small"
                value={color.value}
                onChange={handleChange}
                label="Sticker color"
            >
                {
                    list.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            <ColorMarker color={item.markerColor} label={item.label} />
                        </MenuItem>
                    ))
                }
            </Select>
        </>
    )
}

export default StickerColorSelect;
