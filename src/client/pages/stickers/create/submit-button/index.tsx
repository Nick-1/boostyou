import type {FC} from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { RedactorMode } from '../enum.ts';

import './style.scss';

interface SubmitButtonProps {
    createHandler: () => void;
    updateHandler: () => void;
    mode?: RedactorMode;
}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
    const { mode, createHandler, updateHandler } = props;
    const currentMode = mode ? mode : RedactorMode.CREATE;

    return (
        <Box className="submit-button__container no-print">
            { currentMode === RedactorMode.CREATE && <Button onClick={createHandler} startIcon={<NoteAddIcon/>} variant="contained" size="large">Create</Button>}
            { currentMode === RedactorMode.UPDATE && <Button onClick={updateHandler} startIcon={<EditDocumentIcon />} variant="contained" size="large">Update</Button>}
        </Box>
    )
}
