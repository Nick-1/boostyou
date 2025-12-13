import type { FC } from 'react';

import QrCode from '../../../../components/qr-code';

import './style.scss';

export const QrCodeAndLogo: FC = () => {
    return (
        <div className="qr-code-and-logo-container">
            <img
                className="customer-logo"
                src="/customers-images/kangaroo.jpeg"
                alt="Customer logo"
            />
            <QrCode link="https://google.com" />
        </div>
    )
}
