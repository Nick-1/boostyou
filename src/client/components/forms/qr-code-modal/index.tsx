import { useState } from 'react';

import Box from '@mui/material/Box';
import { Fab, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import QrCodeIcon from '@mui/icons-material/QrCode';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import QrCode from '../../qr-code';

import './style.scss'

interface QRCodeModalProps {
    onClickCreateHandler: (link: string) => void,
    updateLinkField?: string
}

export default function QRCodeModal(props: QRCodeModalProps) {
    const { onClickCreateHandler, updateLinkField } = props;
    const defaultLink = updateLinkField ? updateLinkField : '';
    const [link, setLink] = useState<string>(defaultLink);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLink(value)
    };

    const manageQRCode = () => {
        if (link) {
            return (
                <div className="qr-code-modal__actions">
                    <QrCode link={link}/>
                    <Fab className="qr-code-edit-button" size="small" aria-label="edit qr code" onClick={handleOpen}>
                        <EditIcon />
                    </Fab>
                </div>
            )
        }

        return  (
            <Fab className="qr-code-modal__create" size="large" color="primary" aria-label="generage qr code" onClick={handleOpen}>
                <QrCodeIcon />
            </Fab>
        )
    }

    return (
        <div className="qr-code-modal-container">
            { manageQRCode() }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="QR-code-modal__container">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        QR code generation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Here you can provide your link.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 3 }}>
                        <TextField
                            id="qrCodeLink"
                            name="qrCodeLink"
                            label="https://your-link.com"
                            variant="outlined"
                            value={link}
                            onChange={handleChange}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                onClickCreateHandler(link);
                                setTimeout(() => {
                                    setOpen(false);
                                }, 0);
                            }}
                        >
                            Generate
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
