import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
    link: string;
    color?: string;
    size?: number;
}

const QrCode = (props: QRCodeProps) => {
    const { link, color, size } = props;

    return (
        <QRCodeSVG
            value={link}
            size={ size || 100}
            fgColor={color}
            level="M"
        />
    )
}

export default QrCode;
