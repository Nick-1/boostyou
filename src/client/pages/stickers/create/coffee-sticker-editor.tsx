import { type ChangeEvent, type FC, use, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { UserContext } from '../../../context/user-context.tsx';
import type { StickerData } from '../../../types';
import { CLIENT_ROUTE } from '../../../common/routes.ts';

import { SubmitButton } from './submit-button';
import { ImageLayout } from './image-layout.tsx';
import { RedactorMode, StickerForm, StickerStyle } from './enum.ts';

import { QrCodeAndLogo } from './components/qr-code-and-logo';
import { StickerControlPanel } from './components/sticker-control-panel';
import { StickerMainFields } from './components/sticker-main-fields';
import { useStickerFieldVisibility } from './hooks/useStickerFieldVisibility';

import './style.scss';
import {fromStickerDataToVisibleFieldsMapper} from './mappers/from-sticker-data-to-visible-fields.mapper.ts';

interface CoffeeStickerEditorPageProps {
    updateFields?: StickerData | null;
}

const defaultFormValues = {
    name: '',
    title: '',
    highlightedText: '',
    discount: '',
    promo: '',
    qrCodeLink: '',
    address: '',
    phone: '',
    titleColor: '#111111',
    highlightedBgColor: '#000000',
    stickerForm: StickerForm.RECTANGLE,
    stickerStyle: StickerStyle.REGULAR,
    logoFile: null,
};

export const CoffeeStickerEditorPage: FC<CoffeeStickerEditorPageProps> = (props) => {
    const { updateFields } = props;

    const formRef = useRef<HTMLFormElement>(null);
    const { user, addSticker, updateSticker } = use(UserContext)!;

    const navigate = useNavigate();
    const { stickerId } = useParams<{ stickerId: string }>();

    const formValues = updateFields ? updateFields : defaultFormValues;
    const [formData, setFormData] = useState<StickerData>(formValues);

    const redactorMode = updateFields ? RedactorMode.UPDATE : RedactorMode.CREATE;

    const initialVisible = updateFields ? fromStickerDataToVisibleFieldsMapper(updateFields) : undefined;
    const { visible, toggleVisible, onlyTitleVisible } = useStickerFieldVisibility(initialVisible);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onTitleValueChange = (next: string) => setFormData((p) => ({ ...p, title: next }));
    const onAddressValueChange = (next: string) => setFormData((p) => ({ ...p, address: next }));

    const createStickerHandler = () => {
        const id = new Date().getTime();
        if (formRef.current && !formRef.current.reportValidity()) return;

        addSticker({ ...formData, id });

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
        updateSticker(id, { ...formData, id });
        navigate(CLIENT_ROUTE.stickers.list);
    };

    return (
        <div className="redactor-page-wrapper">
            <div className="coffee-cup-wrapper">
                <StickerControlPanel
                    visible={visible}
                    onToggleVisible={toggleVisible}
                />

                <ImageLayout />

                <input
                    name="name"
                    form="sticker-form"
                    maxLength={20}
                    className="sticker-input sticker-input--name"
                    value={formData.name}
                    onChange={inputChangeHandler}
                    placeholder="Sticker name"
                    aria-label="Sticker name"
                    autoComplete="off"
                    spellCheck={false}
                    required
                />

                <div className="sticker__layer">
                    <form ref={formRef} id="sticker-form">
                        <StickerMainFields
                            formData={formData}
                            visible={visible}
                            onlyTitleVisible={onlyTitleVisible}
                            onChange={inputChangeHandler}
                            onTitleValueChange={onTitleValueChange}
                            onAddressValueChange={onAddressValueChange}
                        />

                        <QrCodeAndLogo
                            visible={visible}
                            logoFile={formData.logoFile}
                            onLogoChange={(file) => setFormData((p) => ({ ...p, logoFile: file }))}
                            qrCodeLink={formData.qrCodeLink}
                            onQrCodeLinkChange={(link) => setFormData((p) => ({ ...p, qrCodeLink: link }))}
                        />
                    </form>
                </div>

                <SubmitButton mode={redactorMode} updateHandler={updateStickerHandler} createHandler={createStickerHandler} />
            </div>
        </div>
    );
};

export default CoffeeStickerEditorPage;
