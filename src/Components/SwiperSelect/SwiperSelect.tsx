import React, { useContext } from 'react';
import './SwiperSelect.scss';
import classNames from 'classnames'
import { LocalStorageContext } from '../../Context/LocalStorageContext';
import { CurrentDataShower } from '../CurrentDataShower';

interface Props {
  isOpen: boolean,
  onClose: React.Dispatch<React.SetStateAction<boolean>>,
}

const yearCounter = () => {
  const yearsToSwitch = [];
  let initialValue = 2023;

  while (initialValue >= 1990) {
    yearsToSwitch.push(initialValue)
    initialValue--;
  }

  return yearsToSwitch;
}

const yearsToSwitch = yearCounter();

const monthToSwitch = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December']

export const SwiperSelect: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
  const { mainPoint, setMainPoint } = useContext(LocalStorageContext)

  const currentMonth = mainPoint.month()
  const currentYear = mainPoint.format('YYYY')

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMainPoint(prev => prev.clone().set('month', Number(event.target.value)))
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMainPoint(prev => prev.clone().set('year', Number(event.target.value)))
  }

  return (
    <div className={classNames('swiper', {
      'swiper-open': isOpen,
    })}>
      <CurrentDataShower />
      <div className='swiper__selects'>
        <select
          value={currentMonth}
          onChange={handleMonthChange}
          className='swiper__selects-select'
        >
          <option disabled value="">please select a month</option>

          {monthToSwitch.map(month => (
            <option
              value={monthToSwitch.indexOf(month)}
              key={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={currentYear}
          onChange={handleYearChange}
          className='swiper__selects-select'
        >
          <option disabled value="">please select a year</option>

          {yearsToSwitch.map(year => (
            <option value={year} key={year}>{year}</option>
          ))}
        </select>
      </div>

      <button
        className='swiper__button'
        onClick={() => onClose(false)}
      >
        X
      </button>
    </div>
  )
}
