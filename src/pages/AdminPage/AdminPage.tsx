import React from 'react';
import cls from './AdminPage.module.scss';
import { Loading } from 'src/shared/ui/Loading/Loading';
import {
  ExclamationCircleFilled,
  HomeOutlined,
  OrderedListOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchClubs } from 'src/entities/Club';
import { StateSchema } from 'src/app/provider/StoreProvider/config/StateSchema';
import { setRoom, setTimeReserve } from 'src/features/Reserve';
import { ReserveAdmin } from 'src/features/Reserve/ui/ReserveAdmin';
import { Card, message, Button, Modal, Space } from 'antd';
import { times } from 'src/features/Reserve/model/consts/times';
import { $api } from 'src/shared/api';
import { getAuthData } from 'src/entities/Admin';
import { Status, Time } from 'src/widgets';

const { confirm } = Modal;

interface DeleteReserveData {
  bookingId: string;
  roomNum: number;
  from: number;
  to: number;
}

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [bookingMode, setBookingMode] = React.useState(true);
  const { clubs, status } = useSelector((state: StateSchema) => state.club);
  const { club, room } = useSelector((state: StateSchema) => state.reserve);
  React.useEffect(() => {
    const getClubs = () => {
      dispatch(fetchClubs());
    };
    getClubs();
  }, [dispatch]);
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
  const Club = clubs[club];

  const deleteReserve = async (data: DeleteReserveData) => {
    $api
      .delete('/delete_reserve', { data: data })
      .then((res) => {
        successMessage(res.data.message);
        setTimeout(() => {
          dispatch(getAuthData());
          dispatch(fetchClubs());
        }, 1500);
      })
      .catch((error) => {
        errorMessage(error.response.data.message);
      });
  };
  const showDeleteConfirm = (reserveData: DeleteReserveData) => {
    confirm({
      title: 'Удаление брони',
      icon: <ExclamationCircleFilled />,
      content: 'Вы действительно хотите удалить бронь?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отменить',
      onOk() {
        deleteReserve(reserveData);
      },
      onCancel() {
        return;
      },
    });
  };
  return (
    <Space wrap>
      <main>
        {contextHolder}
        {status === 'error' ? (
          <div>
            <h2 className='error'>Произошла ошибка</h2>
            <p className='error-text'>
              К сожалению, возникла ошибка при загрузке страницы. Пожалуйста,
              попробуйте перезагрузить страницу.
            </p>
          </div>
        ) : status === 'loading' ? (
          <Loading />
        ) : (
          <div>
            <h2>{Club.name}</h2>
            <p>
              {' '}
              <HomeOutlined /> {Club?.address}
            </p>
            <p className={cls.phone}>
              {' '}
              <PhoneOutlined /> +7{Club?.phone}
            </p>
            <hr />
            <div className={cls.time_status_rooms}>
              {Club && bookingMode ? (
                <div className={cls.bookings}>
                  {Club.rooms[room].bookings.map((booking) => (
                    <Card
                      className={cls.bookingCard}
                      style={{ width: 260, color: '#000' }}
                      headStyle={{ padding: '10px' }}
                      bodyStyle={{ padding: '10px' }}
                      title={<h4>{`+7${booking.customerData}`}</h4>}
                      extra={
                        <Button
                          onClick={() =>
                            showDeleteConfirm({
                              bookingId: booking._id,
                              roomNum: room,
                              from: booking.from,
                              to: booking.to,
                            })
                          }
                          type='dashed'
                        >
                          Удалить
                        </Button>
                      }
                    >
                      <h3>
                        {' '}
                        С {times[booking.from].label} до{' '}
                        {times[booking.to].label}
                      </h3>

                      <p>{booking._id}</p>
                      <p>Комната: {booking.roomName}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className={cls.time_status}>
                  <Time />
                  <Status timeSlots={Club.rooms[room].availableTimeSlots} />
                </div>
              )}
              {Club && Club.rooms && (
                <div className={cls.play_rooms}>
                  <h3 className={cls.play_room_text}>Play room </h3>
                  <div>
                    {Club.rooms.map((item, i) => (
                      <div
                        onClick={() => {
                          dispatch(setTimeReserve(100));
                          dispatch(setRoom(i));
                        }}
                        key={i}
                        className={
                          room === i ? `${cls.room} ${cls.active}` : cls.room
                        }
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                  <ReserveAdmin />
                  <OrderedListOutlined
                    style={{ fontSize: '40px' }}
                    onClick={() => setBookingMode(!bookingMode)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </Space>
  );
};

export default AdminPage;
