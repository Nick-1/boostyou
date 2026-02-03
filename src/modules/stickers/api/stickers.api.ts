import Api from '../../../services/api/api.service';
import { API_ROUTE } from '../../../services/api/routes.ts';

export type CreateStickerQueryParams = {
    name: string;
    title: string;
    highlightedText?: string;
    discount?: string;
    promo?: string;
    phone?: string;
    qrCodeLink: string;
    address?: string;
};

export const createSticker = (params: CreateStickerQueryParams) =>
    Api.post(API_ROUTE.stickers, params);
