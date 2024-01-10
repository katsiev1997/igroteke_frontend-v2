import cls from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={cls.black_screen}>
      <div className={cls.loading}>
      <span className={cls.loader}></span>
    </div>
    </div>
    
  );
};
