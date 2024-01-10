import React from 'react';
import cls from './Reserve.module.scss';
import { Button, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { times } from '../model/consts/times';
import { useSelector } from 'react-redux';
import { $api } from 'src/shared/api';
import { fetchClubs } from 'src/entities/Club';
import { setTimeReserve } from '..';
import { StateSchema } from 'src/app/provider/StoreProvider/config/StateSchema';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { getAuthData } from 'src/entities/Customer';

interface IReservationProps {
  nameClub: string;
  idClub: string;
  roomNum: number;
}

export const Reserve: React.FC<IReservationProps> = (props) => {
  const { clubs } = useSelector((state: StateSchema) => state.club);
  const { customer } = useSelector((state: StateSchema) => state.customer);
  const { from, to } = useSelector((state: StateSchema) => state.reserve);
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = React.useState<boolean>(false);
  const club =
    customer?.booking &&
    clubs.filter((club) => club._id === customer?.booking.clubId);
  const successMessage = (text: string) => {
    messageApi.open({
      type: 'success',
      content: text,
      style: {
        fontSize: '16px',
        marginTop: '30vh',
      },
    });
  };
  const errorMessage = (text: string) => {
    messageApi.open({
      type: 'error',
      content: text,
      style: {
        fontSize: '16px',
        marginTop: '30vh',
      },
    });
  };
  const onOpen = () => {
    if (!customer) {
      errorMessage('Необходимо авторизоваться!');
      return;
    }
    setOpen(true);
  };

  // Устанавливаем URL сервера
  const { nameClub, idClub, roomNum } = props;
  const createReserve = async () => {
    if (from === null || to === null) {
      errorMessage('Выберите время бронирования!');
      return;
    }
    $api
      .post('/create_reserve', {
        idClub: idClub,
        roomNum: roomNum,
        from,
        to,
      })
      .then((res) => {
        successMessage(res.data.message);
        setTimeout(() => {
          dispatch(getAuthData());
          dispatch(fetchClubs());
          dispatch(setTimeReserve(100));
        }, 1000);
        setOpen(false);
      })
      .catch((error) => {
        errorMessage(error.response.data.message);
        setTimeout(() => {
          dispatch(getAuthData());
          dispatch(fetchClubs());
          dispatch(setTimeReserve(100));
        }, 1500);
        setOpen(false);
      });
  };
  const deleteReserve = async () => {
    $api
      .delete('/delete_reserve')
      .then((res) => {
        successMessage(res.data.message);
        setTimeout(() => {
          dispatch(getAuthData());
          dispatch(fetchClubs());
        }, 1500);
        setOpen(false);
      })
      .catch((error) => {
        errorMessage(error.response.data.message);
      });
  };

  return (
    <React.Fragment>
      {contextHolder}
      <button onClick={onOpen}>
        <img
          className={cls.booking}
          src='https://img.icons8.com/?size=160&id=79996&format=png'
          alt=''
        />
        <h4>Reserve</h4>
      </button>
      {customer?.booking ? (
        <div
          className={
            open ? `${cls.create_booking} ${cls.active}` : cls.create_booking
          }
        >
          <CloseOutlined
            style={{
              fontSize: '40px',
              position: 'absolute',
              right: '20px',
              top: '20px',
            }}
            onClick={() => setOpen(false)}
          />
          <h2>Ваша бронь</h2>
          <h3>Клиент +7{customer?.phone}</h3>
          <h4>Клуб: {club && club[0].name}</h4>
          <h4>Комната: {Number(customer.booking.room) + 1}</h4>
          <h3>
            С {times[customer.booking.from].label} до{' '}
            {times[customer.booking.to].label}
          </h3>
          <Button
            onClick={deleteReserve}
            size='large'
            style={{ background: '#fefefe', color: 'red', marginTop: '20px' }}
          >
            Удалить бронь
          </Button>
        </div>
      ) : (
        <div
          className={
            open ? `${cls.create_booking} ${cls.active}` : cls.create_booking
          }
        >
          <CloseOutlined
            style={{
              fontSize: '40px',
              position: 'absolute',
              right: '20px',
              top: '20px',
            }}
            onClick={() => setOpen(false)}
          />
          <h2>Бронирование</h2>
          <h3>Клиент: +7{customer?.phone}</h3>
          <h4>Клуб: {nameClub}</h4>
          <h4>Комната: {roomNum + 1}</h4>
          {from !== null && to !== null ? (
            <h3>
              С {times[from].label} до {times[to + 1].label}
            </h3>
          ) : (
            <h3>Укажите время брони!</h3>
          )}
          <Button
            onClick={createReserve}
            size='large'
            type='primary'
            style={{ marginTop: '20px' }}
          >
            Забронировать
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};
