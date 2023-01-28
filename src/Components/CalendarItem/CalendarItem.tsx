import React, { useContext, useEffect, useState } from 'react';
import './CalendarItem.scss';
import { Moment } from 'moment';
import moment from 'moment';
import classNames from 'classnames'
import { LocalStorageContext } from '../../Context/LocalStorageContext';
import { eventItem } from '../../Types/Event/EventItem';
import { FormContext } from '../../Context/FormContext';
import { EventsList } from '../EventsList';

interface Props {
  date: Moment,
}

export const CalendarItem: React.FC<Props> = ({ date }) => {
  const [listOfEvents, setListOfEvents] = useState<eventItem[]>([])

  const { setIsFormOpen, setGlobalData } = useContext(FormContext)

  const {allEvents, mainPoint} = useContext(LocalStorageContext)

  useEffect(() => {
    const eventsForAdding: eventItem[] = []

    allEvents.forEach(item => {
      if (date.format('YYYY-MM-DD') === item.data) {
        eventsForAdding.push(item)
      }
    })

    setListOfEvents(eventsForAdding)
  }, [allEvents, date])

  const dateInfo = date.date();

  const dayInfo = date.format('dddd').substring(0, 3);

  const currentday = moment().format('YYYY-DDDD-MMMM');

  const onItemClick = () => {
    setGlobalData(date.format('YYYY-MM-DD'));
    setIsFormOpen(true);
  }

  return (
    <div className={classNames('item',
      {
        'item-current': currentday === date.format('YYYY-DDDD-MMMM'),
        'item-another--month': !mainPoint.isSame(date, 'month'),
      }
    )}
      onClick={onItemClick}
    >
      <div className='item__information'>
        <div className='item__information-data'>
          {dateInfo}
        </div>

        <div className='item__information-day'>
          {dayInfo}
        </div>
      </div>

      <div className='item__events'>
        {listOfEvents.slice(0, 3).map(calendarEvent => {
          const { title } = calendarEvent;

          let visibleTitle = title;

          if (visibleTitle.length > 11) {
            visibleTitle = `${visibleTitle.slice(0, 11)}...`
          }

          return (
            <EventsList
              key={calendarEvent.id}
              visibleTitle={visibleTitle}
              calendarEvent={calendarEvent}
            />
          )
        })}

        {listOfEvents.length > 3 && (
          <div className='item__events-counter'>
            +{listOfEvents.length - 3}
          </div>
        )}
      </div>
    </div>
  )
}
