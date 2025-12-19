import type { StickerVisibleFields } from '../hooks/useStickerFieldVisibility';
import type { StickerData } from '../../../../types';

const hasText = (v?: string | null) => Boolean(v && v.trim().length > 0);

export const fromStickerDataToVisibleFieldsMapper = (
    data?: StickerData | null
): Partial<StickerVisibleFields> => {
    if (!data) return {};

    const qrPresent = hasText((data as any).qrCodeLink);
    const logoPresent = Boolean(data.logoUrl) || Boolean(data.logoFile);
    const qrAndLogo = qrPresent && logoPresent;

    return {
        highlightedText: hasText(data.highlightedText),
        discount: hasText(data.discount),
        promo: hasText(data.promo),
        phone: hasText(data.phone),
        address: hasText(data.address),

        qr: qrPresent && !qrAndLogo,
        logo: logoPresent && !qrAndLogo,
        qrAndLogo,
    };
};
