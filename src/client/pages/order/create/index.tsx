import {use, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router';


import Container from '@mui/material/Container';
import { Grid, Stack, TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import type { CoffeePlace } from '../../../types';
import MapView from '../../../components/map';

import { UserContext } from '../../../context/user-context.tsx';

import './style.scss';

const OrderPage = () => {
    const { user } = use(UserContext)!;
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    const [searchValue, setSearchValue] = useState<string>('');
    const [searchOption, setSearchOption] = useState<string | null>(null);
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
    const [stickerId, setStickerId] = useState<string>('');
    const [quantityInput, setQuantityInput] = useState<string>('10');
    const PRICE_PER_STICKER = 1.39;

    const parsedQty = parseInt(quantityInput, 10);
    const effectiveQuantity = Number.isNaN(parsedQty) ? 10 : Math.max(10, parsedQty);

    const searchPlaces: CoffeePlace[] = [
        {
            id: 1,
            ownerId: 2,
            name: 'Farmer\'s milk',
            address: '1801 N Young Cir, Hollywood',
            location: { lat: 26.0125373, lng: -80.1439554 },
        },
        {
            id: 2,
            ownerId: 2,
            name: 'The Melbean Coffee Shop',
            address: '1739 Tyler St, Hollywood',
            location: { lat: 26.0129336, lng: -80.1453584 },
        },
        {
            id: 3,
            ownerId: 2,
            name: 'Le Cafe In',
            address: '1866 N Young Cir, Hollywood',
            location: { lat: 26.0121772, lng: -80.1448132 },
        },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current && !formRef.current.reportValidity()) {
            return;
        }

        console.info('user', user?.stickersList);

        navigate('/order/payment', { state: { effectiveQuantity, PRICE_PER_STICKER } });
    };

    useEffect(() => {
        console.info('user', user?.stickersList);
    })

    return (
        <Container className="full-screen-page-container align-items-center" maxWidth="xl">
            <Grid className="grid-order__container" container spacing={2}>
                <Grid className="map__container" size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <MapView
                        data={searchPlaces}
                        selectedPlaceId={selectedPlaceId}
                        onMarkerSelect={(place) => {
                          setSearchOption(place.name);
                          setSearchValue(place.name);
                          setSelectedPlaceId(place.id);
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <form ref={formRef} onSubmit={handleSubmit}>
                      <Stack spacing={2} sx={{ p: 2 }}>
                        {/* 1) Select with search (Autocomplete over array, with input search) */}
                        <Autocomplete
                          freeSolo
                          options={searchPlaces.map((place) => place.name)}
                          value={searchOption}
                          onChange={(_, newValue) => {
                              setSearchOption(newValue);
                              const name = typeof newValue === 'string' ? newValue : '';
                              const found = searchPlaces.find((p) => p.name === name);
                              setSelectedPlaceId(found ? found.id : null);
                          }}
                          inputValue={searchValue}
                          onInputChange={(_, newInputValue) => setSearchValue(newInputValue)}
                          renderInput={(params) => (
                            <TextField required {...params} label="Search places" placeholder="Type to search…" />
                          )}
                        />

                        {/* 2) Regular select for user's stickers */}
                        <FormControl>
                          <InputLabel id="sticker-select-label">Sticker</InputLabel>
                          <Select
                            required
                            labelId="sticker-select-label"
                            id="sticker-select"
                            value={stickerId}
                            onChange={(e) => {
                              const value = e.target.value as string;
                              if (value === '__create__') {
                                navigate('/stickers/create');
                                return;
                              }
                              setStickerId(value);
                            }}
                            input={<OutlinedInput label="Sticker" />}
                          >
                            <MenuItem className="create-new-option" value="__create__">
                                <AddCircleIcon />
                                <span>Create new</span>
                            </MenuItem>
                            {user?.stickersList.map((s) => (
                              <MenuItem key={s.id} value={s.id}>
                                  {s.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {/* 3) Numeric field for quantity */}
                        <TextField
                          required
                          label="Quantity"
                          type="number"
                          inputProps={{ min: 10, step: 1 }}
                          value={quantityInput}
                          onChange={(e) => {
                            const v = e.target.value;
                            // Allow empty string for easier editing; otherwise only digits
                            if (v === '' || /^\d+$/.test(v)) {
                              setQuantityInput(v);
                            }
                          }}
                          onBlur={() => {
                            const v = parseInt(quantityInput, 10);
                            if (Number.isNaN(v) || v < 10) {
                              setQuantityInput('10');
                            } else {
                              setQuantityInput(String(Math.floor(v)));
                            }
                          }}
                          helperText="Minimum 10"
                        />
                        <Typography variant="subtitle1" sx={{ textAlign: 'right' }}>
                          Total: ${(effectiveQuantity * PRICE_PER_STICKER).toFixed(2)}
                        </Typography>

                        {/* 4) Boost button to submit */}
                        <Button type="submit" variant="contained" size="large">Boost</Button>
                      </Stack>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

export default OrderPage;
