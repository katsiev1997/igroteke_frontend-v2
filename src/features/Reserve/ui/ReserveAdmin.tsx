import React, { useState } from 'react';
import cls from './Reserve.module.scss';
import { Button, Input, message } from 'antd';
import { CloseOutlined, PhoneOutlined } from '@ant-design/icons';
import { times } from '../model/consts/times';
import { useSelector } from 'react-redux';
import { $api } from 'src/shared/api';
import { fetchClubs } from 'src/entities/Club';
import { setTimeReserve } from '..';
import { StateSchema } from 'src/app/provider/StoreProvider/config/StateSchema';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { getAuthData } from 'src/entities/Admin';

export const ReserveAdmin: React.FC = () => {
  // const { clubs } = useSelector((state: StateSchema) => state.club);
  const { from, to, room } = useSelector((state: StateSchema) => state.reserve);
  const [customerData, setCustomerData] = useState<string>('')
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = React.useState<boolean>(false);
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

  // Устанавливаем URL сервера
  const createReserve = async () => {
    if (from === null || to === null) {
      errorMessage('Выберите время бронирования!');
      return;
    }
    $api
      .post('/create_reserve', {
        customerData,
        roomNum: room,
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

  return (
    <React.Fragment>
      {contextHolder}
      <button onClick={() => setOpen(true)}>
        <img
          className={cls.booking}
          src='https://img.icons8.com/?size=160&id=79996&format=png'
          alt=''
        />
        <h4>Создать</h4>
        <h4>бронь</h4>
      </button>
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
        <Input
          prefix={
            <div>
              <PhoneOutlined className='site-form-item-icon' /> +7
            </div>
          }
          onChange={(e) => setCustomerData(e.target.value)}
          size='large'
          className='input'
          placeholder='Номер телефона...'
        />
        <h4>Комната: {room + 1}</h4>
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
    </React.Fragment>
  );
};
