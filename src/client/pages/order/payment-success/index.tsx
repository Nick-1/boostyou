// PaymentSuccessPage.tsx
import * as React from 'react';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

type Item = { title: string; qty: number; price: number };

const parseItems = (raw: string | null): Item[] => {
    if (!raw) return [];
    try {
        const val = JSON.parse(raw);
        if (Array.isArray(val)) {
            return val
                .filter(v => v && typeof v.title === 'string')
                .map(v => ({ title: v.title, qty: Number(v.qty) || 1, price: Number(v.price) || 0 }));
        }
    } catch {}
    return [];
};

const PaymentSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation() as { state?: { amount?: unknown; currency?: unknown } };
    const [params] = useSearchParams();
    const [copied, setCopied] = React.useState(false);

    const amountFromState = (typeof location.state?.amount === 'number' && Number.isFinite(location.state.amount))
        ? location.state.amount
        : undefined;
    const currencyFromState = (typeof location.state?.currency === 'string' && location.state.currency)
        ? String(location.state.currency)
        : undefined;

    const amountFromQuery = Number(params.get('amount') ?? 0);
    const currencyFromQuery = params.get('currency') ?? undefined;

    const currency = currencyFromState ?? currencyFromQuery ?? 'USD';
    const orderId = params.get('orderId') ?? 'ORD-XXXX-XXXX';
    const dateISO = params.get('date') ?? new Date().toISOString();
    const email = params.get('email') ?? 'user@example.com';
    const paymentMethod = params.get('paymentMethod') ?? 'Card •••• 4242';
    const items = React.useMemo(() => parseItems(params.get('items')), [params]);

    const fmt = React.useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency,
                maximumFractionDigits: 2,
            }),
        [currency]
    );

    const date = React.useMemo(
        () =>
            new Date(dateISO).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
        [dateISO]
    );

    const totalFromItems = React.useMemo(() => {
        const itemsTotal = items.length ? items.reduce((s, i) => s + i.price * i.qty, 0) : undefined;
        // Prefer state.amount (from PaymentPage), then items sum, then query amount
        const raw = (typeof amountFromState === 'number' ? amountFromState : undefined)
            ?? itemsTotal
            ?? (Number.isFinite(amountFromQuery) ? amountFromQuery : 0);
        return raw ?? 0;
    }, [items, amountFromState, amountFromQuery]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(orderId);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {}
    };

    const handleBackMyStickers = () => {
        navigate('/stickers/list');
    };

    // const invoiceHref = `/api/orders/${encodeURIComponent(orderId)}/invoice.pdf`; // adjust for backend

    return (
        <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
            <Stack spacing={3}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        borderRadius: 3,
                        border: (t) => `1px solid ${t.palette.divider}`,
                        bgcolor: (t) => (t.palette.mode === 'light' ? '#fff' : t.palette.background.paper),
                    }}
                >
                    {/* Header */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                            aria-hidden
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                display: 'grid',
                                placeItems: 'center',
                                bgcolor: (t) => t.palette.success.main + '22',
                            }}
                        >
                            <CheckCircleOutlineRoundedIcon
                                fontSize="large"
                                sx={{ color: (t) => t.palette.success.main }}
                            />
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="h5" fontWeight={700}>
                                Payment Successful
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                                A receipt has been sent to {email}
                            </Typography>
                        </Box>

                        <Chip color="success" variant="filled" label="Paid" sx={{ fontWeight: 600 }} />
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* Summary */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                        {/* Left: payment details */}
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="overline" color="text.secondary">
                                Payment details
                            </Typography>
                            <List dense disablePadding>
                                <ListItem
                                    disableGutters
                                    secondaryAction={
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Typography
                                                variant="body2"
                                                sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
                                            >
                                                {orderId}
                                            </Typography>
                                            <Tooltip title={copied ? 'Copied' : 'Copy'}>
                                                <IconButton edge="end" size="small" onClick={handleCopy} aria-label="copy order id">
                                                    <ContentCopyRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    }
                                >
                                    <ListItemText primary="Order ID" />
                                </ListItem>

                                <ListItem disableGutters>
                                    <ListItemText primary="Date" secondary={date} />
                                </ListItem>

                                <ListItem disableGutters>
                                    <ListItemText primary="Payment method" secondary={paymentMethod} />
                                </ListItem>

                                <ListItem
                                    disableGutters
                                    secondaryAction={
                                        <Typography variant="h6" fontWeight={800}>
                                            {fmt.format(totalFromItems)}
                                        </Typography>
                                    }
                                >
                                    <ListItemText primary="Total amount" />
                                </ListItem>
                            </List>
                        </Box>

                        {/* Divider */}
                        <Divider flexItem orientation="vertical" sx={{ display: { xs: 'none', sm: 'block' } }} />

                        {/* Right: items */}
                        {/*<Box sx={{ flex: 1 }}>*/}
                        {/*    <Typography variant="overline" color="text.secondary">*/}
                        {/*        Order summary*/}
                        {/*    </Typography>*/}
                        {/*    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: (t) => t.palette.action.hover }}>*/}
                        {/*        {items.length === 0 ? (*/}
                        {/*            <Typography variant="body2" color="text.secondary">*/}
                        {/*                No items provided.*/}
                        {/*            </Typography>*/}
                        {/*        ) : (*/}
                        {/*            <Stack spacing={1.5}>*/}
                        {/*                {items.map((it, i) => (*/}
                        {/*                    <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">*/}
                        {/*                        <Typography variant="body2" sx={{ fontWeight: 600 }}>*/}
                        {/*                            {it.title} × {it.qty}*/}
                        {/*                        </Typography>*/}
                        {/*                        <Typography variant="body2">{fmt.format(it.price * it.qty)}</Typography>*/}
                        {/*                    </Stack>*/}
                        {/*                ))}*/}
                        {/*                <Divider />*/}
                        {/*                <Stack direction="row" justifyContent="space-between" alignItems="center">*/}
                        {/*                    <Typography variant="subtitle2" fontWeight={800}>*/}
                        {/*                        Total*/}
                        {/*                    </Typography>*/}
                        {/*                    <Typography variant="subtitle2" fontWeight={800}>*/}
                        {/*                        {fmt.format(totalFromItems)}*/}
                        {/*                    </Typography>*/}
                        {/*                </Stack>*/}
                        {/*            </Stack>*/}
                        {/*        )}*/}
                        {/*    </Paper>*/}
                        {/*</Box>*/}
                    </Stack>

                    {/* Actions */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={<ReceiptLongRoundedIcon />}
                            onClick={handleBackMyStickers}
                        >
                            Go to My Stickers
                        </Button>

                        {/*<Button*/}
                        {/*    fullWidth*/}
                        {/*    variant="outlined"*/}
                        {/*    size="large"*/}
                        {/*    startIcon={<DownloadRoundedIcon />}*/}
                        {/*    component="a"*/}
                        {/*    href={invoiceHref}*/}
                        {/*    download*/}
                        {/*>*/}
                        {/*    Download Invoice (PDF)*/}
                        {/*</Button>*/}
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
};

// @ts-ignore
export default PaymentSuccessPage;
