import type {StickerFormData, StickerListItem} from '../../../types';
import { ColorHex } from '../../../enum';

export const toFormValuesMapper = (data?: StickerListItem ): StickerFormData | null  => {
    if (data) {
        return {
            stickerName: data.info.name,
            companyName: data.info.companyName,
            service: data.info.service,
            discount: data.info.discount,
            promo: data.info.promo,
            qrCodeLink: data.info.qrcode,
            phone: data.info.phone,
            address: data.info.address,
            // @ts-ignore
            stickerColor:  ColorHex[data.style.background],
            // @ts-ignore
            textColor: ColorHex[data.style.color],
            // @ts-ignore
            textStyle: data.style.textStyle,
        }
    }

    return null;
}
