import {use, useRef, useState} from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, FormControl } from '@mui/material';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import { ColorName, TextStyle } from '../../../enum';
import type { StickerFormData } from '../../../types';
import { UserContext } from '../../../context/user-context.tsx';
import { toStickerItemMapper } from './to-sticker-item.mapper.ts';

import StickerColorSelect from './sticker-color-select';
import TextStyleStickerSelect from './text-style-select';
import StickerPreviewInputs from './sticker-preview';

import { STICKER_COLOR_SELECT_OPTIONS, TEXT_COLOR_SELECT_OPTIONS, TEXT_STYLE_SELECT_OPTIONS } from './constants.ts';

import './style.scss';


interface CreateStickerFormProps {
    updateFields?: StickerFormData | null;
}

const defaultFormValues = {
    stickerName: '',
    companyName: '',
    promo: '',
    discount: '',
    service: '',
    qrCodeLink: '',
    address: '',
    phone: '',
    stickerColor: ColorName.WHITE,
    textColor: ColorName.BLACK,
    textStyle: TextStyle.NORMAL,
}

const CreateStickerForm = (props: CreateStickerFormProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const { updateFields } = props
    const { user, addSticker, updateSticker } = use(UserContext)!;
    const navigate = useNavigate();
    const { stickerId } = useParams<{ stickerId: string }>();
    const formValues = updateFields ? updateFields : defaultFormValues;
    const [formData, setFormData] = useState<StickerFormData>(formValues);

    const onClickGenerateQRCodeHandler = (link: string) => {
        setFormData(prev => ({
            ...prev,
            qrCodeLink: link,
        }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: any) => {
        const { name, value } = e.target as { name: string; value: string };
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const createHandler = () => {
        if (formRef.current && !formRef.current.reportValidity()) {
            return; // required поля не заповнені
        }

        addSticker(toStickerItemMapper(formData));
        navigate('/order/create');
    };

    const updateHandler = () => {
        if (!stickerId || !user) {
            navigate('/stickers/list');
            return;
        }

        if (formRef.current && !formRef.current.reportValidity()) {
            return;
        }

        const id = Number(stickerId);
        const updatedItem = { ...toStickerItemMapper(formData), id };
        updateSticker(id, updatedItem);
        navigate('/stickers/list');
    };

    const manageSubmitButton = () => {
        if (updateFields) {
            return (
                <Button
                    sx={{ width: '100%', borderRadius: 0, height: 60 }}
                    variant="contained"
                    onClick={updateHandler}
                    endIcon={<EditIcon />}
                >
                    Update sticker
                </Button>
            )
        }

        return (
            <Button
                sx={{ width: '100%', borderRadius: 0, height: 60 }}
                variant="contained"
                onClick={createHandler}
                endIcon={<StickyNote2Icon />}
            >
                Create sticker
            </Button>
        )
    }

    return (
        <>
            <div className="create-sticker__form-wrapper">
                <form ref={formRef} className="create-sticker__form">
                    <input
                        id="stickerName"
                        maxLength={20}
                        className="create-sticker__input"
                        name="stickerName"
                        placeholder="Sticker Name"
                        value={formData.stickerName}
                        onChange={handleChange}
                        required
                    />

                    <Box className="create-sticker__style-inputs-container">
                        <FormControl sx={{ mb: 4, mr: 2 }} fullWidth variant="standard">
                            <StickerColorSelect
                                name="stickerColor"
                                defaultValue={formData.stickerColor}
                                list={STICKER_COLOR_SELECT_OPTIONS}
                                onChange={handleSelectChange}
                            />
                        </FormControl>
                        <FormControl sx={{ mb: 4, mr: 2 }} fullWidth variant="standard">
                            <StickerColorSelect
                                name="textColor"
                                defaultValue={formData.textColor}
                                list={TEXT_COLOR_SELECT_OPTIONS}
                                onChange={handleSelectChange}
                            />
                        </FormControl>
                        <FormControl sx={{ mb: 4, }} fullWidth variant="standard">
                            <TextStyleStickerSelect
                                defaultValue={formData.textStyle}
                                list={TEXT_STYLE_SELECT_OPTIONS}
                                onChange={handleSelectChange}
                            />
                        </FormControl>
                    </Box>

                    <div
                        className="sticker__preview"
                        style={{
                            backgroundImage: `url(/sticker/${formData.stickerColor}.png)`,
                            color: formData.textColor,
                            fontWeight: formData.textStyle === 'bold' ? 'bold' : undefined,
                            fontStyle: formData.textStyle === 'italic' ? 'italic' : 'normal',
                        }}
                    >
                        <StickerPreviewInputs
                            onChange={handleChange}
                            data={formData}
                            onClickGenerateQRCodeHandler={onClickGenerateQRCodeHandler}
                        />
                    </div>
                </form>
            </div>

            <Box className="create-sticker__submit-container">
                { manageSubmitButton() }
            </Box>
        </>
    )
}

// @ts-ignore
export default CreateStickerForm;
