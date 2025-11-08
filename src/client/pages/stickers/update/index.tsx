import { use } from 'react';
import { useParams } from 'react-router';

import { UserContext } from '../../../context/user-context.tsx';
import CoffeeStickerEditorPage from '../create-prototype';

const UpdateStickerPage = () => {
    const { user } = use(UserContext)!;
    const { stickerId } = useParams<{ stickerId: string }>();
    const stickerFields = user?.stickersList.find(sticker => sticker.id === Number(stickerId));

    return (
        <CoffeeStickerEditorPage updateFields={stickerFields} />
    );
};

export default UpdateStickerPage;
