import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import esLocale from "@fullcalendar/core/locales/es";
import enLocale from "@fullcalendar/core/locales/en-au";
import {
  Card,
  Button,
  Container,
  DialogTitle,
  Dialog,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocales } from "../../../locales";
import useResponsive from "../../../hooks/useResponsive";
import { useSettingsContext } from "../../../components/settings";
import Iconify from "../../../components/iconify";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { useSnackbar } from "../../../components/snackbar";
import {
  CalendarForm,
  StyledCalendar,
  CalendarToolbar,
} from "../../../sections/dashboard/calendar";
import { generateUniqueIdentifier } from "../../../utils/numberGenerator";
import StickyNote from "../../../components/sticky-note/StickyNote";
import { getSchedules, updateSchedule } from "../../../services/schedule";
import { useAuthContext } from "../../../auth/useAuthContext";
import {
  findTeacherActivePeriods,
  getTeacherEvents,
} from "../../../services/teacher";
import { getObjectNestedValueByString } from "../../../utils/object";
import { updateTeacherConfigEvent } from "../../../services/teacherConfigEvent";
import { manualHideErrorSnackbarOptions } from "../../../utils/snackBar";

const COLOR_OPTIONS = [
  "#00AB55",
  "#1890FF",
  "#54D62C",
  "#FFC107",
  "#FF4842"
];

const CONFIG_EVENTS_COLORS = [
  "#FF4842",
  "#92E5E6"
];

