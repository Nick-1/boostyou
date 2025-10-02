import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';

import ColorMarker from '../../color-marker';

import { ColorCode, ColorName, TextStyle} from '../../../enum';
import type { StickerFormData } from '../../../types';

import './style.scss'

interface StickerCreateFormProps {
    data: StickerFormData,
    submitHandler: (element: React.FormEvent<HTMLFormElement>) => void,
    onChangeTextFieldHandler: (element: React.ChangeEvent<HTMLInputElement>) => void,
    onChangeSelectHandler: (element: any) => void,
}

const StickerCreateForm = (props: StickerCreateFormProps) => {
    const { data, submitHandler, onChangeTextFieldHandler, onChangeSelectHandler } = props;

    return (
        <form className="sticker__form" onSubmit={submitHandler}>
            <FormControl sx={{ mb: 4 }} fullWidth>
                <TextField
                    id="stickerName"
                    name="stickerName"
                    label="Sticker Name"
                    variant="standard"
                    value={data.stickerName}
                    onChange={onChangeTextFieldHandler}
                    required
                />
            </FormControl>

            <Box display="flex" sx={{ width: '100%' }}>
                <FormControl sx={{ mb: 4, mr: 2 }} fullWidth variant="standard">
                    <InputLabel id="sticker-color-label">Sticker color</InputLabel>
                    <Select
                        labelId="sticker-color-label"
                        id="stickerColor"
                        name="stickerColor"
                        value={data.stickerColor}
                        onChange={onChangeSelectHandler}
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
                    </Select>
                </FormControl>
                <FormControl sx={{ mb: 4, mr: 2 }} fullWidth variant="standard">
                    <InputLabel id="text-color-label">Text color</InputLabel>
                    <Select
                        labelId="text-color-label"
                        id="textColor"
                        name="textColor"
                        value={data.textColor}
                        onChange={onChangeSelectHandler}
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
                        value={data.textStyle}
                        onChange={onChangeSelectHandler}
                        label="Text style"
                    >
                        <MenuItem value={TextStyle.NORMAL}>Normal</MenuItem>
                        <MenuItem value={TextStyle.BOLD}>Bold</MenuItem>
                        <MenuItem value={TextStyle.ITALIC}>Italic</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box>
                <FormControl sx={{ mb: 4 }} fullWidth>
                    <TextField
                        id="companyName"
                        name="companyName"
                        label="Company name"
                        variant="outlined"
                        value={data.companyName}
                        onChange={onChangeTextFieldHandler}
                        required
                    />
                </FormControl>
                <FormControl sx={{ mb: 4 }} fullWidth>
                    <TextField
                        id="promo"
                        name="promo"
                        label="Promo"
                        variant="outlined"
                        value={data.promo}
                        onChange={onChangeTextFieldHandler}
                    />
                </FormControl>
                <FormControl sx={{ mb: 4 }} fullWidth>
                    <TextField
                        id="discount"
                        name="discount"
                        label="Discount"
                        variant="outlined"
                        value={data.discount}
                        onChange={onChangeTextFieldHandler}
                    />
                </FormControl>
                <FormControl sx={{ mb: 4 }} fullWidth>
                    <TextField
                        id="qrCodeLink"
                        name="qrCodeLink"
                        label="Your link for QR Code"
                        variant="outlined"
                        value={data.qrCodeLink}
                        onChange={onChangeTextFieldHandler}
                    />
                </FormControl>
            </Box>

            <Button type="submit" variant="contained">Create sticker</Button>
        </form>
    )
}

export default StickerCreateForm;
