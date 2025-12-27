import type { Dispatch, FC, RefObject, SetStateAction, ChangeEvent } from 'react';
import type { StickerData } from '../../../../../types';
import type { StickerVisibleFields } from '../../hooks/useStickerFieldVisibility.ts';
import {StickerMainFields} from '../sticker-main-fields';
import {QrCodeAndLogo} from '../qr-code-and-logo';

type Props = {
    formRef: RefObject<HTMLFormElement | null>;
    formData: StickerData;
    setFormData: Dispatch<SetStateAction<StickerData>>;
    visible: StickerVisibleFields;
    onlyTitleVisible: boolean;
};

export const StickerEditorLayer: FC<Props> = ({ formRef, formData, setFormData, visible, onlyTitleVisible }) => {
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const onTitleValueChange = (next: string) => setFormData((p) => ({ ...p, title: next }));
    const onAddressValueChange = (next: string) => setFormData((p) => ({ ...p, address: next }));

    return (
        <>
            <input
              name="name"
              form="sticker-form"
              maxLength={20}
              className="sticker-input sticker-input--name no-print"
              value={formData.name}
              onChange={inputChangeHandler}
              placeholder="Sticker name"
              aria-label="Sticker name"
              autoComplete="off"
              spellCheck={false}
              required
            />

            <div className="sticker__layer">
                <form ref={formRef} id="sticker-form" className="sticker__content">
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
                        logoUrl={formData.logoUrl}
                        logoFile={formData.logoFile}
                        onLogoChange={(file) => setFormData((p) => ({ ...p, logoFile: file }))}
                        qrCodeLink={formData.qrCodeLink}
                        onQrCodeLinkChange={(link) => setFormData((p) => ({ ...p, qrCodeLink: link }))}
                    />
                </form>
            </div>
        </>
    );
};
