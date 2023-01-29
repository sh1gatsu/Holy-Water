import React, { useContext, useEffect, useState } from 'react';
import './FormComponent.scss';
import classNames from 'classnames'
import { LocalStorageContext } from '../../Context/LocalStorageContext';
import { eventItem } from '../../Types/Event/EventItem';
import { FormContext } from '../../Context/FormContext';
import deleteIcon from '../../Icons/delete-icon.png';
import saveIcon from '../../Icons/save-icon.svg';

interface Props {
  editEvent?: eventItem | null,
}

export const FormComponent: React.FC<Props> = ({
  editEvent,
}) => {
  const {
    isFormOpen,
    setIsFormOpen,
    setCurrentEvent,
    globalData,
    setGlobalData,
  } = useContext(FormContext)
  const [title, setTitle] = useState(editEvent ? editEvent.title : '');
  const [data, setData] = useState(editEvent ? editEvent.data : globalData);
  const [time, setTime] = useState(editEvent ? editEvent.time : '');
  const [description, setDescription] = useState(editEvent
    ? editEvent.description
    : '');
  const [createdAt, setCreatedAt] = useState(editEvent
    ? editEvent.createdAt
    : new Date().toISOString());
  const [updatedAt] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setData(editEvent.data);
      setTime(editEvent.time);
      setDescription(editEvent.description);
      setIsUpdate(true);
    } else {
      setTitle('');
      setData(globalData);
      setTime('');
      setDescription('');
      setIsUpdate(false);
    }
  }, [editEvent, globalData]);

  useEffect(() => {
    if (!editEvent) {
      setCreatedAt(new Date().toISOString());
    }
  }, [editEvent]);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(event.target.value);
  }

  const { setAllEvents } = useContext(LocalStorageContext);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  const onSubmit = () => {
    if (isUpdate) {
      setAllEvents(prev => prev.map(event => {
        if (event.id === editEvent?.id) {
          return {
            title,
            data,
            id: editEvent.id,
            time,
            description,
            createdAt: event.createdAt,
            updatedAt: new Date().toISOString(),
          };
        }

        setCurrentEvent(null);

        return event;
      }));
    } else {
      setAllEvents(prev => {
        const maxId = Math.max(...prev.map(expense => expense.id));
        return [...prev, {
          title,
          data,
          id: prev.length ? maxId + 1 : 1,
          time,
          description,
          createdAt,
          updatedAt,
        }]
      });
    }

    setTitle('');
    setData('');
    setTime('');
    setDescription('');
  };

  return (
    <div className={classNames('Form-field',
      {
        'Form-field-open': isFormOpen,
      }
    )}>
      <div className='Form-field-top'>
        <h1>
          {editEvent ? 'Edit current event' : 'Add new event'}
        </h1>

        <button
          onClick={() => {
            setGlobalData('');
            setIsFormOpen(false);
            setCurrentEvent(null);
          }}
          className='Form-field-closer'
        >
          x
        </button>

        {editEvent && (
          <>
            <div>
              {`Created at: ${formatDate(editEvent.createdAt)}`}
            </div>
            {editEvent.updatedAt.length > 0 && (
              <div>
                {`Updated at: ${formatDate(editEvent.updatedAt)}`}
              </div>
            )}
          </>
        )}
      </div>
      <form
        className='Form-field__form'
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
          setIsFormOpen(false);
          setGlobalData('');
        }}
      >
        <label className='Form-field__element'>
          <div className='Form-field__header'>
            Title
          </div>

          <input
            className='Form-field__title'
            placeholder='name me'
            required
            type='text'
            value={title}
            onChange={(event) => handleFormChange(event, setTitle)}
          />
        </label>

        <label className='Form-field__element'>
          <div className='Form-field__header'>
            Description
          </div>

          <textarea
            placeholder='describe me'
            className='Form-field__description'
            value={description}
            onChange={(event) => handleFormChange(event, setDescription)}
          />
        </label>

        <div className='Form-field__date-block'>
          <label className='Form-field__element'>
            <div className='Form-field__header Form-field__header-date'>
              Data
            </div>

            <input
              className='Form-field__time'
              required
              type='date'
              value={data}
              onChange={(event) => handleFormChange(event, setData)}
            />
          </label>

          <div>
            <label className='Form-field__element'>
              <div className='Form-field__header Form-field__header-date'>
                Time
              </div>

              <input
                className='Form-field__time'
                type='time'
                value={time}
                onChange={(event) => handleFormChange(event, setTime)}
              />
            </label>
          </div>
        </div>

        <div className='Form-field__button-block'>
          {editEvent && (
            <div>
              <button
                className='Form-field__button'
                type='button'
                onClick={() => {
                  setAllEvents(prev => prev
                    .filter(localEvent => localEvent.id !== editEvent.id));
                  setIsFormOpen(false);
                  setCurrentEvent(null);
                }}
              >
                <img
                  className='Form-field__icon Form-field__icon--delete'
                  src={deleteIcon}
                  alt='deleteIcon'
                />
              </button>
            </div>
          )}

          <div>
            <button
              className='Form-field__button'
              type='submit'
            >
              <img
                className='Form-field__icon'
                src={saveIcon}
                alt='saveIcon'
              />
            </button>
          </div>
        </div>
      </form >
    </div >
  )
}
