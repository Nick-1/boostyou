import { ColorName } from '../enum';

export interface StickerFormData {
    stickerName?: string;
    companyName?: string;
    address?: string;
    phone?: string;
    service?: string;
    promo?: string;
    discount?: string;
    qrCodeLink: string;
    stickerColor?: ColorName;
    textColor?: ColorName;
    textStyle?: string;
}
