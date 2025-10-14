import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';

import MapView from '../../components/map';

import './style.scss';

const MapPage = () => {
    return (
        <Container className="full-screen-page-container align-items-center" maxWidth="xl">
            <Grid className="grid-order__container" container spacing={2}>
                <Grid className="map__container" size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <MapView />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <Typography
                        gutterBottom
                        variant="h3"
                        textAlign="center"
                    >
                        Everyone who drinks coffee will know about your business!
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MapPage;
