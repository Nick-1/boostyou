import { type ChangeEvent, type FC, use, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { UserContext } from '../../../context/user-context.tsx';
import type { StickerData } from '../../../types';
import { CLIENT_ROUTE } from '../../../common/routes.ts';

import { SubmitButton } from './submit-button';
import { ImageLayout } from './image-layout.tsx';
import {RedactorMode, StickerForm, StickerStyle} from './enum.ts';

import './style.scss';
import './input-styles.scss';
import './control-panel-styles.scss';
import {QrCodeAndLogo} from './qr-code-and-logo/qr-code-and-logo.tsx';

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

    const addressRef = useRef<HTMLTextAreaElement>(null);
    const autoResizeTextarea = (el: HTMLTextAreaElement) => {
        el.style.height = '0px';
        el.style.height = `${el.scrollHeight}px`;
    };
    const addressInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.target;

        // не даємо більше 2 рядків
        const lines = el.value.split('\n');
        const nextValue = lines.slice(0, 2).join('\n');

        if (nextValue !== el.value) {
            el.value = nextValue; // підчистили зайві рядки
        }

        setFormData(prev => ({ ...prev, address: el.value }));

        // авто-висота під 1-2 рядки
        autoResizeTextarea(el);
    };
    const addressKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Enter') return;

        const el = e.currentTarget;
        const linesCount = el.value.split('\n').length;

        // якщо вже 2 рядки — блокуємо Enter
        if (linesCount >= 2) {
            e.preventDefault();
        }
    };

    const { user, addSticker, updateSticker } = use(UserContext)!;

    const navigate = useNavigate();
    const { stickerId } = useParams<{ stickerId: string }>();

    const formValues = updateFields ? updateFields : defaultFormValues;
    const [formData, setFormData] = useState<StickerData>(formValues);
    const redactorMode = updateFields ? RedactorMode.UPDATE : RedactorMode.CREATE;

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // const generateQRCodeHandler = (link: string) => {
    //     setFormData(prev => ({ ...prev, qrCodeLink: link }));
    // };

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
                      <div className="main-inputs-container">
                          <div className="main-inputs-container--block">
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
                                  maxLength={18}
                                  className="sticker-input sticker-input--highlighted-text"
                                  style={{ backgroundColor: formData.highlightedBgColor }}
                                  value={formData.highlightedText}
                                  onChange={inputChangeHandler}
                                  placeholder="Highlighted text"
                                  aria-label="Highlighted tex"
                                  autoComplete="off"
                                  spellCheck={false}
                                  required
                              />
                          </div>

                          <div className="main-inputs-container--block">
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
                                      required
                                      style={{ width: `${Math.max(1, String(formData.discount || '0').length)}ch` }}
                                  />

                                  <span className="discount-input-wrapper__suffix">%</span>
                              </div>
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
                                      aria-label="Discount percentage"
                                      autoComplete="off"
                                      required
                                      style={{ width: `${Math.max(1, String(formData.promo || '0').length) + 0.5}ch` }}
                                  />
                              </div>
                          </div>

                          <div className="main-inputs-container--block">
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

                              <textarea
                                  ref={addressRef}
                                  name="address"
                                  maxLength={60}
                                  rows={1} // стартує з 1 рядка, далі росте
                                  className="sticker-input sticker-input--address sticker-textarea"
                                  value={formData.address}
                                  onChange={addressInputHandler}
                                  onKeyDown={addressKeyDownHandler}
                                  placeholder="Address"
                                  aria-label="Address"
                                  autoComplete="off"
                                  required
                              />
                          </div>
                      </div>

                        <QrCodeAndLogo />
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
