import { StickerForm } from './enum.ts';

export interface StickerData {
    title: string;
    colorText: string;
    qrCodeLink: string;
    address: string;
    phone: string;
    stickerForm: StickerForm,
}
