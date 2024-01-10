import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  HomePage, LazyAboutPage, LazyCreateClubPage, LazyLoginPage, LazySignUpPage
} from 'src/pages';
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
      </Routes>
    </Suspense>
  );
};

export default RouteProvider;
