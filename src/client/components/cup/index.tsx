import QrCode from '../qr-code';
import type { StickerFormData } from '../../types';
import './style.scss'
import {ColorCode} from '../../enum';

interface CupProps {
    data: StickerFormData;
}

const Cup = ( props: CupProps ) => {
    const { data } = props;

    return (
        <>
            <div className="cup">
                <div
                    className="sticker__preview"
                    style={{
                        //@ts-ignore
                        backgroundColor: ColorCode[data.stickerColor],
                        color: data.textColor,
                        fontWeight: data.textStyle === 'bold' ? 'bold' : undefined,
                        fontStyle: data.textStyle === 'italic' ? 'italic' : undefined,
                    }}
                >
                    <h2>{data.companyName || 'Company Name'}</h2>
                    <p>{data.promo || 'Promo text'}</p>
                    {data.discount && <p>Discount: {data.discount}</p>}

                    <QrCode link={data.qrCodeLink} />
                </div>
            </div>
        </>
    )
}

export default Cup;
