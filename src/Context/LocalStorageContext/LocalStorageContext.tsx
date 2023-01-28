import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { eventItem } from '../../Types/Event/EventItem';

interface Props {
  children: React.ReactNode,
}

interface ContextValues {
  allEvents: eventItem[];
  setAllEvents: React.Dispatch<React.SetStateAction<eventItem[]>>;
  mainPoint: Moment;
  setMainPoint: React.Dispatch<React.SetStateAction<moment.Moment>>;
}

export const LocalStorageContext = React.createContext<ContextValues>({
  allEvents: [],
  setAllEvents: () => { },
  mainPoint: moment(),
  setMainPoint: () => { },
})

export const LocalStorageProvider: React.FC<Props> = ({ children }) => {
  const getEventsStorage = JSON.parse(localStorage.getItem('LocalEvent') || '[]');
  const [allEvents, setAllEvents] = useState(getEventsStorage)

  useEffect(() => {
    localStorage.setItem('LocalEvent', JSON.stringify(allEvents));
  }, [allEvents]);

  const trueData = moment();
  const lastUpdate = JSON.parse(localStorage.getItem('TrueData') 
  || JSON.stringify(trueData));
  const [mainPoint, setMainPoint] = useState(moment(lastUpdate));

  useEffect(() => {
    localStorage.setItem("TrueData", JSON.stringify(mainPoint));
  }, [mainPoint]);


  const contextValue = {
    allEvents,
    setAllEvents,
    mainPoint,
    setMainPoint,
  };

  return (
    <LocalStorageContext.Provider value={contextValue}>
      {children}
    </LocalStorageContext.Provider>
  )
}
