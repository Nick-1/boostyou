import Container from '@mui/material/Container';

import CreateStickerForm from '../../../components/forms/create-sticker';

import './style.scss';

const CreateStickerPage = () => {
    return (
        <Container className="create-sticker__container" maxWidth="xl">
            <CreateStickerForm />
        </Container>

    );
};

export default CreateStickerPage;
