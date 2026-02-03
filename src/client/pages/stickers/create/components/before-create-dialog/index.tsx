import {type FC, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from '@mui/material';

type ContactDialogResult = {
  contactEmail?: string;
  contactPhone?: string;
};

type ContactDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (result: ContactDialogResult) => void;
};

export const ContactDetailsDialog: FC<ContactDialogProps> = ({ open, onClose, onConfirm }) => {
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    const email = contactEmail.trim();
    const phone = contactPhone.trim();

    if (!email && !phone) {
      setError('Please enter email or phone number');
      return;
    }

    if (email && !email.includes('@')) {
      setError('Enter a valid email');
      return;
    }

    if (phone) {
      const digits = phone.replace(/\D/g, '').length;
      if (digits < 7) {
        setError('Enter a valid phone number');
        return;
      }
    }

    onConfirm({
      contactEmail: email || undefined,
      contactPhone: phone || undefined,
    });

    setContactEmail('');
    setContactPhone('');
    setError(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Contact details</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
          Please enter email or phone number so we can contact you.
        </Typography>

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={contactEmail}
          onChange={(e) => {
            setContactEmail(e.target.value);
            if (error) setError(null);
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Phone"
          value={contactPhone}
          onChange={(e) => {
            setContactPhone(e.target.value);
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
