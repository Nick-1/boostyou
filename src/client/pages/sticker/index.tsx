import { useState } from 'react';
import { Container, Grid } from '@mui/material';

import Cup from '../../components/cup';
import StickerCreateForm from '../../components/forms/sticker-create';

import { ColorName, TextStyle } from '../../enum';
import type { StickerFormData } from '../../types';

import './style.scss';

const StickerPage = () => {
    const [formData, setFormData] = useState<StickerFormData>({
        stickerName: '',
        companyName: 'Boost U',
        promo: 'Your add',
        discount: '20% discount',
        qrCodeLink: 'https://boostyou.us',
        stickerColor: ColorName.GREEN,
        textColor: ColorName.BLACK,
        textStyle: TextStyle.NORMAL,
    });

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container>
            <Grid container spacing={5}>
                <Grid size={{ xs: 12, sm: 6 }} display='flex' justifyContent='flex-end'>
                    <StickerCreateForm
                        data={formData}
                        submitHandler={handleSubmit}
                        onChangeTextFieldHandler={handleChange}
                        onChangeSelectHandler={handleSelectChange}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} display='flex' spacing={2}>
                    <Cup data={formData} />
                </Grid>
            </Grid>
        </Container>
    );
};

// @ts-ignore
export default StickerPage;
