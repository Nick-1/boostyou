import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { StickerData } from '../../../../../types';
import type { StickerVisibleFields } from '../../hooks/useStickerFieldVisibility.ts';

export type MainStickerProps = {
    formRef: RefObject<HTMLFormElement | null>;
    formData: StickerData;
    setFormData: Dispatch<SetStateAction<StickerData>>;
    visible: StickerVisibleFields;
    onlyTitleVisible: boolean;
    toggleVisible: (key: keyof StickerVisibleFields) => void;
};
