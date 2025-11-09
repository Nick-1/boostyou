export const CLIENT_ROUTE = {
    home: '/',
    stickers: {
        root: '/stickers',
        list: '/stickers/list',
        create: '/stickers/create',
        update: '/stickers/update',
    },
    order: {
        root: '/order',
        create: '/order/create',
        payment: '/order/payment',
        paymentSuccess: '/order/payment-success',

    }
} as const;

