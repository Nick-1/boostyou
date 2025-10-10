import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { UserProvider } from './client/context/user-context';

import HomePage from './client/pages/home';
import CreateStickerPage from './client/pages/stickers/create';
import UpdateStickerPage from './client/pages/stickers/update';
import StickersListPage from './client/pages/stickers/list';
import MapPage from './client/pages/map';

import Header from './client/layout/header';

import theme from './theme';
import { DemoUser } from './client/fake-data/user.ts';

const Layout = () => (
    <>
        <ThemeProvider theme={theme}>
            <UserProvider initialUser={DemoUser}>
                <Header />
                <Outlet />
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
                  <Route path="stickers" >
                      <Route path="list" element={<StickersListPage />} />
                      <Route path="create" element={<CreateStickerPage />} />
                      <Route path="update/:stickerId" element={<UpdateStickerPage />} />
                  </Route>
                  <Route path="map" element={<MapPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
