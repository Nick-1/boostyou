import type { FC } from 'react';

import { type CustomerLogoProps, CustomerLogoUpload } from '../customer-logo-upload';
import { CustomerQrCode, type CustomerQrCodeProps } from '../customer-qr-code';

import type {StickerVisibleFields} from '../../hooks/useStickerFieldVisibility.ts';

import './style.scss';

type Props = CustomerLogoProps & CustomerQrCodeProps & { visible: StickerVisibleFields };

export const QrCodeAndLogo: FC<Props> = ({ logoFile, onLogoChange, qrCodeLink, onQrCodeLinkChange, visible }) => {

    return (
        <>
            {visible.qrAndLogo && (
                <div className="qr-code-and-logo-container">
                    <CustomerLogoUpload onLogoChange={onLogoChange} logoFile={logoFile} />

                    <CustomerQrCode onQrCodeLinkChange={onQrCodeLinkChange} qrCodeLink={qrCodeLink} />
                </div>
            )}
            {visible.qr && (
                <div className="qr-code-container">
                    <CustomerQrCode onQrCodeLinkChange={onQrCodeLinkChange} qrCodeLink={qrCodeLink} />
                </div>
            )}
            {visible.logo && (
                <div className="customer-logo-container">
                    <CustomerLogoUpload onLogoChange={onLogoChange} logoFile={logoFile} />
                </div>
            )}
        </>
    );
};
