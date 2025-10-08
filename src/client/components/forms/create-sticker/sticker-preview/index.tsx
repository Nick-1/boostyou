import { memo } from 'react';
import { Box } from '@mui/material';

import QRCodeModal from '../../qr-code-modal';
import type { StickerFormData } from '../../../../types';

interface StickerPreviewProps {
    data: Partial<StickerFormData>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickGenerateQRCodeHandler: (link: string) => void
}

const StickerPreview = (props: StickerPreviewProps) => {
    const { data, onChange, onClickGenerateQRCodeHandler } = props;
    const {
        companyName = '',
        promo = '',
        discount = '',
        service = '',
        qrCodeLink = '',
        address = '',
        phone = '',
    } = data;

    return (
        <>
            <input
                id="companyName"
                maxLength={12}
                className="create-sticker__input"
                name="companyName"
                placeholder="Your Company"
                value={companyName}
                onChange={onChange}
                required
            />

            <input
                id="service"
                maxLength={16}
                className="create-sticker__input"
                name="service"
                placeholder="Your Service"
                value={service}
                onChange={onChange}
            />

            <input
                id="discount"
                maxLength={12}
                className="create-sticker__input"
                name="discount"
                placeholder="Your Discount"
                value={discount}
                onChange={onChange}
            />

            <input
                id="promo"
                maxLength={20}
                className="create-sticker__input"
                name="promo"
                placeholder="Your Promo"
                value={promo}
                onChange={onChange}
            />

            <QRCodeModal
                updateLinkField={qrCodeLink}
                onClickCreateHandler={onClickGenerateQRCodeHandler}
            />

            <Box className="create-sticker__input-user-contacts">
                <input
                    id="address"
                    maxLength={18}
                    className="create-sticker__input"
                    name="address"
                    placeholder="Your address"
                    value={address}
                    onChange={onChange}
                />

                <input
                    id="phone"
                    maxLength={16}
                    type="tel"
                    className="create-sticker__input"
                    name="phone"
                    placeholder="Your phone"
                    value={phone}
                    onChange={onChange}
                />
            </Box>
        </>
    )
}

export default memo(StickerPreview);
