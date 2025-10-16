import {ColorName, TextStyle} from '../enum';

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

export interface StickerListItem {
    id: number;
    style: {
        background: string;
        color?: string;
        textStyle?: TextStyle;
    }
    info: {
        name: string;
        companyName: string;
        qrcode: string;
        service?: string;
        discount?: string;
        promo?: string;
        phone?: string;
        address?: string;
    }
}

export interface User {
    id: number;
    name: string;
    stickersList: StickerListItem[];
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
