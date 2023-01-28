import React, { useContext, useState } from 'react';
import { SwiperSelect } from "../SwiperSelect";
import './CalendarHeader.scss';
import { LocalStorageContext } from '../../Context/LocalStorageContext';
import { FormContext } from '../../Context/FormContext';
import classNames from 'classnames'
import { CurrentDataShower } from '../CurrentDataShower';
import calendarIcon from '../../Icons/calendarIcon.png';

export const CalendarHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setMainPoint } = useContext(LocalStorageContext)

  const { setIsFormOpen, setCurrentEvent, isFormOpen } = useContext(FormContext)

  const getPrevMonth = () => {
    setMainPoint(prev => prev.clone().subtract(1, 'month'))
  }

  const getNextMonth = () => {
    setMainPoint(prev => prev.clone().add(1, 'month'))
  }

  return (
    <div className={classNames('wrapper', { 'wrapper-blured': isFormOpen })}>
      <div className='header'>
        <button
          className={classNames('header__button',
            {
              'header__button-active': isFormOpen,
            },
          )}
          onClick={() => {
            setIsFormOpen(prev => !prev);
            setCurrentEvent(null);
          }}
        >
          +
        </button>

        <div className='header__picker'>
          <button
            className='header__picker-button header__picker-prev'
            onClick={getPrevMonth}
          >
            {'<'}
          </button>

          <CurrentDataShower />

          <button
            className='header__picker-button header__picker-next'
            onClick={getNextMonth}
          >
            {'>'}
          </button>

          <button
            className='header__picker-button'
            onClick={() => setIsOpen(true)}
          >
            <img
              className='header__picker-img'
              src={calendarIcon}
              alt='calendarIcon' />
          </button>
        </div>

        <SwiperSelect
          isOpen={isOpen}
          onClose={setIsOpen}
        />
      </div>
    </div>
  )
}