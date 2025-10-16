import { Container, Typography } from '@mui/material';

import { useLocation, useNavigate } from 'react-router';

import './style.scss';

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation() as { state?: { effectiveQuantity?: unknown; PRICE_PER_STICKER?: unknown } };

    const DEFAULT_PRICE_PER_STICKER = 1.39;
    const DEFAULT_MIN_QTY = 10;

    const rawQty = location.state?.effectiveQuantity;
    const rawPrice = location.state?.PRICE_PER_STICKER;

    const effectiveQuantity = (typeof rawQty === 'number' && Number.isFinite(rawQty))
        ? Math.max(DEFAULT_MIN_QTY, Math.floor(rawQty))
        : DEFAULT_MIN_QTY;

    const PRICE_PER_STICKER = (typeof rawPrice === 'number' && Number.isFinite(rawPrice))
        ? rawPrice
        : DEFAULT_PRICE_PER_STICKER;

    const onClickHandler = () => {
        const amount = Number((effectiveQuantity * PRICE_PER_STICKER).toFixed(2));
        navigate('/order/payment-success', { state: { amount, currency: 'USD' } });
    }

    return (
        <Container className="full-screen-page-container align-items-center payment-container" maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 2 }}>
                Total: ${(effectiveQuantity * PRICE_PER_STICKER).toFixed(2)}
            </Typography>
            <button onClick={onClickHandler} className="apple-pay-button"></button>
        </Container>
    )
}

export default PaymentPage;


 // 1. Добавить в селект выбора стикера - Создать новый
 // 2. Сценарии:
        // a. стикеров нет: Home page - Boost! -> Create sticker page - Create -> Order Page - Boost -> Payment -> Payment Success
        // b. стикеровы есть: Home page - Boost! -> Create sticker page - Create -> Sticker list Page - Boost на стикере -> Order Page - Boost -> Payment -> Payment Success
 // 3. Стилизовать страницу Payment Success и сделать кнопку возврата к Sticker list Page
 // 5. На странице Sticker list у каждого итема должна быть кнопка Boost, Status (active)
 // 6. Вынести в хедер кнопку Make order
 // 8. На карте заменить Маркеры на лого boostU


 // 1. Верстка на планшетах
 // 2. Верстка на 1366х768
