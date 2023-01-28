import React, { useContext } from 'react';
import { FormContext } from '../../Context/FormContext';
import { LocalStorageContext } from '../../Context/LocalStorageContext';
import { eventItem } from '../../Types/Event/EventItem';

interface Props {
  visibleTitle: string;
  calendarEvent: eventItem;
}

export const EventsList: React.FC<Props> = ({visibleTitle, calendarEvent}) => {
  const { setCurrentEvent, setIsFormOpen } = useContext(FormContext)
  const { setAllEvents } = useContext(LocalStorageContext)
  return (
    <div
      className='item__events-event'
    >
      <div className='item__events-wrapper'>
        <div
          className='item__events-title'
          onClick={(event) => {
            event.stopPropagation();
            setCurrentEvent(calendarEvent);
            setIsFormOpen(true);
          }}
        >
          {visibleTitle}
        </div>
        <button
          className='item__events-button'
          onClick={(event) => {
            event.stopPropagation();
            setAllEvents(prev => prev
              .filter(localEvent => localEvent.id !== calendarEvent.id))
          }}
        >
          x
        </button>
      </div>
    </div>
  )
}
