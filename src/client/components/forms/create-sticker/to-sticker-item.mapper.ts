import type {StickerFormData, StickerListItem} from '../../../types';
import { ColorCode } from '../../../enum';

export const toStickerItemMapper = (data: StickerFormData): StickerListItem  => {
    return {
        id: new Date().getTime(),
        // @ts-ignore
        style: { background: ColorCode[data.stickerColor], color: ColorCode[data.textColor] },
        info: {
            name: data.stickerName,
            companyName: data.companyName,
            service: data.service,
            discount: data.discount,
            promo: data.promo,
            qrcode: data.qrCodeLink,
            phone: data.phone,
            address: data.address,
        },
    }
}
