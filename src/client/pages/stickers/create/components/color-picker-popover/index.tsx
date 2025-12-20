import type { FC, MouseEvent } from 'react';
import { Box, IconButton, Popover, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';

type Schema = {
    id: number;
    label: string;
    colors: string[]; // 1..3
};

const SCHEMAS: Schema[] = [
    { id: 1, label: 'Schema 1', colors: ['#fb5b12', '#a8c470',] },
    { id: 2, label: 'Schema 2', colors: ['#ab100f'] },
    // { id: 3, label: 'Schema 3', colors: ['#ff5252', '#ffd54f', '#ffffff'] },
];

type Props = {
    value: number;
    onChange: (next: number) => void;
};

const clampColors = (colors: string[]) => colors.filter(Boolean).slice(0, 3);

const buildPreviewBg = (colorsRaw: string[]) => {
    const colors = clampColors(colorsRaw);
    if (colors.length === 0) return '#000';

    if (colors.length === 1) {
        return colors[0];
    }

    if (colors.length === 2) {
        return `conic-gradient(${colors[0]} 0 180deg, ${colors[1]} 180deg 360deg)`;
    }

    return `conic-gradient(${colors[0]} 0 120deg, ${colors[1]} 120deg 240deg, ${colors[2]} 240deg 360deg)`;
};

const SchemaDot: FC<{ colors: string[]; size?: number }> = ({ colors, size = 18 }) => {
    const bg = buildPreviewBg(colors);

    return (
        <Box
            sx={{
                width: size,
                height: size,
                borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.25)',
                background: bg,
            }}
        />
    );
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
                    <SchemaDot colors={current.colors} />
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
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 36px)', gap: 1 }}>
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
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    outline: selected ? '2px solid rgba(25,118,210,0.9)' : 'none',
                                    outlineOffset: '2px',
                                }}
                            >
                                <SchemaDot colors={s.colors} size={26} />
                            </IconButton>
                        );
                    })}
                </Box>
            </Popover>
        </>
    );
};
