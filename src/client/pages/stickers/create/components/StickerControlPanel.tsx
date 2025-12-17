import type { FC } from 'react';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PercentIcon from '@mui/icons-material/Percent';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import QrCodeIcon from '@mui/icons-material/QrCode';

import type { StickerVisibleFields } from '../hooks/useStickerFieldVisibility';

type Props = {
    visible: StickerVisibleFields;
    onToggleVisible: (key: keyof StickerVisibleFields) => void;
};

export const StickerControlPanel: FC<Props> = ({
   visible,
   onToggleVisible,
}) => {
    return (
        <aside className="control-panel control-panel--vertical">
            <Box sx={{ mt: 1, width: '100%' }}>
                <Stack spacing={0.75} sx={{ px: 1, alignItems: 'center' }}>
                  <Tooltip title="Highlighted text" placement="left">
                    <IconButton
                      size="small"
                      color={visible.highlightedText ? 'primary' : 'default'}
                      onClick={() => onToggleVisible('highlightedText')}
                    >
                      <TextFieldsIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Discount" placement="left">
                    <IconButton
                      size="small"
                      color={visible.discount ? 'primary' : 'default'}
                      onClick={() => onToggleVisible('discount')}
                    >
                      <PercentIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Promo" placement="left">
                    <IconButton
                      size="small"
                      color={visible.promo ? 'primary' : 'default'}
                      onClick={() => onToggleVisible('promo')}
                    >
                      <LocalOfferIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Phone" placement="left">
                    <IconButton
                      size="small"
                      color={visible.phone ? 'primary' : 'default'}
                      onClick={() => onToggleVisible('phone')}
                    >
                      <PhoneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Address" placement="left">
                    <IconButton
                      size="small"
                      color={visible.address ? 'primary' : 'default'}
                      onClick={() => onToggleVisible('address')}
                    >
                      <PlaceIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="QR & Logo" placement="left">
                    <IconButton
                      size="small"
                      color={visible.qr ? 'primary' : 'default'}
                      onClick={() => onToggleVisible('qr')}
                    >
                      <QrCodeIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
            </Box>
        </aside>
    );
};
