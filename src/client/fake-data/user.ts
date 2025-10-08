import type {StickerListItem, User} from '../types';
import {ColorCode, TextStyle} from '../enum';

const stickersList: StickerListItem[] = [
    {
        id: 1,
        style: {
            background: ColorCode.WHITE,
            color: ColorCode.BLACK,
            textStyle: TextStyle.NORMAL
        },
        info: {
            name: 'Sticker 1',
            companyName: 'Company Name',
            service: 'Service text',
            discount: 'SAVE 20%',
            promo: 'Promo',
            qrcode: 'https://boostyou.us',
            phone: '+1 111 555 444',
            address: 'Address Florida NA 2',
        }
    },
    {
        id: 2,
        style: {
            background: ColorCode.GREEN,
            color: ColorCode.BLACK,
            textStyle: TextStyle.NORMAL
        },
        info: {
            name: 'Sticker 2',
            companyName: 'Company Name',
            service: 'Service text',
            discount: 'SAVE 20%',
            promo: 'Promo',
            qrcode: 'https://boostyou.us',
            phone: '+1 111 555 444',
            address: 'Address Florida NA 2',
        }
    },
    {
        id: 3,
        style: {
            background: ColorCode.RED,
            color: ColorCode.WHITE,
            textStyle: TextStyle.NORMAL
        },
        info: {
            name: 'Sticker 3',
            companyName: 'Company Name',
            service: 'Service text',
            discount: 'SAVE 20%',
            promo: 'Promo',
            qrcode: 'https://boostyou.us',
            phone: '+1 111 555 444',
            address: 'Address Florida NA 2',
        }
    },
    {
        id: 4,
        style: {
            background: ColorCode.BLUE,
            color: ColorCode.WHITE,
            textStyle: TextStyle.NORMAL
        },
        info: {
            name: 'Sticker 4',
            companyName: 'Company Name',
            service: 'Service text',
            discount: 'SAVE 20%',
            promo: 'Promo',
            qrcode: 'https://boostyou.us',
            phone: '+1 111 555 444',
            address: 'Address Florida NA 2',
        }
    },
    {
        id: 5,
        style: {
            background: ColorCode.ORANGE,
            color: ColorCode.BLACK,
            textStyle: TextStyle.NORMAL
        },
        info: {
            name: 'Sticker 5',
            companyName: 'Company Name',
            service: 'Service text',
            discount: 'SAVE 20%',
            promo: 'Promo',
            qrcode: 'https://boostyou.us',
            phone: '+1 111 555 444',
            address: 'Address Florida NA 2',
        }
    },
];

export const DemoUser: User = {
    id: 1,
    name: 'Demo',
    stickersList,
}
