import { type ChangeEvent, type FC, useState } from 'react';

import { ImageLayout } from './image-layout.tsx';
import { StickerForm } from './enum.ts';
import type { StickerData } from './types.ts';
import QRCodeModal from '../../../components/forms/qr-code-modal';

import './style.scss';
import './input-styles.scss';
import './control-panel-styles.scss';

const defaultFormValues = {
    title: '',
    highlightedText: '',
    promo: '',
    qrCodeLink: '',
    address: '',
    phone: '',
    titleColor: '#111111',
    highlightedBgColor: '#000000',
    stickerForm: StickerForm.rectangle,
};

export const CoffeeStickerEditorPage: FC = () => {
    const updateFields = null;
    const formValues = updateFields ? updateFields : defaultFormValues;
    const [formData, setFormData] = useState<StickerData>(formValues);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onClickGenerateQRCodeHandler = (link: string) => {
        setFormData(prev => ({ ...prev, qrCodeLink: link }));
    };

    const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="redactor-page-wrapper">
            <div className="coffee-cup-wrapper">
                <ImageLayout />

                <div className="sticker__layer">
                    <form>
                        <input
                            name="title"
                            maxLength={12}
                            className="sticker-input sticker-input--title"
                            style={{ color: formData.titleColor }}
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            aria-label="Title"
                            autoComplete="off"
                            spellCheck={false}
                        />

                        <input
                            name="highlightedText"
                            maxLength={12}
                            className="sticker-input sticker-input--highlighted-text"
                            style={{ backgroundColor: formData.highlightedBgColor }}
                            value={formData.highlightedText}
                            onChange={handleChange}
                            placeholder="Highlight info"
                            aria-label="Highlight info"
                            autoComplete="off"
                            spellCheck={false}
                        />

                        <input
                            name="promo"
                            className="sticker-input sticker-input--promo"
                            value={formData.promo}
                            onChange={handleChange}
                            placeholder="Promo"
                            aria-label="Promo"
                        />

                        <QRCodeModal
                            updateLinkField={formData.qrCodeLink}
                            onClickCreateHandler={onClickGenerateQRCodeHandler}
                        />

                        <input
                            name="phone"
                            type="tel"
                            className="sticker-input sticker-input--phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone number"
                            aria-label="Phone number"
                        />

                        <input
                            name="address"
                            type="text"
                            className="sticker-input sticker-input--address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            aria-label="Address"
                        />
                    </form>
                </div>

                {/* Права вертикальна панель */}
                <aside className="control-panel control-panel--vertical">
                    {/* Коло для кольору Title */}
                    <input
                        type="color"
                        name="titleColor"
                        aria-label="Title color"
                        className="color-dot color-input"
                        value={formData.titleColor}
                        onChange={onColorChange}
                    />

                    {/* Коло для фону Highlighted */}
                    <input
                        type="color"
                        name="highlightedBgColor"
                        aria-label="Highlighted background"
                        className="color-dot color-input"
                        value={formData.highlightedBgColor}
                        onChange={onColorChange}
                    />
                </aside>
            </div>
        </div>
    );
};

export default CoffeeStickerEditorPage;
