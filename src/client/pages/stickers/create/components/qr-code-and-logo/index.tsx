import type { FC } from 'react';


import { type CustomerLogoProps, CustomerLogoUpload } from '../customer-logo-upload';
import { CustomerQrCode, type CustomerQrCodeProps } from '../customer-qr-code';

import './style.scss';

type Props = CustomerLogoProps & CustomerQrCodeProps;

export const QrCodeAndLogo: FC<Props> = ({ logoFile, onLogoChange, qrCodeLink, onQrCodeLinkChange }) => {

    return (
        <div className="qr-code-and-logo-container">
            <CustomerLogoUpload onLogoChange={onLogoChange} logoFile={logoFile} />

            <CustomerQrCode onQrCodeLinkChange={onQrCodeLinkChange} qrCodeLink={qrCodeLink} />
        </div>
    );
};
