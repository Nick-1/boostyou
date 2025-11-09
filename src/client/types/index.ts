import { ColorName, TextStyle } from '../enum';
import {type StickerForm, StickerStyle} from '../pages/stickers/create/enum.ts';

export interface User {
    id: number;
    name: string;
    stickersList: StickerListItem[];
}

export interface StickerListItem extends StickerData{
    id: number;
}

export interface StickerData {
    name: string;
    title: string;
    highlightedText: string;
    promo: string;
    qrCodeLink: string;
    address: string;
    phone: string;
    titleColor: string;
    highlightedBgColor: string;
    stickerForm: StickerForm,
    stickerStyle: StickerStyle,
}

export interface CoffeePlace {
    id: number,
    ownerId: number;
    name: string,
    address: string
    location: {
        lat: number,
        lng: number
    }
}

export interface StickerFormData {
    stickerName: string;
    companyName: string;
    qrCodeLink: string;
    address?: string;
    phone?: string;
    service?: string;
    promo?: string;
    discount?: string;
    stickerColor: ColorName;
    textColor: ColorName;
    textStyle: TextStyle;
}
