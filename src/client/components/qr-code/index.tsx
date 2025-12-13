import { QRCodeSVG } from 'qrcode.react';
import './style.scss'

interface QRCodeProps {
    link: string;
    color?: string;
    size?: number;
}

const QrCode = (props: QRCodeProps) => {
    const { link, color, size } = props;

    return (
        <QRCodeSVG
            className="qr-code"
            value={link}
            size={ size || 100}
            fgColor={color}
            level="M"
        />
    )
}

export default QrCode;
