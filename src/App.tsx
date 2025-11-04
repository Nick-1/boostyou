import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { UserProvider } from './client/context/user-context';

import Header from './client/layout/header';

import HomePage from './client/pages/home';
import CreateStickerPage from './client/pages/stickers/create';
import UpdateStickerPage from './client/pages/stickers/update';
import StickersListPage from './client/pages/stickers/list';

import OrderPage from './client/pages/order/create';

import theme from './theme';
import { DemoUser } from './client/fake-data/user.ts';
import PaymentPage from './client/pages/order/payment';
import PaymentSuccessPage from './client/pages/order/payment-success';
import CoffeeStickerEditorPage from './client/pages/stickers/create-prototype';
import Footer from './client/layout/footer';

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
                  <Route path="/" element={<HomePage />} />
                  <Route path="/create-prototype" element={<CoffeeStickerEditorPage />} />
                  <Route path="stickers" >
                      <Route path="list" element={<StickersListPage />} />
                      <Route path="create" element={<CreateStickerPage />} />
                      <Route path="update/:stickerId" element={<UpdateStickerPage />} />
                  </Route>
                  <Route path="order">
                      <Route path="create" element={<OrderPage />} />
                      <Route path="payment" element={<PaymentPage />} />
                      <Route path="payment-success" element={<PaymentSuccessPage />} />
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
