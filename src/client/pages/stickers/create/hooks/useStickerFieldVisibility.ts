import { useMemo, useState } from 'react';

export type StickerVisibleFields = {
    highlightedText: boolean;
    discount: boolean;
    promo: boolean;
    phone: boolean;
    address: boolean;
    qr: boolean;
    logo: boolean;
    qrAndLogo: boolean;
};

export const useStickerFieldVisibility = (initial?: Partial<StickerVisibleFields>) => {
    const [visible, setVisible] = useState<StickerVisibleFields>({
        highlightedText: true,
        discount: true,
        promo: true,
        phone: true,
        address: true,
        qr: false,
        logo: false,
        qrAndLogo: true,
        ...initial,
    });

    const toggleVisible = (key: keyof StickerVisibleFields) => {
        setVisible((prev) => {
            if (key === 'qr') {
                if (prev.qrAndLogo) {
                    return { ...prev, qr: false, logo: true, qrAndLogo: false };
                }

                const nextQr = !prev.qr;

                if (nextQr && prev.logo) {
                    return { ...prev, qr: false, logo: false, qrAndLogo: true };
                }

                return { ...prev, qr: nextQr, qrAndLogo: false };
            }

            if (key === 'logo') {
                if (prev.qrAndLogo) {
                    return { ...prev, qr: true, logo: false, qrAndLogo: false };
                }

                const nextLogo = !prev.logo;

                if (nextLogo && prev.qr) {
                    return { ...prev, qr: false, logo: false, qrAndLogo: true };
                }

                return { ...prev, logo: nextLogo, qrAndLogo: false };
            }

            if (key === 'qrAndLogo') {
                return prev;
            }

            return {
                ...prev,
                [key]: !prev[key],
            };
        });
    };

    const onlyTitleVisible = useMemo(
        () =>
            !visible.highlightedText &&
            !visible.discount &&
            !visible.promo &&
            !visible.phone &&
            !visible.address &&
            !visible.qr &&
            !visible.logo &&
            !visible.qrAndLogo,
        [visible]
    );

    return { visible, toggleVisible, onlyTitleVisible };
};
