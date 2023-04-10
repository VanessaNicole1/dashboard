import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { Box, Button, DialogActions, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { RHFTextField } from '../../../../components/hook-form';
import FormProvider from '../../../../components/hook-form/FormProvider';
import { useLocales } from '../../../../locales';

EntityForm.propTypes = {
  entity: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  entityType: PropTypes.string,
  action: PropTypes.string
};

export default function EntityForm({ entity, onCancel, onSubmit, entityType, action }) {
  const { translate } = useLocales();
  const formI18NMessages = 'lesson_plan.start_process.common.form';
  const formI18ErrorMessages = `${formI18NMessages}.errors`;
  const baseI18NEntityKey = `lesson_plan.start_process.${entityType}`;
  const currentEntity = { entity: translate(`${baseI18NEntityKey}.entity`)};
  const isTeacher = entityType === 'teachers';
  const defaultValues = {
    name: entity.name || '',
    lastName: entity.lastName || '',
    email: entity.email || '',
    numberParallel: entity.numberParallel || '',
    parallel: entity.parallel || '',
    ...entity
  }

  const shape = {
    name: Yup.string()
      .min(3, translate(`${formI18ErrorMessages}.min_name`, currentEntity))
      .required(translate(`${formI18ErrorMessages}.required_name`, currentEntity)),
    lastName: Yup.string()
      .min(3, translate(`${formI18ErrorMessages}.min_lastname`, currentEntity))
      .required(translate(`${formI18ErrorMessages}.min_lastname`, currentEntity)),
    email: Yup.string()
      .email(translate(`${formI18ErrorMessages}.invalid_email`, currentEntity))
      .required(translate(`${formI18ErrorMessages}.required_email`, currentEntity)),
    numberParallel: Yup.string()
      .matches(/^[0-9]+$/, translate(`${formI18ErrorMessages}.only_numbers`))
      .max(2, translate(`${formI18ErrorMessages}.max_number_parallel`, currentEntity))
      .required(translate(`${formI18ErrorMessages}.required_number_parallel`, currentEntity)),
    parallel: Yup.string()
      .max(1, translate(`${formI18ErrorMessages}.max_parallel`, currentEntity))
      .required(translate(`${formI18ErrorMessages}.required_parallel`, currentEntity)),
  };

  if (isTeacher) {
    shape.subject = Yup.string()
      .min(3, translate(`${formI18ErrorMessages}.min_subject`, currentEntity))
      .required(translate(`${formI18ErrorMessages}.required_subject`, currentEntity));

    defaultValues.subject = entity.subject || '';
  }

  const entitySchema = Yup.object().shape(shape);

  const methods = useForm({
    resolver: yupResolver(entitySchema),
    defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit((data) => onSubmit(data, onCancel))}
    >
      <Grid container spacing={3} sx={{ px: 3 }}>
        <Grid item xs={6}>
          <RHFTextField name='name' label={ translate(`${formI18NMessages}.name`) } />
        </Grid>

        <Grid item xs={6}>
          <RHFTextField name='lastName' label={ translate(`${formI18NMessages}.last_name`) } />
        </Grid>

        {isTeacher && (
          <Grid item xs={12}>
            <RHFTextField name='subject' label={ translate(`${formI18NMessages}.subject`) } />
          </Grid>
        )}

        <Grid item xs={12}>
          <RHFTextField name='email' label={ translate(`${formI18NMessages}.email`) } />
        </Grid>

        <Grid item xs={6}>
          <RHFTextField name='numberParallel' label={ translate(`${formI18NMessages}.number_parallel`) } />
        </Grid>

        <Grid item xs={6}>
          <RHFTextField name='parallel' label={ translate(`${formI18NMessages}.parallel`) }/>
        </Grid>
      </Grid>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant='outlined' color='inherit' onClick={onCancel}>
          { translate(`${formI18NMessages}.buttons.cancel`) }
        </Button>

        <LoadingButton type='submit' variant='contained' loading={isSubmitting} >
          { `${translate(`${formI18NMessages}.buttons.${action}`)} ${translate(`${baseI18NEntityKey}.entity`)}` }
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
