import { useEffect } from 'react';
import { getAuthData } from 'src/entities/Customer';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { Header } from '../widgets/Header/ui/Header';
import RouteProvider from './provider/RouteProvider/RouteProvider';
import './styles/index.scss';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAuthData());
  });
  return (
    <div className='app'>
      <div className='container'>
        <Header />
        <RouteProvider />
      </div>
    </div>
  );
}

export default App;
