import Button from '@mui/material/Button';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './style.scss';
import QrCode from '../../components/qr-code';



const StickerPage = () => {
    const textStyle = {
        NORMAL: 'normal',
        BOLD: 'bold',
        ITALIC: 'italic',
    }

    const stickerBg: Record<string, string> = {
        red: '#ff5948',
        green: '#9fdb86',
        yellow: '#efe372',
        blue: '#60adb7',
        orange: '#ff9442',
    }

    const color = {
        BLACK: 'black',
        WHITE: 'white',
        GREEN: 'green',
        BLUE: 'blue',
        YELLOW: 'yellow',
        ORANGE: 'orange',
        RED: 'red',
    }

    const [formData, setFormData] = useState({
        stickerName: '',
        companyName: 'Boost U',
        promo: 'Your add',
        discount: '20% discount',
        qrCodeLink: 'google.com',
        stickerColor: color.GREEN,
        textColor: 'black',
        textStyle: 'normal',
    });

    // оновлення відповідного поля при зміні
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

    // обробка відправлення форми
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <>
            <h1>Sticker Page</h1>
            <div className="sticker__container">
                <form className="sticker__form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Sticker Options</legend>
                        <div className="form__block">
                            <TextField
                                id="stickerName"
                                name="stickerName"
                                label="Sticker Name"
                                variant="standard"
                                value={formData.stickerName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form__block">
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="sticker-color-label">Sticker color</InputLabel>
                                <Select
                                    labelId="sticker-color-label"
                                    id="stickerColor"
                                    name="stickerColor"
                                    value={formData.stickerColor}
                                    onChange={handleSelectChange}
                                    label="Sticker color"
                                >
                                    <MenuItem value={color.RED}><span className="color-circle" style={{  backgroundColor: stickerBg[color.RED] }}></span> Red</MenuItem>
                                    <MenuItem value={color.GREEN}><span className="color-circle" style={{  backgroundColor: stickerBg[color.GREEN] }}></span> Green</MenuItem>
                                    <MenuItem value={color.BLUE}><span className="color-circle" style={{  backgroundColor: stickerBg[color.BLUE] }}></span> Blue</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form__block">
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="text-color-label">Text color</InputLabel>
                                <Select
                                    labelId="text-color-label"
                                    id="textColor"
                                    name="textColor"
                                    value={formData.textColor}
                                    onChange={handleSelectChange}
                                    label="Text color"
                                >
                                    <MenuItem value={color.BLACK}>Black</MenuItem>
                                    <MenuItem value={color.WHITE}>White</MenuItem>
                                    <MenuItem value={color.YELLOW}>Yellow</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form__block">
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="text-style-label">Text style</InputLabel>
                                <Select
                                    labelId="text-style-label"
                                    id="textStyle"
                                    name="textStyle"
                                    value={formData.textStyle}
                                    onChange={handleSelectChange}
                                    label="Text style"
                                >
                                    <MenuItem value={textStyle.NORMAL}>Normal</MenuItem>
                                    <MenuItem value={textStyle.BOLD}>Bold</MenuItem>
                                    <MenuItem value={textStyle.ITALIC}>Italic</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Company Details</legend>
                        <div className="form__block">
                            <TextField
                                id="companyName"
                                name="companyName"
                                label="Company name"
                                variant="standard"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form__block">
                            <TextField
                                id="promo"
                                name="promo"
                                label="Promo"
                                variant="standard"
                                value={formData.promo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__block">
                            <TextField
                                id="discount"
                                name="discount"
                                label="Discount"
                                variant="standard"
                                value={formData.discount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__block">
                            <TextField
                                id="qrCodeLink"
                                name="qrCodeLink"
                                label="Your link for QR Code"
                                variant="standard"
                                value={formData.qrCodeLink}
                                onChange={handleChange}
                            />
                        </div>
                    </fieldset>

                    <Button type="submit" variant="contained">Create sticker</Button>
                </form>

                {/* попередній перегляд стікера */}
                <div
                    className="sticker__preview"
                    style={{
                        //@ts-ignore
                        backgroundColor: stickerBg[formData.stickerColor],
                        color: formData.textColor,
                        fontWeight: formData.textStyle === 'bold' ? 'bold' : undefined,
                        fontStyle: formData.textStyle === 'italic' ? 'italic' : undefined,
                    }}
                >
                    <h2>{formData.companyName || 'Company Name'}</h2>
                    <p>{formData.promo || 'Promo text'}</p>
                    {formData.discount && <p>Discount: {formData.discount}</p>}

                    <QrCode link={formData.qrCodeLink} />
                </div>
            </div>
        </>
    );
};

// @ts-ignore
export default StickerPage;
