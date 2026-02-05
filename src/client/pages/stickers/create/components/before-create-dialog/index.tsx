import {type FC, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from '@mui/material';

type ContactDialogResult = {
  contactEmail: string;
};

type ContactDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (result: ContactDialogResult) => void;
};

export const ContactDetailsDialog: FC<ContactDialogProps> = ({ open, onClose, onConfirm }) => {
  const [contactEmail, setContactEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    const email = contactEmail.trim();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!email.includes('@')) {
      setError('Enter a valid email');
      return;
    }

    onConfirm({ contactEmail: email });

    setContactEmail('');
    setError(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Contact details</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
          Please enter your email so we can contact you.
        </Typography>

        <TextField
          autoFocus
          fullWidth
          label="Email"
          type="email"
          value={contactEmail}
          onChange={(e) => {
            setContactEmail(e.target.value);
            if (error) setError(null);
          }}
          error={Boolean(error)}
          helperText={error ?? ' '}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
};
