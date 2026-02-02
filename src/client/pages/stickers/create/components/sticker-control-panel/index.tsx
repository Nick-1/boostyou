import type { FC } from 'react';
import { Box, Stack, Tooltip, ToggleButton } from '@mui/material';

import TextFieldsIcon from '@mui/icons-material/TextFields';
import PercentIcon from '@mui/icons-material/Percent';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
// import QrCodeIcon from '@mui/icons-material/QrCode';
// import ImageIcon from '@mui/icons-material/Image';
import type {StickerVisibleFields} from '../../hooks/useStickerFieldVisibility.ts';

import './style.scss';

type Props = {
    visible: StickerVisibleFields;
    onToggleVisible: (key: keyof StickerVisibleFields) => void;
};

export const StickerControlPanel: FC<Props> = ({ visible, onToggleVisible }) => {
    // const qrSelected = visible.qr || visible.qrAndLogo;
    // const logoSelected = visible.logo || visible.qrAndLogo;

    return (
        <aside className="control-panel control-panel--vertical">
            <Box sx={{ mt: 1, width: '100%' }}>
                <Stack spacing={0.75} sx={{ px: 1, alignItems: 'center' }}>
                    <Tooltip title="Highlighted text" placement="left">
                        <ToggleButton
                            size="small"
                            value="highlightedText"
                            selected={visible.highlightedText}
                            onChange={() => onToggleVisible('highlightedText')}
                        >
                            <TextFieldsIcon fontSize="small" />
                        </ToggleButton>
                    </Tooltip>

                    <Tooltip title="Discount" placement="left">
                        <ToggleButton
                            size="small"
                            value="discount"
                            selected={visible.discount}
                            onChange={() => onToggleVisible('discount')}
                        >
                            <PercentIcon fontSize="small" />
                        </ToggleButton>
                    </Tooltip>

                    <Tooltip title="Promo" placement="left">
                        <ToggleButton
                            size="small"
                            value="promo"
                            selected={visible.promo}
                            onChange={() => onToggleVisible('promo')}
                        >
                            <LocalOfferIcon fontSize="small" />
                        </ToggleButton>
                    </Tooltip>

                    <Tooltip title="Phone" placement="left">
                        <ToggleButton
                            size="small"
                            value="phone"
                            selected={visible.phone}
                            onChange={() => onToggleVisible('phone')}
                        >
                            <PhoneIcon fontSize="small" />
                        </ToggleButton>
                    </Tooltip>

                    <Tooltip title="Address" placement="left">
                        <ToggleButton
                            size="small"
                            value="address"
                            selected={visible.address}
                            onChange={() => onToggleVisible('address')}
                        >
                            <PlaceIcon fontSize="small" />
                        </ToggleButton>
                    </Tooltip>

                    {/*<Tooltip title="QR code" placement="left">*/}
                    {/*    <ToggleButton*/}
                    {/*        size="small"*/}
                    {/*        value="qr"*/}
                    {/*        selected={qrSelected}*/}
                    {/*        onChange={() => onToggleVisible('qr')}*/}
                    {/*    >*/}
                    {/*        <QrCodeIcon fontSize="small" />*/}
                    {/*    </ToggleButton>*/}
                    {/*</Tooltip>*/}

                    {/*<Tooltip title="Logo" placement="left">*/}
                    {/*    <ToggleButton*/}
                    {/*        size="small"*/}
                    {/*        value="logo"*/}
                    {/*        selected={logoSelected}*/}
                    {/*        onChange={() => onToggleVisible('logo')}*/}
                    {/*    >*/}
                    {/*        <ImageIcon fontSize="small" />*/}
                    {/*    </ToggleButton>*/}
                    {/*</Tooltip>*/}
                </Stack>
            </Box>
        </aside>
    );
};
