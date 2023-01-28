import React, { useState } from 'react';
import { eventItem } from '../../Types/Event/EventItem';

interface Props {
  children: React.ReactNode;
};

interface FormProps {
  currrentEvent: eventItem | null,
  setCurrentEvent: React.Dispatch<React.SetStateAction<eventItem | null>>,
  isFormOpen: boolean,
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
  globalData: string,
  setGlobalData: React.Dispatch<React.SetStateAction<string>>,
}

export const FormContext = React.createContext<FormProps>({
  currrentEvent: null,
  setCurrentEvent: () => { },
  isFormOpen: false,
  setIsFormOpen: () => { },
  globalData: '',
  setGlobalData: () => { },
});

export const FormProvider: React.FC<Props> = ({ children }) => {
  const [currrentEvent, setCurrentEvent] = useState<eventItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [globalData, setGlobalData] = useState('')

  const contextValue = {
    currrentEvent,
    setCurrentEvent,
    isFormOpen,
    setIsFormOpen,
    globalData,
    setGlobalData,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};