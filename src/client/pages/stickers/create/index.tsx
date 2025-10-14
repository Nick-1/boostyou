import Container from '@mui/material/Container';

import CreateStickerForm from '../../../components/forms/create-sticker';

import './style.scss';

const CreateStickerPage = () => {
    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", width: '100vw' }}
            maxWidth="xl"
        >
            <CreateStickerForm />
        </Container>

    );
};

export default CreateStickerPage;
