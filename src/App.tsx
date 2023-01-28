import React, { useContext } from 'react';
import './App.scss';
import { CalendarHeader } from './Components/CalendarHeader';
import { CalendarBody } from './Components/CalendarBody';
import moment from 'moment';
import { FormField } from './Components/FormField';
import { FormContext } from './Context/FormContext';

moment.updateLocale('en', { week: { dow: 1 } })

function App() {
  const { currrentEvent } = useContext(FormContext)

  return (
    <div className='App'>
      <FormField editEvent={currrentEvent} />
      <CalendarHeader />
      <CalendarBody />
    </div>
  );
}

export default App;
