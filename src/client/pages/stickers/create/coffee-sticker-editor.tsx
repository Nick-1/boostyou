import { type FC, use, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { UserContext } from '../../../context/user-context.tsx';
import { CLIENT_ROUTE } from '../../../common/routes.ts';
import type { StickerData } from '../../../types';

import { SubmitButton } from './submit-button';
import { StickerWithCupPreview } from './components/main-preview/sticker-with-cup';

import { fromStickerDataToVisibleFieldsMapper } from './mappers/from-sticker-data-to-visible-fields.mapper.ts';

import { RedactorMode, StickerForm, StickerStyle } from './enum.ts';

// import { StickerOnlyPreview } from './components/main-preview/sticker-only';
import { useStickerFieldVisibility } from './hooks/useStickerFieldVisibility.ts';

import './components/color-picker-popover/color-schema.scss';
import './style.scss';

interface CoffeeStickerEditorPageProps {
    updateFields?: StickerData | null;
}

const defaultFormValues = {
    name: '',
    title: '',
    highlightedText: '',
    discount: '',
    promo: '',
    address: '',
    phone: '',
    qrCodeLink: '',
    logoUrl: null,
    logoFile: null,
    stickerForm: StickerForm.RECTANGLE,
    stickerStyle: StickerStyle.REGULAR,
    colorSchema: 1,
};

export const CoffeeStickerEditorPage: FC<CoffeeStickerEditorPageProps> = (props) => {
    const { updateFields } = props;

    const formRef = useRef<HTMLFormElement>(null);
    const { user, addSticker, updateSticker } = use(UserContext)!;

    const navigate = useNavigate();
    const { stickerId } = useParams<{ stickerId: string }>();

    const formValues = updateFields
        ? { ...updateFields, colorSchema: updateFields.colorSchema ?? 1, logoFile: null }
        : defaultFormValues;
    const [formData, setFormData] = useState<StickerData>(formValues);

    const redactorMode = updateFields ? RedactorMode.UPDATE : RedactorMode.CREATE;

    const initialVisible = updateFields ? fromStickerDataToVisibleFieldsMapper(formValues) : undefined;
    const { visible, toggleVisible, onlyTitleVisible } = useStickerFieldVisibility(initialVisible);

    const createStickerHandler = () => {
        const id = new Date().getTime();
        if (formRef.current && !formRef.current.reportValidity()) return;

        const payload = { ...formData, logoFile: null };
        addSticker({ ...payload, id });

        console.info('formData---', formData)
        navigate(CLIENT_ROUTE.order.create);
    };

    const updateStickerHandler = () => {
        if (!stickerId || !user) {
            navigate(CLIENT_ROUTE.stickers.list);
            return;
        }
        if (formRef.current && !formRef.current.reportValidity()) return;

        const id = Number(stickerId);
        const payload = { ...formData, logoFile: null };

        updateSticker(id, { ...payload, id });
        console.info('formData---', formData)
        navigate(CLIENT_ROUTE.stickers.list);
    };

    return (
        <div className={`redactor-page-wrapper color-schema--${formData.colorSchema}`}>
            <StickerWithCupPreview
                formData={formData}
                setFormData={setFormData}
                formRef={formRef}
                visible={visible}
                toggleVisible={toggleVisible}
                onlyTitleVisible={onlyTitleVisible}
            />

            {/*<StickerOnlyPreview*/}
            {/*    formData={formData}*/}
            {/*    setFormData={setFormData}*/}
            {/*    formRef={formRef}*/}
            {/*    visible={visible}*/}
            {/*    toggleVisible={toggleVisible}*/}
            {/*    onlyTitleVisible={onlyTitleVisible}*/}
            {/*/>*/}

            <SubmitButton mode={redactorMode} updateHandler={updateStickerHandler} createHandler={createStickerHandler} />
        </div>
    );
};

export default CoffeeStickerEditorPage;
