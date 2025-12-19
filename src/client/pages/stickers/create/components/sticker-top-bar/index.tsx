import type { FC } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import {ColorSchemaPickerPopover} from '../color-picker-popover';

import './style.scss';

type Props = {
    colorSchema: number;
    onColorSchemaChange: (next: number) => void;
};

export const StickerTopBar: FC<Props> = ({ colorSchema, onColorSchemaChange }) => {
    return (
        <Paper
            className="schema-picker-container"
            elevation={0}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    Scheme
                </Typography>

                <ColorSchemaPickerPopover value={colorSchema} onChange={onColorSchemaChange} />
            </Box>

            {/* тут потім додаси інші контролли */}
        </Paper>
    );
};
