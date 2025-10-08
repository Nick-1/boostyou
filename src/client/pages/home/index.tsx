import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import './style.scss';
import {Link} from 'react-router';

const HomePage = () => {
    const images = useMemo(
        () => [
            '/home-page/cup-1.jpg',
            '/home-page/cup-2.jpg',
            '/home-page/cup-3.jpg',
            '/home-page/cup-4.jpg',
        ],
        []
    );

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000); // change slide every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <Container className="home-page-container full-screen-page-container" maxWidth="xl">
            <Grid className="home-page-grid-wrapper" container spacing={2}>
                <Grid className="home-moto" size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <Typography
                        gutterBottom
                        variant="h3"
                        textAlign="center"
                    >
                        Everyone who drinks coffee will know about your business!
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to={`/stickers/create`}
                    >
                        Boost!
                    </Button>
                </Grid>
                <Grid className="home-slider" size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <div className="fade-slider">
                        {images.map((src, i) => (
                            <img
                                key={src}
                                src={src}
                                alt={`slide-${i + 1}`}
                                className={`slide ${i === index ? 'active' : ''}`}
                                draggable={false}
                            />)
                        )}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
