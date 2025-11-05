import { StickerForm } from './enum.ts';

export interface StickerData {
    title: string;
    highlightedText: string;
    promo: string;
    qrCodeLink: string;
    address: string;
    phone: string;
    titleColor: string;
    highlightedBgColor: string;
    stickerForm: StickerForm,
}
