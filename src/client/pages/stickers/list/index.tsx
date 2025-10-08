import { use } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Link } from 'react-router';

import type { StickerListItem } from '../../../types';
import { UserContext } from '../../../context/user-context.tsx';

import './style.scss';
import Container from '@mui/material/Container';

const StickersListPage = () => {
    const { user } = use(UserContext)!;
    return (
        <Container maxWidth="xl" sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Button
                            component={Link}
                            to="/stickers/create"
                            variant="contained"
                            color="primary"
                            endIcon={<AddCircleIcon />}
                            fullWidth
                            sx={{ height: '100%', fontSize: 20 }}
                        >
                            Add new
                        </Button>
                    </Grid>
                    { user?.stickersList.map((sticker: StickerListItem) => (
                        <Grid key={sticker.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Card>
                                <CardMedia
                                    className="sticker-list-item-preview"
                                    sx={{
                                        height: 140,
                                        backgroundColor: sticker.style.background,
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component={Link}
                                        to={`/stickers/update/${sticker.id}`}
                                    >
                                        {sticker.info.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
        </Container>
    );
}

export default StickersListPage;
