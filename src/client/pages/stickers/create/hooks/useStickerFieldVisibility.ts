import { useMemo, useState } from 'react';

export type StickerVisibleFields = {
    highlightedText: boolean;
    discount: boolean;
    promo: boolean;
    phone: boolean;
    address: boolean;
    qr: boolean;
};

export const useStickerFieldVisibility = (initial?: Partial<StickerVisibleFields>) => {
    const [visible, setVisible] = useState<StickerVisibleFields>({
        highlightedText: true,
        discount: true,
        promo: true,
        phone: true,
        address: true,
        qr: true,
        ...initial,
    });

    const toggleVisible = (key: keyof StickerVisibleFields) => {
        setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const onlyTitleVisible = useMemo(
        () =>
            !visible.highlightedText &&
            !visible.discount &&
            !visible.promo &&
            !visible.phone &&
            !visible.address &&
            !visible.qr,
        [visible]
    );

    return { visible, toggleVisible, onlyTitleVisible };
};
