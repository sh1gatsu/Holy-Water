import React, { useContext } from 'react';
import './CalendarBody.scss';
import { CalendarItem } from '../CalendarItem';
import { LocalStorageContext } from '../../Context/LocalStorageContext';
import classNames from 'classnames';
import { FormContext } from '../../Context/FormContext';

export const CalendarBody: React.FC = () => {
  const { mainPoint } = useContext(LocalStorageContext)
  const {isFormOpen} = useContext(FormContext)

  const dayForStart = mainPoint.clone().startOf('month').startOf('week');

  const dayForChange = dayForStart.clone().subtract(1, 'day');

  const calendar = [...Array(42)].map(() => dayForChange.add(1, 'day').clone());

  return (
    <div className={classNames('body', {'body-blured': isFormOpen})}>
      <div className='body__container'>
        {calendar.map(date => (
          <CalendarItem
            key={date.format()}
            date={date}
          />
        ))}
      </div>
    </div>
  )
}