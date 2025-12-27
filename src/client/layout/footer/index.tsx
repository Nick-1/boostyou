import type { FC } from 'react';

import { Box, Typography } from '@mui/material';

const Footer: FC = () => {
  return (
    <Box
      className="no-print"
      component="footer"
      sx={{
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'white',
      }}
    >
        <Typography variant="body2">
            © 2025 Boostyou.us. All rights reserved.
        </Typography>
    </Box>
  );
};

export default Footer;
