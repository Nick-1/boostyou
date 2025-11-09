import { type ChangeEvent, type FC, use, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import QRCodeModal from '../../../components/forms/qr-code-modal';
import { UserContext } from '../../../context/user-context.tsx';
import type { StickerData } from '../../../types';
import { CLIENT_ROUTE } from '../../../common/routes.ts';

import { SubmitButton } from './submit-button';
import { ImageLayout } from './image-layout.tsx';
import {RedactorMode, StickerForm, StickerStyle} from './enum.ts';

import './style.scss';
import './input-styles.scss';
import './control-panel-styles.scss';

interface CoffeeStickerEditorPageProps {
    updateFields?: StickerData | null;
}

const defaultFormValues = {
    name: '',
    title: '',
    highlightedText: '',
    promo: '',
    qrCodeLink: '',
    address: '',
    phone: '',
    titleColor: '#111111',
    highlightedBgColor: '#000000',
    stickerForm: StickerForm.RECTANGLE,
    stickerStyle: StickerStyle.REGULAR,
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

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateQRCodeHandler = (link: string) => {
        setFormData(prev => ({ ...prev, qrCodeLink: link }));
    };

    const onColorChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const createStickerHandler = () => {
        const id = new Date().getTime();

        if (formRef.current && !formRef.current.reportValidity()) {
            return;
        }

        addSticker({...formData, id});
        navigate(CLIENT_ROUTE.order.create);
    };

    const updateStickerHandler = () => {
        if (!stickerId || !user) {
            navigate(CLIENT_ROUTE.stickers.list);
            return;
        }

        if (formRef.current && !formRef.current.reportValidity()) {
            return;
        }

        const id = Number(stickerId);
        const updatedItem = { ...formData, id };

        updateSticker(id, updatedItem);
        navigate(CLIENT_ROUTE.stickers.list);
    };

    return (
        <div className="redactor-page-wrapper">
            <div className="coffee-cup-wrapper">
                <ImageLayout />

                <input
                    name="name"
                    maxLength={20}
                    className="sticker-input sticker-input--name"
                    value={formData.name}
                    onChange={inputChangeHandler}
                    placeholder="Sticker name"
                    aria-label="Stecker name"
                    autoComplete="off"
                    spellCheck={false}
                    required
                />

                <div className="sticker__layer">
                    <form ref={formRef}>

                        <input
                            name="title"
                            maxLength={12}
                            className="sticker-input sticker-input--title"
                            style={{ color: formData.titleColor }}
                            value={formData.title}
                            onChange={inputChangeHandler}
                            placeholder="Title"
                            aria-label="Title"
                            autoComplete="off"
                            spellCheck={false}
                            required
                        />

                        <input
                            name="highlightedText"
                            maxLength={12}
                            className="sticker-input sticker-input--highlighted-text"
                            style={{ backgroundColor: formData.highlightedBgColor }}
                            value={formData.highlightedText}
                            onChange={inputChangeHandler}
                            placeholder="Highlight info"
                            aria-label="Highlight info"
                            autoComplete="off"
                            spellCheck={false}
                            required
                        />

                        <input
                            name="promo"
                            className="sticker-input sticker-input--promo"
                            value={formData.promo}
                            onChange={inputChangeHandler}
                            placeholder="Promo"
                            aria-label="Promo"
                            required
                        />

                        <QRCodeModal
                            updateLinkField={formData.qrCodeLink}
                            onClickCreateHandler={generateQRCodeHandler}
                        />

                        <input
                            name="phone"
                            type="tel"
                            className="sticker-input sticker-input--phone"
                            value={formData.phone}
                            onChange={inputChangeHandler}
                            placeholder="Phone number"
                            aria-label="Phone number"
                        />

                        <input
                            name="address"
                            type="text"
                            className="sticker-input sticker-input--address"
                            value={formData.address}
                            onChange={inputChangeHandler}
                            placeholder="Address"
                            aria-label="Address"
                            required
                        />
                    </form>
                </div>

                <aside className="control-panel control-panel--vertical">
                    <input
                        type="color"
                        name="titleColor"
                        aria-label="Title color"
                        className="color-dot color-input"
                        value={formData.titleColor}
                        onChange={onColorChangeHandler}
                    />

                    <input
                        type="color"
                        name="highlightedBgColor"
                        aria-label="Highlighted background"
                        className="color-dot color-input"
                        value={formData.highlightedBgColor}
                        onChange={onColorChangeHandler}
                    />
                </aside>

                <SubmitButton
                    mode={redactorMode}
                    updateHandler={updateStickerHandler}
                    createHandler={createStickerHandler}
                />
            </div>
        </div>
    );
};

export default CoffeeStickerEditorPage;
