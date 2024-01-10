import React from "react"
import cls from './Time.module.scss'

const times: string[] = ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "01"]

export const Time = () => {
  return (
    <div className={cls.time}>
      {times.map((time, i) => (
        <React.Fragment key={i}>
          <h4>{time}:00 —</h4>
          <h4>{time}:30 —</h4>
        </React.Fragment>
      ))}
          <h4>02:00 —</h4>
    </div>
  )
}
