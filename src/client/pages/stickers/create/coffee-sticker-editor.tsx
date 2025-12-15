import React, { type ChangeEvent, type FC, use, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, Divider, FormControlLabel, Stack, Switch, Tooltip, Typography } from '@mui/material';

import { UserContext } from '../../../context/user-context.tsx';
import type { StickerData } from '../../../types';
import { CLIENT_ROUTE } from '../../../common/routes.ts';

import { SubmitButton } from './submit-button';
import { ImageLayout } from './image-layout.tsx';
import { RedactorMode, StickerForm, StickerStyle } from './enum.ts';

import './style.scss';
import './input-styles.scss';
import './control-panel-styles.scss';
import { QrCodeAndLogo } from './qr-code-and-logo/qr-code-and-logo.tsx';

interface CoffeeStickerEditorPageProps {
    updateFields?: StickerData | null;
}

const defaultFormValues = {
    name: '',
    title: '',
    highlightedText: '',
    discount: '5',
    promo: 'new2025',
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

    // title textarea (only-title mode)
    const titleRef = useRef<HTMLTextAreaElement>(null);

    // address textarea (max 2 lines)
    const addressRef = useRef<HTMLTextAreaElement>(null);

    const { user, addSticker, updateSticker } = use(UserContext)!;

    const navigate = useNavigate();
    const { stickerId } = useParams<{ stickerId: string }>();

    const formValues = updateFields ? updateFields : defaultFormValues;
    const [formData, setFormData] = useState<StickerData>(formValues);

    const redactorMode = updateFields ? RedactorMode.UPDATE : RedactorMode.CREATE;

    // ✅ visibility toggles (controlled by MUI switches)
    const [visible, setVisible] = useState({
        highlightedText: true,
        discount: true,
        promo: true,
        phone: true,
        address: true,
        qr: true,
    });

    const toggleVisible = (key: keyof typeof visible) =>
        setVisible((prev) => ({ ...prev, [key]: !prev[key] }));

    // ✅ only title -> 3-line title textarea
    const onlyTitleVisible =
        !visible.highlightedText &&
        !visible.discount &&
        !visible.promo &&
        !visible.phone &&
        !visible.address &&
        !visible.qr;

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ---------- Title textarea: max 3 lines (explicit + soft wrap) ----------
    const autoResizeWithMaxLines = (el: HTMLTextAreaElement, maxLines: number) => {
        const style = window.getComputedStyle(el);
        const lineHeight = Number.parseFloat(style.lineHeight || '0') || 0;
        const paddingTop = Number.parseFloat(style.paddingTop || '0') || 0;
        const paddingBottom = Number.parseFloat(style.paddingBottom || '0') || 0;

        el.style.height = '0px';
        el.style.height = `${el.scrollHeight}px`;

        if (lineHeight > 0) {
            const maxHeight = paddingTop + paddingBottom + lineHeight * maxLines;
            if (el.scrollHeight > maxHeight) el.style.height = `${maxHeight}px`;
        }
    };

    const clampTextareaToMaxLines = (el: HTMLTextAreaElement, maxLines: number) => {
        const style = window.getComputedStyle(el);
        const lineHeight = Number.parseFloat(style.lineHeight || '0') || 0;
        const paddingTop = Number.parseFloat(style.paddingTop || '0') || 0;
        const paddingBottom = Number.parseFloat(style.paddingBottom || '0') || 0;

        if (!lineHeight) return;

        const maxHeight = paddingTop + paddingBottom + lineHeight * maxLines;

        // trim until it fits (covers soft-wrap overflow)
        let safety = 5000;
        while (el.scrollHeight > maxHeight && el.value.length > 0 && safety-- > 0) {
            el.value = el.value.slice(0, -1);
            el.style.height = '0px';
            el.style.height = `${el.scrollHeight}px`;
        }
    };

    const titleInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.target;

        // limit explicit new lines to 3
        const lines = el.value.split('\n');
        if (lines.length > 3) el.value = lines.slice(0, 3).join('\n');

        // limit soft-wrapped lines to 3
        autoResizeWithMaxLines(el, 3);
        clampTextareaToMaxLines(el, 3);
        autoResizeWithMaxLines(el, 3);

        setFormData((prev) => ({ ...prev, title: el.value }));
    };

    const titleKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Enter') return;

        const el = e.currentTarget;
        const explicitLines = el.value.split('\n').length;

        if (explicitLines >= 3) e.preventDefault();
    };

    useEffect(() => {
        if (onlyTitleVisible && titleRef.current) {
            autoResizeWithMaxLines(titleRef.current, 3);
        }
    }, [onlyTitleVisible, formData.title]);

    // ---------- Address textarea: max 2 lines ----------
    const autoResizeAddress = (el: HTMLTextAreaElement) => {
        el.style.height = '0px';
        el.style.height = `${el.scrollHeight}px`;
    };

    const addressInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.target;

        const lines = el.value.split('\n');
        const nextValue = lines.slice(0, 2).join('\n');
        if (nextValue !== el.value) el.value = nextValue;

        setFormData((prev) => ({ ...prev, address: el.value }));
        autoResizeAddress(el);
    };

    const addressKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Enter') return;

        const el = e.currentTarget;
        const linesCount = el.value.split('\n').length;
        if (linesCount >= 2) e.preventDefault();
    };

    useEffect(() => {
        if (visible.address && addressRef.current) {
            autoResizeAddress(addressRef.current);
        }
    }, [visible.address, formData.address]);

    const onColorChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const createStickerHandler = () => {
        const id = new Date().getTime();

        if (formRef.current && !formRef.current.reportValidity()) return;

        addSticker({ ...formData, id });
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
                <ImageLayout />

                <input
                    name="name"
                    maxLength={20}
                    className="sticker-input sticker-input--name"
                    value={formData.name}
                    onChange={inputChangeHandler}
                    placeholder="Sticker name"
                    aria-label="Sticker name"
                    autoComplete="off"
                    spellCheck={false}
                />

                <div className="sticker__layer">
                    <form ref={formRef}>
                        <div className="main-inputs-container">
                            <div className="main-inputs-container--block">
                                {/* ✅ title is always present and the ONLY required field */}
                                {onlyTitleVisible ? (
                                    <textarea
                                        ref={titleRef}
                                        name="title"
                                        maxLength={60}
                                        rows={1}
                                        className="sticker-input sticker-input--title sticker-textarea sticker-textarea--title"
                                        style={{ color: formData.titleColor }}
                                        value={formData.title}
                                        onChange={titleInputHandler}
                                        onKeyDown={titleKeyDownHandler}
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
                                        style={{ color: formData.titleColor }}
                                        value={formData.title}
                                        onChange={inputChangeHandler}
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
                                        style={{ backgroundColor: formData.highlightedBgColor }}
                                        value={formData.highlightedText}
                                        onChange={inputChangeHandler}
                                        placeholder="Highlighted text"
                                        aria-label="Highlighted text"
                                        autoComplete="off"
                                        spellCheck={false}
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
                                            onChange={inputChangeHandler}
                                            placeholder="0"
                                            aria-label="Discount percentage"
                                            autoComplete="off"
                                            style={{ width: `${Math.max(1, String(formData.discount || '0').length)}ch` }}
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
                                            onChange={inputChangeHandler}
                                            placeholder="0"
                                            aria-label="Promo"
                                            autoComplete="off"
                                            style={{ width: `${Math.max(1, String(formData.promo || '0').length) + 0.5}ch` }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="main-inputs-container--block">
                                {visible.phone && (
                                    <input
                                        name="phone"
                                        maxLength={12}
                                        type="tel"
                                        className="sticker-input sticker-input--phone"
                                        value={formData.phone}
                                        onChange={inputChangeHandler}
                                        placeholder="Phone number"
                                        autoComplete="off"
                                        aria-label="Phone number"
                                    />
                                )}

                                {visible.address && (
                                    <textarea
                                        ref={addressRef}
                                        name="address"
                                        maxLength={60}
                                        rows={1}
                                        className="sticker-input sticker-input--address sticker-textarea"
                                        value={formData.address}
                                        onChange={addressInputHandler}
                                        onKeyDown={addressKeyDownHandler}
                                        placeholder="Address"
                                        aria-label="Address"
                                        autoComplete="off"
                                    />
                                )}
                            </div>
                        </div>

                        {visible.qr && <QrCodeAndLogo />}
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

                    {/* ✅ MUI controls */}
                    <Box sx={{ mt: 1, width: '100%' }}>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
                            Fields
                        </Typography>

                        <Stack spacing={0.5} sx={{ px: 1 }}>
                            <Tooltip title="Toggle Highlighted text" placement="left">
                                <FormControlLabel
                                    sx={{ m: 0, justifyContent: 'space-between', width: '100%' }}
                                    label={<Typography variant="caption">HL</Typography>}
                                    labelPlacement="start"
                                    control={
                                        <Switch size="small" checked={visible.highlightedText} onChange={() => toggleVisible('highlightedText')} />
                                    }
                                />
                            </Tooltip>

                            <Tooltip title="Toggle Discount" placement="left">
                                <FormControlLabel
                                    sx={{ m: 0, justifyContent: 'space-between', width: '100%' }}
                                    label={<Typography variant="caption">Disc</Typography>}
                                    labelPlacement="start"
                                    control={<Switch size="small" checked={visible.discount} onChange={() => toggleVisible('discount')} />}
                                />
                            </Tooltip>

                            <Tooltip title="Toggle Promo" placement="left">
                                <FormControlLabel
                                    sx={{ m: 0, justifyContent: 'space-between', width: '100%' }}
                                    label={<Typography variant="caption">Promo</Typography>}
                                    labelPlacement="start"
                                    control={<Switch size="small" checked={visible.promo} onChange={() => toggleVisible('promo')} />}
                                />
                            </Tooltip>

                            <Tooltip title="Toggle Phone" placement="left">
                                <FormControlLabel
                                    sx={{ m: 0, justifyContent: 'space-between', width: '100%' }}
                                    label={<Typography variant="caption">Phone</Typography>}
                                    labelPlacement="start"
                                    control={<Switch size="small" checked={visible.phone} onChange={() => toggleVisible('phone')} />}
                                />
                            </Tooltip>

                            <Tooltip title="Toggle Address" placement="left">
                                <FormControlLabel
                                    sx={{ m: 0, justifyContent: 'space-between', width: '100%' }}
                                    label={<Typography variant="caption">Addr</Typography>}
                                    labelPlacement="start"
                                    control={<Switch size="small" checked={visible.address} onChange={() => toggleVisible('address')} />}
                                />
                            </Tooltip>

                            <Tooltip title="Toggle QR & Logo" placement="left">
                                <FormControlLabel
                                    sx={{ m: 0, justifyContent: 'space-between', width: '100%' }}
                                    label={<Typography variant="caption">QR</Typography>}
                                    labelPlacement="start"
                                    control={<Switch size="small" checked={visible.qr} onChange={() => toggleVisible('qr')} />}
                                />
                            </Tooltip>
                        </Stack>
                    </Box>
                </aside>

                <SubmitButton mode={redactorMode} updateHandler={updateStickerHandler} createHandler={createStickerHandler} />
            </div>
        </div>
    );
};

export default CoffeeStickerEditorPage;
