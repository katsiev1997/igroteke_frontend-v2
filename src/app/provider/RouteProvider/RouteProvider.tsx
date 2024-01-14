import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  HomePage, LazyAboutPage, LazyCreateClubPage, LazyLoginPage, LazySignUpPage
} from 'src/pages';
import { LazyAdminPage } from 'src/pages/AdminPage/LazyAdminPage';
import { Loading } from 'src/shared/ui/Loading/Loading';

const RouteProvider = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LazyLoginPage />} />
        <Route path='/signup' element={<LazySignUpPage />} />
        <Route path='/create_club' element={<LazyCreateClubPage />} />
        <Route path='/about' element={<LazyAboutPage />} />
        <Route path='/admin' element={<LazyAdminPage />} />
      </Routes>
    </Suspense>
  );
};

export default RouteProvider;
