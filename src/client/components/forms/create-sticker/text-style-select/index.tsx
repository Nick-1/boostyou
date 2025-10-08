import { useEffect, useState } from 'react';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { TextStyle } from '../../../../enum';

export interface textStyleSelectOptionsItem {
    value: TextStyle;
    label: string,
}

interface StickerColorProps {
    list: textStyleSelectOptionsItem[];
    defaultValue?: TextStyle;
    onChange: (e: any) => void,
}

interface ColorProps {
    value: string;
    name: string;
}

const TextStyleStickerSelect = (props: StickerColorProps) => {
    const { list, defaultValue, onChange } = props;
    const [style, setStyle] = useState<ColorProps>({ value: defaultValue || TextStyle.NORMAL, name: 'textStyle' });

    useEffect(() => {
        if (defaultValue) {
            setStyle(prev => ({ ...prev, value: defaultValue }));
        }
    }, [defaultValue]);

    const handleChange = (e: any) => {
        const newValue = e.target.value as string;

        setStyle(prev => ({ ...prev, value: newValue }));
        onChange(e);
    };

    return (
        <>
            <InputLabel id="text-style-label">Text style</InputLabel>
            <Select
                labelId="text-style-label"
                id="textStyle"
                name={style.name}
                size="small"
                value={style.value}
                onChange={handleChange}
                label="Text style"
            >
                {
                    list.map((item) => (
                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                    ))
                }
            </Select>
        </>
    )
}

export default TextStyleStickerSelect;
