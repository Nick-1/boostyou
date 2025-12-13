import { use } from 'react';
import { Link } from 'react-router';

import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import type { StickerListItem } from '../../../types';
import { UserContext } from '../../../context/user-context.tsx';
import { CLIENT_ROUTE } from '../../../common/routes.ts';
import { MainPageContainer } from '../../../layout/main-page-container';

import './style.scss';

const StickersListPage = () => {
    const { user } = use(UserContext)!;

    return (
        <MainPageContainer>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Button
                            component={Link}
                            to={CLIENT_ROUTE.stickers.create}
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
                                    component={Link}
                                    to={`${CLIENT_ROUTE.stickers.update}/${sticker.id}`}
                                    className="sticker-list-item-preview"
                                    sx={{
                                        height: 140,
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component={Link}
                                        to={`${CLIENT_ROUTE.stickers.update}/${sticker.id}`}
                                    >
                                        {sticker.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
        </MainPageContainer>
    );
}

export default StickersListPage;
