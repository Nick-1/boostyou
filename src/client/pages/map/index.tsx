import { Container } from '@mui/material';

import './style.scss';
import MapView from '../../components/map';

const MapPage = () => {
    return (
        <Container className="full-screen-page-container" maxWidth="xl" sx={{ p: 2 }}>
            <MapView />
        </Container>
    )
}

export default MapPage;
