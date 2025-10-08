import Container from '@mui/material/Container';

import CreateStickerForm from '../../../components/forms/create-sticker';

import './style.scss';

const CreateStickerPage = () => {
    return (
        <Container
            className="full-screen-page-container"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}
            maxWidth="xl"
        >
            <CreateStickerForm />
        </Container>

    );
};

export default CreateStickerPage;
