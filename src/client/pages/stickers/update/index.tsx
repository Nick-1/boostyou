import { use } from 'react';
import { useParams } from 'react-router';

import CreateStickerForm from '../../../components/forms/create-sticker';
import { toFormValuesMapper } from '../../../components/forms/create-sticker/to-form-values.mapper.ts';
import { UserContext } from '../../../context/user-context.tsx';

const UpdateStickerPage = () => {
    const { user } = use(UserContext)!;
    const { stickerId } = useParams<{ stickerId: string }>();
    const stickerFields = user?.stickersList.find(sticker => sticker.id === Number(stickerId));
    const updateFields = toFormValuesMapper(stickerFields);

    return (
        <CreateStickerForm updateFields={updateFields} />
    );
};

export default UpdateStickerPage;
