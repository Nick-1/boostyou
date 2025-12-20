import type { FC } from 'react';

import type {StickerData} from '../../../../../types';
import { useAutoGrowTextarea } from '../../hooks/useAutoGrowTextarea.ts';
import type {StickerVisibleFields} from '../../hooks/useStickerFieldVisibility.ts';

import './style.scss';

type Props = {
    formData: StickerData;
    visible: StickerVisibleFields;
    onlyTitleVisible: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onTitleValueChange: (next: string) => void;
    onAddressValueChange: (next: string) => void;
};

export const StickerMainFields: FC<Props> = ({
     formData,
     visible,
     onlyTitleVisible,
     onChange,
     onTitleValueChange,
     onAddressValueChange,
}) => {
    const titleTextarea = useAutoGrowTextarea({
        value: formData.title,
        maxLines: 7,
        onValueChange: onTitleValueChange,
    });

    const addressTextarea = useAutoGrowTextarea({
        value: formData.address,
        maxLines: 2,
        onValueChange: onAddressValueChange,
    });

    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value ?? '';

        let digits = raw.replace(/\D/g, '');

        const trimmed = raw.trim();
        if (trimmed.startsWith('+1') && digits.startsWith('1')) {
            digits = digits.slice(1);
        }

        const next = digits.length === 0 ? '' : `+1${digits}`;

        onChange({
            ...e,
            target: {
                ...e.target,
                name: 'phone',
                value: next,
            },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const onDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value ?? '';

        if (raw === '') {
            onChange({
                ...e,
                target: { ...e.target, name: 'discount', value: '' },
            } as React.ChangeEvent<HTMLInputElement>);
            return;
        }

        if (!/^\d+$/.test(raw)) return;

        const normalized = raw.replace(/^0+/, '') || '0';
        const num = Number(normalized);

        if (num < 1 || num > 100) return;

        onChange({
            ...e,
            target: { ...e.target, name: 'discount', value: normalized },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="main-inputs-container">
            <div className="main-inputs-container--block">
                {onlyTitleVisible ? (
                    <textarea
                        ref={titleTextarea.ref}
                        name="title"
                        maxLength={70}
                        rows={1}
                        className="sticker-input sticker-input--title sticker-textarea sticker-textarea--title"
                        value={formData.title}
                        onChange={titleTextarea.onChange}
                        onKeyDown={titleTextarea.onKeyDown}
                        placeholder="Title"
                        aria-label="Title"
                        autoComplete="off"
                        spellCheck={false}
                        required
                    />
                ) : (
                    <input
                        name="title"
                        maxLength={12}
                        className="sticker-input sticker-input--title"
                        value={formData.title}
                        onChange={onChange}
                        placeholder="Title"
                        aria-label="Title"
                        autoComplete="off"
                        spellCheck={false}
                        required
                    />
                )}

                {visible.highlightedText && (
                    <input
                        name="highlightedText"
                        maxLength={18}
                        className="sticker-input sticker-input--highlighted-text"
                        value={formData.highlightedText}
                        onChange={onChange}
                        placeholder="Highlighted text"
                        aria-label="Highlighted text"
                        autoComplete="off"
                        spellCheck={false}
                        required
                    />
                )}
            </div>

            <div className="main-inputs-container--block">
                {visible.discount && (
                    <div className="discount-input-wrapper">
                        <span className="discount-input-wrapper__label">Discount:</span>

                        <input
                            name="discount"
                            maxLength={3}
                            type="text"
                            className="sticker-input sticker-input--discount"
                            value={formData.discount}
                            onChange={onDiscountChange}
                            placeholder="0"
                            aria-label="Discount percentage"
                            autoComplete="off"
                            style={{ width: `${Math.max(1, String(formData.discount || '0').length)}ch` }}
                            required
                        />

                        <span className="discount-input-wrapper__suffix">%</span>
                    </div>
                )}

                {visible.promo && (
                    <div className="promo-input-wrapper">
                        <span className="promo-input-wrapper__label">Promo:</span>

                        <input
                            name="promo"
                            maxLength={8}
                            type="text"
                            className="sticker-input sticker-input--promo"
                            value={formData.promo}
                            onChange={onChange}
                            placeholder=""
                            aria-label="Promo"
                            autoComplete="off"
                            style={{ width: `${Math.max(1, String(formData.promo || '').length) + 0.5}ch` }}
                            required
                        />
                    </div>
                )}
            </div>

            <div className="main-inputs-container--block">
                {visible.phone && (
                    <input
                        name="phone"
                        maxLength={12} // наприклад: "+1" + 12 цифр. Піджени під свій ліміт
                        type="tel"
                        inputMode="tel"
                        className="sticker-input sticker-input--phone"
                        value={formData.phone}
                        onChange={onPhoneChange}
                        placeholder="Phone number"
                        autoComplete="off"
                        aria-label="Phone number"
                        required
                    />
                )}

                {visible.address && (
                    <textarea
                        ref={addressTextarea.ref}
                        name="address"
                        maxLength={60}
                        rows={1}
                        className="sticker-input sticker-input--address sticker-textarea"
                        value={formData.address}
                        onChange={addressTextarea.onChange}
                        onKeyDown={addressTextarea.onKeyDown}
                        placeholder="Address"
                        aria-label="Address"
                        autoComplete="off"
                        required
                    />
                )}
            </div>
        </div>
    );
};
