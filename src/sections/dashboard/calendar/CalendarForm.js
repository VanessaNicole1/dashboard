import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, Button, TextField, DialogActions } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import Iconify from '../../../components/iconify';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useLocales } from '../../../locales';

const getInitialValues = (event, range) => {
  const initialEvent = {
    title: '',
    color: event.color,
    allDay: false,
    start: range ? new Date(range.start).toISOString() : new Date().toISOString(),
    end: range ? new Date(range.end).toISOString() : new Date().toISOString(),
    day: event.day
  };

  if (event || range) {
    return merge({}, initialEvent, event);
  }

  return initialEvent;
};

CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
  onDeleteEvent: PropTypes.func,
};

export default function CalendarForm({
  event,
  range,
  onDeleteEvent,
  onCancel,
}) {
  const baseI18NKey = 'calendarForm';
  const { translate } = useLocales();

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required(translate(`${baseI18NKey}.event_schema.required_title`)),
    day: Yup.string().max(10).required(translate(`${baseI18NKey}.event_schema.required_day`))
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });

  const {
    control,
    handleSubmit,
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onDeleteEvent)}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField
          name="title"
          label={translate(`${baseI18NKey}.form.title.label`)}
          disabled 
        />

        <RHFTextField
          name="day"
          label={translate(`${baseI18NKey}.form.day.label`)}
          disabled 
        />

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              disabled
              onChange={(newValue) => field.onChange(newValue)}
              label={translate(`${baseI18NKey}.form.start_date.label`)}
              inputFormat="hh:mm a"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              disabled
              onChange={(newValue) => field.onChange(newValue)}
              label={translate(`${baseI18NKey}.form.end_date.label`)}
              inputFormat="hh:mm a"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                />
              )}
            />
          )}
        />
      </Stack>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          {translate(`${baseI18NKey}.dialog.cancel_button`)}
        </Button>
        
        <Button type="submit" variant="outlined" color='error' startIcon={<Iconify icon="eva:trash-2-outline" />}>
          {translate(`${baseI18NKey}.dialog.delete_button`)}
        </Button>
      </DialogActions>
    </FormProvider>
  );
}
