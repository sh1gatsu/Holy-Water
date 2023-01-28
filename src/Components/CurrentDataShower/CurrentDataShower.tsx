import React, { useContext } from 'react';
import { LocalStorageContext } from '../../Context/LocalStorageContext';

export const CurrentDataShower = () => {

  const { mainPoint } = useContext(LocalStorageContext)

  const currentMonth = mainPoint.format('MMMM')

  const currentYear = mainPoint.format('YYYY')

  return (
    <p className='header__picker-title'>
      {`${currentMonth} ${currentYear}`}
    </p>
  )
}
