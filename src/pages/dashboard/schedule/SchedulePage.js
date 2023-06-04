import FullCalendar from '@fullcalendar/react';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import esLocale from '@fullcalendar/core/locales/es';
import enLocale from '@fullcalendar/core/locales/en-au';
import { Card, Button, Container, DialogTitle, Dialog } from '@mui/material';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Helmet } from "react-helmet-async";
import { useLocales } from "../../../locales";
import useResponsive from '../../../hooks/useResponsive';
import { useSettingsContext } from '../../../components/settings';
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from '../../../components/snackbar';
import { useDispatch } from '../../../redux/store';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';


import {
  CalendarForm,
  StyledCalendar,
  CalendarToolbar
} from '../../../sections/dashboard/calendar';
import { generateUniqueIdentifier } from '../../../utils/numberGenerator';
import StickyNote from '../../../components/sticky-note/StickyNote';


const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];


export default function SchedulePage () {
  const baseI18NKey = 'schedule';
  const calendarRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const isDesktop = useResponsive('up', 'sm');

  const [openForm, setOpenForm] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const getTeacherSubjects = () => {
    const data = [
      { title: "Programación", id: "1" },
      { title: "Compiladores", id: "2" },
      { title: "Inteligencia Artificial", id: "3" },
      { title: "Control Automatizado", id: "5" },
      { title: "AD2", id: "4" },
    ];

    return data.map((subject, index) => {
      const color = COLOR_OPTIONS[index]
      return {
        ...subject,
        textColor: color
      }
    });
  };

  const daysMapping = {
    1: 'LUNES',
    2: 'MARTES',
    3: 'MIERCOLES',
    4: 'JUEVES',
    5: 'VIERNES'
  }

  const dispatch = useDispatch();
  const { translate, currentLang } = useLocales();
  const currentCalendarLocale = currentLang.value === 'es' ? esLocale : enLocale;
  const { themeStretch } = useSettingsContext();

  useEffect(() => {
    const teacherSubjects = getTeacherSubjects();

    setSubjects(teacherSubjects);
  }, []);

  useEffect(() => {
    changeToWeekView();
  }, [isDesktop]);

  const changeToWeekView = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      const newView = isDesktop ? 'timeGridWeek' : 'listWeek';
      calendarApi.changeView(newView);
    }
  };

  const removeCurrentDayBackground = (calendarView) => {
    const { view } = calendarView;
    if (view.type === 'timeGridWeek') {
      const elements = document.querySelectorAll('.fc-day-today');

      if (elements) {
        elements.forEach(element => {
          element.classList.remove('fc-day-today')
        });
      }
    }
  };

  const createDraggableEvents = () => {
    const draggableEl = document.getElementById("external-events");
    // eslint-disable-next-line no-new
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: (eventEl) => {
        const title = eventEl.getAttribute("title");
        const id = eventEl.getAttribute("data-id");
        return {
          title,
          id
        };
      }
    });
  }

  const handleViewDidMount = (calendarView) => {
    removeCurrentDayBackground(calendarView);
    createDraggableEvents();
  }

  const handleOpenModal = () => {
    setOpenForm(true);
  };

  const handleDropEvent = ({ event }) => {
    const updatedEvents = calendarEvents.map(currentEvent => {
      if (currentEvent.id === event.id) {
        return {
          ...currentEvent,
          start: event.start
        }
      }
      return currentEvent;
    })

    setCalendarEvents(updatedEvents);
  };

  const handleSelectEvent = ({ event }) => {
    const selectedEvent = {
      id: event.id,
      allDay: event.allDay,
      start: event.start,
      end: event.end
    }
    console.log('Handle Selected Event', selectedEvent);
    handleOpenModal();
    setSelectedEventId(event.id);
  };

  const handleCloseModal = () => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectedEventId(null);
  };

  const handleCreateUpdateEvent = (newEvent) => {
    if (selectedEventId) {
      dispatch(updateEvent(selectedEventId, newEvent));
      enqueueSnackbar('Update success!');
    } else {
      dispatch(createEvent(newEvent));
      enqueueSnackbar('Create success!');
    }
  };

  const handleDeleteEvent = () => {
    try {
      if (selectedEventId) {
        handleCloseModal();
        dispatch(deleteEvent(selectedEventId));
        enqueueSnackbar('Delete success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropExternalEvent = (data) => {
    const { draggedEl: eventElement, date: eventDate} = data
    const title = eventElement.getAttribute("title");
    const color = eventElement.getAttribute("data-color");

    const calendarEvent = {
      id: generateUniqueIdentifier(),
      title,
      start: eventDate,
      textColor: color
    }
    
    setCalendarEvents([...calendarEvents, calendarEvent]);
  }

  const handleSave = () => {
    console.log(calendarEvents);
  };

  const handlePrint = () => {
    const calendarApi = calendarRef.current.getApi();
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>{translate(`${baseI18NKey}.helmet.title`)}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Calendar"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Calendar',
            },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleSave}
            >
              New Event
            </Button>
          }
        />

        <Card>  

          <button type="button" onClick={handlePrint}>Print Calendar</button>  

          <div style={{ margin: '10px'}}>
            <strong>Materias Asignadas:</strong>

            <div
              id="external-events"
              style={{
                padding: "10px",
                width: "100%",
                display: 'flex',
                flexDirection: isDesktop ? 'row': 'column',
                justifyContent: 'space-between', 
              }}
            >
              {subjects.map(event => (
                <StickyNote
                  className="fc-event"
                  data-id={event.id}
                  content={event.title}
                  title={event.title}
                  key={event.id}
                  color={event.textColor}
                />
              ))}
            </div>
          </div>

          <StyledCalendar>
            <CalendarToolbar />

            <FullCalendar
              editable
              droppable
              expandRows
              selectable
              allDayMaintainDuration
              eventResizableFromStart
              rerenderDelay={10}
              weekends={false}
              allDaySlot={false}
              locale={currentCalendarLocale}
              ref={calendarRef}
              initialDate={date}
              initialView='timeGridWeek'
              dayMaxEventRows={3}
              eventDisplay="block"
              events={calendarEvents}
              headerToolbar={false}
              eventDrop={handleDropEvent}
              eventClick={handleSelectEvent}
              height={isDesktop ? 720 : 'auto'}
              slotMinTime="07:30:00"
              slotMaxTime="17:30:00"
              slotDuration="01:00:00"
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
              dayHeaderFormat={{weekday: 'long' }}
              viewDidMount={handleViewDidMount}
              drop={handleDropExternalEvent}
            />
          </StyledCalendar>
        </Card>
      </Container>

      <Dialog fullWidth maxWidth="xs" open={openForm} onClose={handleCloseModal}>
        <DialogTitle>{true ? 'Edit Event' : 'Add Event'}</DialogTitle>

        <CalendarForm
          range={selectedRange}
          onCancel={handleCloseModal}
          onCreateUpdateEvent={handleCreateUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          colorOptions={COLOR_OPTIONS}
        />
      </Dialog>
    </>
  );
};
