import type { FC } from 'react';
import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import QrCode from '../../../../../components/qr-code';

import './style.scss';

export type CustomerQrCodeProps = {
    qrCodeLink: string;
    onQrCodeLinkChange: (link: string) => void;
};

const normalizeUrl = (raw: string) => {
    const v = raw.trim();
    if (!v) return '';
    if (/^https?:\/\//i.test(v)) return v;
    return `https://${v}`;
};

export const CustomerQrCode: FC<CustomerQrCodeProps> = ({ qrCodeLink, onQrCodeLinkChange }) => {
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState(qrCodeLink ?? '');
    const [error, setError] = useState<string | null>(null);

    const hasLink = useMemo(() => Boolean(qrCodeLink && qrCodeLink.trim()), [qrCodeLink]);

    const handleOpen = () => {
        setDraft(qrCodeLink ?? '');
        setError(null);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSave = () => {
        const normalized = normalizeUrl(draft);

        if (!normalized) {
            setError('Please enter URL');
            return;
        }

        try {
            new URL(normalized);
        } catch {
            setError('Invalid URL');
            return;
        }

        onQrCodeLinkChange(normalized);
        setOpen(false);
    };

    const handleClear = () => {
        onQrCodeLinkChange('');
        setOpen(false);
    };

    return (
        <>
            <div className="qr-code">
                <div className="qr-code__inner">
                    {hasLink ? (
                        <QrCode link={qrCodeLink} />
                    ) : (
                        <Tooltip title="Add QR link" placement="left">
                            <IconButton
                                className="qr-code__placeholder"
                                aria-label="Add QR link"
                                onClick={handleOpen}
                            >
                                <QrCode2Icon />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>

                {/* якщо навіть при наявності QR хочеш редагування по кліку */}
                {hasLink && (
                    <button type="button" className="qr-code__edit-hit" onClick={handleOpen} aria-label="Edit QR link" />
                )}
            </div>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>QR code link</DialogTitle>

                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <TextField
                            autoFocus
                            fullWidth
                            label="URL"
                            placeholder="https://example.com"
                            value={draft}
                            onChange={(e) => {
                                setDraft(e.target.value);
                                setError(null);
                            }}
                            error={Boolean(error)}
                            helperText={error ?? 'Enter a link for QR code'}
                            inputProps={{ inputMode: 'url' }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClear} color="inherit">
                        Clear
                    </Button>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