export default function SchedulePage() {
  const baseI18NKey = "schedule";
  const oneHourInMiliseconds = 60 * 60 * 1000;
  const calendarRef = useRef(null);
  const isDesktop = useResponsive("up", "sm");
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const [openForm, setOpenForm] = useState(false);

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [eventsConfig, setEventsConfig] = useState([]);
  const [teacherActivePeriods, setTeacherActivePeriods] = useState([]);

  const [selectedActivePeriod, setSelectedActivePeriod] = useState();
  const [selectedEvent, setSelectedEvent] = useState();

  const { translate, currentLang } = useLocales();
  const currentCalendarLocale = currentLang.value === "es" ? esLocale : enLocale;
  const { themeStretch } = useSettingsContext();

  const getTeacherSchedules = async (periodId) => {
    const schedules = await getSchedules(periodId, user.id);
    return schedules;
  };

  const getTeacherConfigEvents = async (periodId) => {
    const teacherEvents = await getTeacherEvents(periodId, user.id);
    return teacherEvents;
  };

  const daysMapping = {
    1: "LUNES",
    2: "MARTES",
    3: "MIERCOLES",
    4: "JUEVES",
    5: "VIERNES",
  };

  const getCalendarDateByDay = (dayName) => {
    const daysMappingToDates = {
      LUNES: "13",
      MARTES: "14",
      MIERCOLES: "15",
      JUEVES: "16",
      VIERNES: "17",
    };

    return new Date(`2023-06-${daysMappingToDates[dayName]}`);
  };

  const getCalendarEventsByMetadata = (metadata, color, eventTitle) => {
    const events = [];

    if (!metadata?.days) {
      return events;
    }

    metadata.days.forEach((day) => {
      const currentStartDate = getCalendarDateByDay(day.name);

      day.times.forEach((time) => {
        const [startTimeHour, startTimeMinutes] = time.start.split(":");
        currentStartDate.setHours(+startTimeHour);
        currentStartDate.setMinutes(+startTimeMinutes);
        const currentEndDate = new Date(
          currentStartDate.getTime() + oneHourInMiliseconds
        );

        const calendarEvent = {
          id: generateUniqueIdentifier(),
          title: eventTitle,
          start: new Date(currentStartDate.getTime()),
          end: currentEndDate,
          textColor: color,
        };

        events.push(calendarEvent);
      });
    });

    return events;
  };

  const getStickyNotesAndEvents = (
    elements,
    titleEventKey,
    objectKey,
    COLORS
  ) => {
    const stickyNotes = [];
    let events = [];

    elements.forEach((element, index) => {
      const elementMetadata = element.metadata;
      const color = elementMetadata?.color || COLORS[index];
      const title = getObjectNestedValueByString(element, titleEventKey);

      events = [
        ...events,
        ...getCalendarEventsByMetadata(elementMetadata, color, title),
      ];

      const note = {
        ...getObjectNestedValueByString(element, objectKey),
        title,
        id: element.id,
        textColor: color,
      };

      stickyNotes.push(note);
    });

    return [stickyNotes, events];
  };

  useEffect(() => {
    const fetchTeacherActivePeriods = async () => {
      const activePeriods = await findTeacherActivePeriods(user.id);
      if (activePeriods.length > 0) {
        setSelectedActivePeriod(activePeriods[0].id);
        setTeacherActivePeriods(activePeriods);
      }
    };

    fetchTeacherActivePeriods();
  }, []);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const [teacherSchedules, teacherConfigEvents] = await Promise.all([
        getTeacherSchedules(selectedActivePeriod),
        getTeacherConfigEvents(selectedActivePeriod),
      ]);
      const [teacherSubjects, teacherCalendarEvents] = getStickyNotesAndEvents(
        teacherSchedules,
        "subject.name",
        "subject",
        COLOR_OPTIONS
      );
      const [teacherExternalEvents, teacherCalendarConfigEvents] =
        getStickyNotesAndEvents(
          teacherConfigEvents,
          "eventName",
          "",
          CONFIG_EVENTS_COLORS
        );

      setCalendarEvents([
        ...teacherCalendarEvents,
        ...teacherCalendarConfigEvents,
      ]);
      setSubjects(teacherSubjects);
      setEventsConfig(teacherExternalEvents);
    };

    if (selectedActivePeriod) {
      fetchCalendarEvents();
    }
  }, [selectedActivePeriod]);

  useEffect(() => {
    changeToWeekView();
  }, [isDesktop]);

  const changeToWeekView = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? "timeGridWeek" : "listWeek";
      calendarApi.changeView(newView);
    }
  };

  const removeCurrentDayBackground = (calendarView) => {
    const { view } = calendarView;
    if (view.type === "timeGridWeek") {
      const elements = document.querySelectorAll(".fc-day-today");

      if (elements) {
        elements.forEach((element) => {
          element.classList.remove("fc-day-today");
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
          id,
        };
      },
    });
  };

  const handleViewDidMount = (calendarView) => {
    removeCurrentDayBackground(calendarView);
    createDraggableEvents();
  };

  const handleOpenModal = () => {
    setOpenForm(true);
  };

  const handleDropEvent = ({ event }) => {
    const updatedEvents = calendarEvents.map((currentEvent) => {
      if (currentEvent.id === event.id) {
        return {
          ...currentEvent,
          start: event.start,
          end: new Date(event.start.getTime() + oneHourInMiliseconds),
        };
      }
      return currentEvent;
    });

    setCalendarEvents(updatedEvents);
  };

  const handleSelectEvent = ({ event }) => {
    const currentEvent = {
      id: event.id,
      title: event.title,
      allDay: event.allDay,
      start: event.start,
      end: event.end,
      color: event.textColor,
      day: daysMapping[event.start.getDay()]
    };
    setSelectedEvent(currentEvent);
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setOpenForm(false);
  };

  const handleDeleteEvent = () => {
    const updatedCalendarEvents = calendarEvents.filter(calendarEvent => calendarEvent.id !== selectedEvent.id);
    setCalendarEvents(updatedCalendarEvents);
    handleCloseModal();
  };

  const handleDropExternalEvent = (data) => {
    const { draggedEl: eventElement, date: eventDate } = data;
    const title = eventElement.getAttribute("title");
    const color = eventElement.getAttribute("data-color");

    const calendarEvent = {
      id: generateUniqueIdentifier(),
      title,
      start: eventDate,
      end: new Date(eventDate.getTime() + oneHourInMiliseconds),
      textColor: color,
    };

    setCalendarEvents([...calendarEvents, calendarEvent]);
  };

  const getFormattedHours = (hours, minutes) => `${hours}:${minutes}`;

  const getCalendarEventTimeRange = (calendarEvent) => {
    const { start } = calendarEvent;
    const startHour = start.getHours();
    const minutes = start.getMinutes();
    const startHourTime = getFormattedHours(startHour, minutes);
    const endHourTime = getFormattedHours(startHour + 1, minutes);
    return {
      start: startHourTime,
      end: endHourTime,
    };
  };

  const getDataByCalendarEvents = (
    elements,
    elementCalendarEvents,
    nameKey
  ) => {
    const data = [];

    for (const element of elements) {
      const dataObject = { ...element };
      dataObject.days = [];

      const title = dataObject[nameKey];

      for (const calendarEvent of elementCalendarEvents) {
        const { title: calendarEventTitle, start } = calendarEvent;

        if (title === calendarEventTitle) {
          const currentDay = daysMapping[start.getDay()];
          const currentTimeRange = getCalendarEventTimeRange(calendarEvent);
          const dataObjectDayIndex = dataObject.days.findIndex(
            (dataObjectDay) => dataObjectDay.name === currentDay
          );

          if (dataObjectDayIndex !== -1) {
            dataObject.days[dataObjectDayIndex].times.push(currentTimeRange);
          } else {
            const newDay = {
              name: currentDay,
              times: [currentTimeRange],
            };
            dataObject.days.push(newDay);
          }
        }
      }
      data.push(dataObject);
    }
    return data;
  };

  const handleSave = async () => {
    const calendarScheduleEvents = [];
    const calendarEventsConfig = [];
    const scheduleEventsNames = subjects.map((subject) => subject.name);
    const eventsConfigNames = eventsConfig.map(
      (eventConfig) => eventConfig.eventName
    );

    calendarEvents.forEach((event) => {
      const eventName = event.title;

      if (scheduleEventsNames.includes(eventName)) {
        calendarScheduleEvents.push(event);
      }

      if (eventsConfigNames.includes(eventName)) {
        calendarEventsConfig.push(event);
      }
    });

    const schedules = getDataByCalendarEvents(
      subjects,
      calendarScheduleEvents,
      "title"
    );
    const configEvents = getDataByCalendarEvents(
      eventsConfig,
      calendarEventsConfig,
      "eventName"
    );

    const updateSchedulePromises = [];
    const updateConfigEventPromises = [];

    for (const schedule of schedules) {
      const metadata = {
        days: schedule.days,
        color: schedule.textColor,
      };
      const updateScheduleRequest = updateSchedule(schedule.id, metadata);
      updateSchedulePromises.push(updateScheduleRequest);
    }

    for (const configEvent of configEvents) {
      const metadata = {
        days: configEvent.days,
        color: configEvent.textColor,
      };
      const updateConfigEventRequest = updateTeacherConfigEvent(
        configEvent.id,
        metadata
      );
      updateConfigEventPromises.push(updateConfigEventRequest);
    }

    try {
      await Promise.all([
        ...updateSchedulePromises,
        ...updateConfigEventPromises,
      ]);
      const successfulText = translate(`${baseI18NKey}.handleSave.success`);
      enqueueSnackbar(successfulText, { variant: 'success', autoHideDuration: 5000 });
    } catch (error) {
      const errorText = translate(`${baseI18NKey}.handleSave.error`);
      enqueueSnackbar(errorText, manualHideErrorSnackbarOptions);
    }
  };

  const handlePeriodChange = (e) => {
    setSelectedActivePeriod(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>{translate(`${baseI18NKey}.helmet.title`)}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomBreadcrumbs
          heading={translate(`${baseI18NKey}.breacrumb.heading`)}
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate(`${baseI18NKey}.breacrumb.schedule_link`),
            },
          ]}
          action={
            selectedActivePeriod && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="material-symbols:save-outline" />}
                onClick={handleSave}
              >
                {translate(`${baseI18NKey}.breacrumb.action_button`)}
              </Button>
            )
          }
        />

        {teacherActivePeriods.length > 0 ? (
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="demo-simple-select-label">{translate(`${baseI18NKey}.select.label`)}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedActivePeriod}
              label="Periodo"
              onChange={handlePeriodChange}
            >
              {teacherActivePeriods.map((period) => (
                <MenuItem key={period.id} value={period.id}>
                  {period.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Alert severity="warning">
            {translate(`${baseI18NKey}.alert.text`)}
          </Alert>
        )}

        {selectedActivePeriod && (
          <Card>
            <div style={{ margin: "10px" }}>
              <strong>Materias Asignadas:</strong>

              <div
                id="external-events"
                style={{
                  padding: "10px",
                  width: "100%",
                  display: "flex",
                  flexDirection: isDesktop ? "row" : "column",
                  justifyContent: "space-between",
                }}
              >
                {subjects.map((event) => (
                  <StickyNote
                    className="fc-event"
                    data-id={event.id}
                    content={event.title}
                    title={event.title}
                    key={event.id}
                    color={event.textColor}
                  />
                ))}

                {eventsConfig.map((event) => (
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
                validRange={{
                  start: "2023-06-12",
                  end: "2023-06-17",
                }}
                initialView="timeGridWeek"
                dayMaxEventRows={3}
                eventDisplay="block"
                events={calendarEvents}
                headerToolbar={false}
                eventDrop={handleDropEvent}
                eventClick={handleSelectEvent}
                height={isDesktop ? 720 : "auto"}
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
                dayHeaderFormat={{ weekday: "long" }}
                viewDidMount={handleViewDidMount}
                drop={handleDropExternalEvent}
              />
            </StyledCalendar>
          </Card>
        )}
      </Container>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={openForm}
        onClose={handleCloseModal}
      >
        <DialogTitle>{translate(`${baseI18NKey}.dialog.title`)}</DialogTitle>

        <CalendarForm
          event={selectedEvent}
          onCancel={handleCloseModal}
          onDeleteEvent={handleDeleteEvent}
        />
      </Dialog>
    </>
  );
}
