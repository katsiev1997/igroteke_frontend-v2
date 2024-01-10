import { BarsOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import cls from './NavMenu.module.scss';
import { customerLogout } from 'src/entities/Customer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { StateSchema } from 'src/app/provider/StoreProvider/config/StateSchema';

export const NavMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { customer } = useSelector((state: StateSchema) => state.customer);
  const logoutFetch = () => {
    dispatch(customerLogout());
  };
  return (
    <React.Fragment>
      <BarsOutlined
        className={cls.burger}
        onClick={() => setOpen(!open)}
        style={{ fontSize: '45px' }}
      />
      <div
        className={open ? `${cls.navmenu} ${cls.navmenu_active}` : cls.navmenu}
      >
        <div className='container'>
          <ul className={cls.menu_items}>
            <li>
              <h2>Меню</h2>
            </li>
            <li onClick={() => setOpen(!open)}>
              <Link to='/'>Главная</Link>
            </li>
            {!customer && (
              <>
                <li onClick={() => setOpen(!open)}>
                  <Link to='/login'>Войти</Link>
                </li>
                <li onClick={() => setOpen(!open)}>
                  <Link to='/signup'>Зарегистрироваться</Link>
                </li>
              </>
            )}
            <li onClick={() => setOpen(!open)}>
              <Link to='/create_club'>Создать клуб</Link>
            </li>
            <li onClick={() => setOpen(!open)}>
              <Link to='/about'>О проекте</Link>
            </li>
            {customer && <h2 onClick={logoutFetch}>Выйти</h2>}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
