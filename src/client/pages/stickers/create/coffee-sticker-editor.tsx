import { type FC, use, useRef, useState, useEffect } from 'react';
import { Alert, Dialog } from '@mui/material';
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

import { createSticker } from '../../../../modules/stickers/api/stickers.api.ts';
import { ContactDetailsDialog } from './components/before-create-dialog';

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

    const [contactDialogOpen, setContactDialogOpen] = useState(false);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

    useEffect(() => {
        if (!successSnackbarOpen) return;

        const timer = setTimeout(() => {
            setSuccessSnackbarOpen(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [successSnackbarOpen]);

    const createStickerHandler = () => {
        // First validate the form fields; only then show the contact popup
        if (formRef.current && !formRef.current.reportValidity()) return;

        setContactDialogOpen(true);
    };

    const confirmCreateStickerHandler = async ({ contactEmail, contactPhone }: { contactEmail?: string; contactPhone?: string }) => {
        const id = new Date().getTime();

        const payload = { ...formData, logoFile: null };
        addSticker({ ...payload, id });

        await createSticker({
            name: formData.name,
            title: formData.title,
            highlightedText: formData.highlightedText,
            discount: formData.discount,
            promo: formData.promo,
            address: formData.address,
            qrCodeLink: formData.qrCodeLink,
            contactEmail,
            contactPhone,
        } as any);

        setContactDialogOpen(false);
        setSuccessSnackbarOpen(true);
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

            <ContactDetailsDialog
                open={contactDialogOpen}
                onClose={() => setContactDialogOpen(false)}
                onConfirm={confirmCreateStickerHandler}
            />

            <Dialog
              open={successSnackbarOpen}
              onClose={() => setSuccessSnackbarOpen(false)}
            >
                <Alert severity="success" variant="filled">
                    Message sent!
                </Alert>
            </Dialog>

            <SubmitButton mode={redactorMode} updateHandler={updateStickerHandler} createHandler={createStickerHandler} />
        </div>
    );
};

export default CoffeeStickerEditorPage;
