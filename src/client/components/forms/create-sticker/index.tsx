import {use, useState} from 'react';
import { useNavigate, useParams } from 'react-router';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import ColorMarker from '../../color-marker';
import QRCodeModal from '../qr-code-modal';
import { ColorCode, ColorName, TextStyle } from '../../../enum';
import type { StickerFormData } from '../../../types';
import { UserContext } from '../../../context/user-context.tsx';

import { toStickerItemMapper } from './to-sticker-item.mapper.ts';

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
    stickerColor: ColorName.GREEN,
    textColor: ColorName.BLACK,
    textStyle: TextStyle.NORMAL,
}

const CreateStickerForm = (props: CreateStickerFormProps) => {
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
        addSticker(toStickerItemMapper(formData));
        navigate('/stickers/list');
    };

    const updateHandler = () => {
        if (!stickerId || !user) {
            navigate('/stickers/list');
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
        <div className="create-sticker__container">
            <div className="create-sticker__form-wrapper">
                <form className="create-sticker__form">
                    <input
                        id="stickerName"
                        maxLength={16}
                        className="create-sticker__input"
                        name="stickerName"
                        placeholder="Sticker Name"
                        value={formData.stickerName}
                        onChange={handleChange}
                        required
                    />

                    <Box className="create-sticker__style-inputs-container">
                        <FormControl sx={{ mb: 4, mr: 2 }} fullWidth variant="standard">
                            <InputLabel id="sticker-color-label">Sticker color</InputLabel>
                            <Select
                                labelId="sticker-color-label"
                                id="stickerColor"
                                name="stickerColor"
                                size="small"
                                value={formData.stickerColor}
                                onChange={handleSelectChange}
                                label="Sticker color"
                            >
                                <MenuItem value={ColorName.RED}>
                                    <ColorMarker color={ColorCode.RED} label="Red" />
                                </MenuItem>
                                <MenuItem value={ColorName.GREEN}>
                                    <ColorMarker color={ColorCode.GREEN} label="Green" />
                                </MenuItem>
                                <MenuItem value={ColorName.BLUE}>
                                    <ColorMarker color={ColorCode.BLUE} label="Blue" />
                                </MenuItem>
                                <MenuItem value={ColorName.ORANGE}>
                                    <ColorMarker color={ColorCode.ORANGE} label="Orange" />
                                </MenuItem>
                                <MenuItem value={ColorName.BLACK}>
                                    <ColorMarker color={ColorCode.BLACK} label="Black" />
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ mb: 4, mr: 2 }} fullWidth variant="standard">
                            <InputLabel id="text-color-label">Text color</InputLabel>
                            <Select
                                labelId="text-color-label"
                                id="textColor"
                                name="textColor"
                                size="small"
                                value={formData.textColor}
                                onChange={handleSelectChange}
                                label="Text color"
                            >
                                <MenuItem value={ColorName.BLACK}>
                                    <ColorMarker color={ColorCode.BLACK} label="Black" />
                                </MenuItem>
                                <MenuItem value={ColorName.WHITE}>
                                    <ColorMarker color={ColorCode.WHITE} label="White" />
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ mb: 4, }} fullWidth variant="standard">
                            <InputLabel id="text-style-label">Text style</InputLabel>
                            <Select
                                labelId="text-style-label"
                                id="textStyle"
                                name="textStyle"
                                size="small"
                                value={formData.textStyle}
                                onChange={handleSelectChange}
                                label="Text style"
                            >
                                <MenuItem value={TextStyle.NORMAL}>Normal</MenuItem>
                                <MenuItem value={TextStyle.BOLD}>Bold</MenuItem>
                                <MenuItem value={TextStyle.ITALIC}>Italic</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <div
                        className="sticker__preview"
                        style={{
                            //@ts-ignore
                            backgroundColor: ColorCode[formData.stickerColor],
                            color: formData.textColor,
                            fontWeight: formData.textStyle === 'bold' ? 'bold' : undefined,
                            fontStyle: formData.textStyle === 'italic' ? 'italic' : undefined,
                        }}
                    >
                        <input
                            id="companyName"
                            maxLength={12}
                            className="create-sticker__input"
                            name="companyName"
                            placeholder="Your Company"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            id="service"
                            maxLength={20}
                            className="create-sticker__input"
                            name="service"
                            placeholder="Your Service"
                            value={formData.service}
                            onChange={handleChange}
                        />

                        <input
                            id="discount"
                            maxLength={12}
                            className="create-sticker__input"
                            name="discount"
                            placeholder="Your Discount"
                            value={formData.discount}
                            onChange={handleChange}
                        />

                        <input
                            id="promo"
                            className="create-sticker__input"
                            name="promo"
                            placeholder="Your Promo"
                            value={formData.promo}
                            onChange={handleChange}
                        />

                        <QRCodeModal
                            updateLinkField={formValues?.qrCodeLink}
                            onClickCreateHandler={onClickGenerateQRCodeHandler}
                        />

                        <Box className="create-sticker__input-user-contacts">
                            <input
                                id="address"
                                maxLength={20}
                                className="create-sticker__input"
                                name="address"
                                placeholder="Your address"
                                value={formData.address}
                                onChange={handleChange}
                            />

                            <input
                                id="phone"
                                maxLength={20}
                                type="tel"
                                className="create-sticker__input"
                                name="phone"
                                placeholder="Your phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Box>
                    </div>
                </form>
            </div>

            <Box className="create-sticker__submit-container">
                { manageSubmitButton() }
            </Box>
        </div>
    )
}

// @ts-ignore
export default CreateStickerForm;
