import React from "react";
import cls from "./Reserve.module.scss";
import { Button, Input, message } from "antd";
import { CloseOutlined, PhoneOutlined } from "@ant-design/icons";
import { times } from "../model/consts/times";
import { useSelector } from "react-redux";
import { StateSchema } from "src/app/provider/StoreProvider/config/StateSchema";
import { setTimeReserve } from "..";
import { useAppDispatch } from "src/shared/hooks/useAppDispatch";

export const ReserveClient: React.FC = () => {
  const { from, to, room, club } = useSelector((state: StateSchema) => state.reserve);
  const dispatch = useAppDispatch();
  const { clubs } = useSelector((state: StateSchema) => state.club);
  const Club = clubs[club];
  const [customerData, setCustomerData] = React.useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = React.useState<boolean>(false);
  const errorMessage = (text: string) => {
    messageApi.open({
      type: "error",
      content: text,
      style: {
        fontSize: "16px",
        marginTop: "30vh",
      },
    });
  };

  // Устанавливаем URL сервера
  const createReserve = () => {
    if (from === null || to === null) {
      errorMessage("Выберите время бронирования!");
      return;
    }
    const setRoom = Club.rooms[room];
    for (let i = from; i <= to; i++) {
      if (!setRoom.availableTimeSlots[i]) {
        errorMessage("Выбранное время уже забронировано");
        dispatch(setTimeReserve(100));
        return;
      }
    }
    window.location.href = `https://wa.me/+7${
      Club.phone
    }?text=Бронь Телефон: ${customerData} Клуб: ${Club.name} Комната №: ${room + 1} С ${
      from && times[from].label
    } до ${to && times[to + 1].label}`;
    setOpen(true);
  };

  return (
    <React.Fragment>
      {contextHolder}
      <button onClick={() => createReserve()}>
        <img
          className={cls.booking}
          src="https://img.icons8.com/?size=160&id=79996&format=png"
          alt=""
        />
        <h4>Reserve</h4>
      </button>
      <div className={open ? `${cls.create_booking} ${cls.active}` : cls.create_booking}>
        <CloseOutlined
          style={{
            fontSize: "40px",
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
          onClick={() => setOpen(false)}
        />
        <h2>Бронирование</h2>
        <Input
          prefix={
            <div>
              <PhoneOutlined className="site-form-item-icon" /> +7
            </div>
          }
          onChange={(e) => setCustomerData(e.target.value)}
          size="large"
          className="input"
          placeholder="Номер телефона..."
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
          size="large"
          type="primary"
          style={{ marginTop: "20px" }}
        >
          Забронировать
        </Button>
      </div>
    </React.Fragment>
  );
};
