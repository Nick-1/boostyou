import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { UserProvider } from './client/context/user-context';

import Header from './client/layout/header';
import Footer from './client/layout/footer';

import HomePage from './client/pages/home';
import CreateStickerPage from './client/pages/stickers/create';
import UpdateStickerPage from './client/pages/stickers/update';
import StickersListPage from './client/pages/stickers/list';
import OrderPage from './client/pages/order/create';
import PaymentPage from './client/pages/order/payment';
import PaymentSuccessPage from './client/pages/order/payment-success';

import theme from './theme';
import { DemoUser } from './client/fake-data/user.ts';
import { CLIENT_ROUTE } from './client/common/routes.ts';

const { stickers, order, home } = CLIENT_ROUTE;

const Layout = () => (
    <>
        <ThemeProvider theme={theme}>
            <UserProvider initialUser={DemoUser}>
                <Header />
                <Outlet />
                <Footer />
            </UserProvider>
        </ThemeProvider>
    </>
);



function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route element={<Layout />}>
                  <Route path={home} element={<HomePage />} />
                  <Route path={stickers.root} >
                      <Route path={stickers.list} element={<StickersListPage />} />
                      <Route path={stickers.create} element={<CreateStickerPage />} />
                      <Route path={`${stickers.update}/:stickerId`}  element={<UpdateStickerPage />} />
                  </Route>
                  <Route path={order.root}>
                      <Route path={order.create} element={<OrderPage />} />
                      <Route path={order.payment} element={<PaymentPage />} />
                      <Route path={order.paymentSuccess} element={<PaymentSuccessPage />} />
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
