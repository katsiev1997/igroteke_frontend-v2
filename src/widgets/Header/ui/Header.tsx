import { FC } from 'react';
import cls from './Header.module.scss';
import { NavMenu } from './NavMenu/NavMenu';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <header className={cls.header}>
      <Link to='/'>
        <h1 className={cls.h1}>igroteke.ru</h1>
      </Link>
      <NavMenu />
    </header>
  );
};
