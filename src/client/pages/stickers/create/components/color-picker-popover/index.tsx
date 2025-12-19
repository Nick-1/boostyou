import type { FC, MouseEvent } from 'react';
import { Box, IconButton, Popover, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';

type Schema = {
    id: number;
    label: string;
    // колір “превʼю” кругляша
    preview: string;
};

const SCHEMAS: Schema[] = [
    { id: 1, label: 'Schema 1', preview: 'yellowgreen' },
    { id: 2, label: 'Schema 2', preview: 'aqua' },
    // додаси ще
];

type Props = {
    value: number;
    onChange: (next: number) => void;
};

export const ColorSchemaPickerPopover: FC<Props> = ({ value, onChange }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const open = Boolean(anchorEl);
    const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const current = useMemo(
        () => SCHEMAS.find((s) => s.id === value) ?? SCHEMAS[0],
        [value]
    );

    return (
        <>
            <Tooltip title="Color scheme" placement="bottom">
                <IconButton size="small" onClick={handleOpen} aria-label="Color scheme">
                    <Box
                        sx={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            bgcolor: current.preview,
                            border: '1px solid rgba(0,0,0,0.25)',
                        }}
                    />
                </IconButton>
            </Tooltip>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{ sx: { p: 1, borderRadius: 2 } }}
            >
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 32px)', gap: 1 }}>
                    {SCHEMAS.map((s) => {
                        const selected = s.id === current.id;

                        return (
                            <IconButton
                                key={s.id}
                                size="small"
                                onClick={() => {
                                    onChange(s.id);
                                    handleClose();
                                }}
                                aria-label={s.label}
                                sx={{
                                    p: 0,
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    outline: selected ? '2px solid rgba(25,118,210,0.9)' : 'none',
                                    outlineOffset: '2px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        bgcolor: s.preview,
                                        border: '1px solid rgba(0,0,0,0.15)',
                                    }}
                                />
                            </IconButton>
                        );
                    })}
                </Box>
            </Popover>
        </>
    );
};
