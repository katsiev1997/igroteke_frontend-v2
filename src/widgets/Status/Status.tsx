import React from 'react';
import cls from './Status.module.scss';
import { setTimeReserve } from 'src/features/Reserve';
import { useSelector } from 'react-redux';
import { StateSchema } from 'src/app/provider/StoreProvider/config/StateSchema';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';

interface StatusProps {
  timeSlots: boolean[];
}

export const Status: React.FC<StatusProps> = ({ timeSlots }) => {
  const dispatch = useAppDispatch();
  const { from, to } = useSelector((state: StateSchema) => state.reserve);
  const { customer } = useSelector((state: StateSchema) => state.customer);
  const setTime = (time: number) => {
    if (!customer) return;
    if (customer.booking !== null) return;
    dispatch(setTimeReserve(time));
  };
  return (
    <div className={cls.status}>
      {timeSlots.map((status, i) => (
        <div
          onClick={() => setTime(i)}
          key={i}
          className={
            from !== null && to != null && from <= i && i <= to
              ? `${cls.status_slot} ${cls.reserve}`
              : i === from
              ? `${cls.status_slot} ${cls.reserve}`
              : status
              ? `${cls.status_slot} ${cls.free}`
              : `${cls.status_slot} ${cls.occupied}`
          }
        >
          {' '}
          <h5> {status ? 'free' : 'reserved'}</h5>
        </div>
      ))}
    </div>
  );
};
