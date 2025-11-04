import type { FC } from 'react';
import { useState } from 'react';

import { ImageLayout } from './image-layout.tsx';
import { StickerForm } from './enum.ts';
import type { StickerData } from './types.ts';
import QRCodeModal from '../../../components/forms/qr-code-modal';

import './style.scss';

const defaultFormValues = {
    title: '',
    colorText: '',
    qrCodeLink: '',
    address: '',
    phone: '',
    stickerForm: StickerForm.rectangle,
}

export const CoffeeStickerEditorPage: FC = () => {
    const updateFields = null;
    const formValues = updateFields ? updateFields : defaultFormValues;
    const [formData, setFormData] = useState<StickerData>(formValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const onClickGenerateQRCodeHandler = (link: string) => {
        setFormData(prev => ({
            ...prev,
            qrCodeLink: link,
        }));
    }

    return (
        <>
            <div className="redactor-page-wrapper">
                <div className="coffee-cup-wrapper">
                    <ImageLayout />

                    <div className="sticker__layer">
                        <form>
                            <input
                                name="title"
                                className="sticker-input sticker-input--title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                aria-label="Title"
                            />
                            <input
                                name="color-text"
                                className="sticker-input sticker-input--color-text"
                                value={formData.colorText}
                                onChange={handleChange}
                                placeholder="Highlight info"
                                aria-label="Highlight info"
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
                                placeholder="Phone"
                                aria-label="Phone"
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
                </div>
            </div>
        </>
    );
};

export default CoffeeStickerEditorPage;
