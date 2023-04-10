import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { parse } from 'papaparse';
import { LoadingButton } from '@mui/lab';
import { RHFUpload } from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';
import FormProvider from '../../../../components/hook-form/FormProvider';
import Iconify from '../../../../components/iconify/Iconify';
import CreateEntityTable from './CreateEntityTable';
import { useLocales } from '../../../../locales';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '80%',
  },
});

CreateEntitiesForm.propTypes = {
  csv: PropTypes.any,
  entitiesData: PropTypes.array,
  onBackStep: PropTypes.func,
  onCreateEntities: PropTypes.func,
  validateEntities: PropTypes.func,
  csvHeaders: PropTypes.object,
  entity: PropTypes.string,
  tableHeaders: PropTypes.array
};

export default function CreateEntitiesForm({
  csv,
  entitiesData,
  onBackStep,
  onCreateEntities,
  validateEntities,
  csvHeaders,
  entity,
  tableHeaders
}) {
  const { translate } = useLocales();
  const commonI18NMessages = 'lesson_plan.start_process.common';
  const baseI18NEntityKey = `lesson_plan.start_process.${entity}`;
  const baseI18NCsvErrors = 'lesson_plan.start_process.csv_errors';
  const requiredHeaders = Object.keys(csvHeaders);
  const [openInformationTooltip, setOpenInformationTooltip] = useState(false);
  const [grades, setGrades] = useState([]);
  const [entities, setEntities] = useState(entitiesData);
  const [showTable, setShowTable] = useState();
  const [isCSVHeaderValid, setIsCSVHeaderValid] = useState();
  const [file, setFile] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const entitiesInformationSchema = Yup.object().shape({
    csv: Yup.array()
      .min(1, translate(`${baseI18NCsvErrors}.min_required`))
      .max(1, translate(`${baseI18NCsvErrors}.max_accepted`)),
  });

  const defaultValues = { csv };

  const methods = useForm({
    resolver: yupResolver(entitiesInformationSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isCSVHeaderValid) {
      const acceptedFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => csvHeaders[header],
        complete: (results) => onCompleteCSVParsing(results, acceptedFile),
      });
    }
  }, [file, isCSVHeaderValid]);

  useEffect(() => {
    if (entities && entities.length > 0) {
      validateEntitiesData();
    }
  }, [entities]);

  const validateEntitiesData = async () => {
    const validateEntitiesInfo = await validateEntities(entities);

    if (validateEntitiesInfo.errorMessage) {
      setValue('csv', []);
      setEntities([]);
      const validationErrorMessage = `${translate(`${baseI18NCsvErrors}.has_errors`)} \n ${validateEntitiesInfo.errorMessage}`;
      enqueueSnackbar(validationErrorMessage, manualHideErrorSnackbarOptions);
    } else {
      const entitiesGrades = entities.map(
        (student) => `${student.numberParallel} "${student.parallel}"`
      );
      const uniqueEntitiesGrades = ['all', ...new Set(entitiesGrades)];
      setGrades(uniqueEntitiesGrades);
      console.log(validateEntitiesInfo.message);
      enqueueSnackbar(validateEntitiesInfo.message, { variant: 'success', autoHideDuration: 5000 })
    }
  };

  const onCompleteCSVHeadersParsing = (uploadedCsvHeaders) => {
    const requiredHeadersAmount = Object.keys(csvHeaders).length;
    if (uploadedCsvHeaders.length !== requiredHeadersAmount) {
      const errorMessage = `${translate(`${commonI18NMessages}.required_headers_amount`, { amount: requiredHeaders.length })} ${requiredHeaders.join(', ')}`;
      setIsCSVHeaderValid(false);
      enqueueSnackbar(
        errorMessage,
        manualHideErrorSnackbarOptions
      );
      return;
    }

    for (const header of uploadedCsvHeaders) {
      const transformedHeader = csvHeaders[header];

      if (!transformedHeader) {
        setIsCSVHeaderValid(false);
        const headerMessage = translate(`${commonI18NMessages}.invalid_field`, { header });
        const invalidHeaderMessage = `${translate(`${baseI18NCsvErrors}.has_errors`)} \n ${headerMessage}`;
        enqueueSnackbar(invalidHeaderMessage, manualHideErrorSnackbarOptions);
        return;
      }
    }
    setIsCSVHeaderValid(true);
  };

  const onCompleteCSVParsing = (results, acceptedFile) => {
    const csvData = results.data.map((element) => ({
      ...element,
      id: element.email,
    }));

    if (csvData.length === 0) {
      enqueueSnackbar(translate(`${baseI18NCsvErrors}.empty`), manualHideErrorSnackbarOptions);
      setValue('csv', []);
    } else {
      setEntities(csvData);
      setValue('csv', [acceptedFile], { shouldValidate: true });
    }
  };

  const handleDrop = useCallback((acceptedFiles) => {
    setIsCSVHeaderValid(false);
    const uploadedFile = acceptedFiles[0];

    parse(uploadedFile, {
      skipEmptyLines: true,
      preview: 1,
      complete: (results) => {
        const uploadedCsvHeaders = results.data[0];
        onCompleteCSVHeadersParsing(uploadedCsvHeaders);
      },
    });

    setFile(uploadedFile);
  }, []);

  const handleRemoveFile = () => {
    setValue('csv', []);
    setEntities([]);
    setShowTable(false);
  };

  const onSubmit = () => {
    if (entities.length === 0) {
      enqueueSnackbar(
        translate(`${baseI18NEntityKey}.required_entity`),
        manualHideErrorSnackbarOptions
      );
      return;
    }
    onCreateEntities({ csv: values.csv, entities });
  };

  const onUploadFile = () => {
    setShowTable(true);
  };

  const handleTooltipOpen = () => {
    setOpenInformationTooltip(!openInformationTooltip);
  };

  const handleTooltipClose = () => {
    setOpenInformationTooltip(false);
  };

  const handleConfirmDialog = async (currentEntity, closeDialog) => {
    const { id } = currentEntity;
    let updatedEntities = [];

    if (id) {
      updatedEntities = await editEntities(currentEntity);
    } else {
      updatedEntities = await addEntity(currentEntity);
    }

    const areUpdatedEntitiesValid = await areEntitiesValid(updatedEntities);

    if (areUpdatedEntitiesValid) {
      setEntities(updatedEntities);
      closeDialog();
    }
  };

  const areEntitiesValid = async(updatedEntities) => {
    const validate = await validateEntities(updatedEntities);

    if (validate.errorMessage) {
      const validationErrorMessage = `${translate(`${commonI18NMessages}.validation_error`)} \n ${validate.errorMessage}`;
      enqueueSnackbar(validationErrorMessage, manualHideErrorSnackbarOptions);
      return false;
    }
    
    console.log(validate.message);

    enqueueSnackbar(validate.message, { variant: 'success', autoHideDuration: 5000 })
    return true;
  }

  const addEntity = async (entityToCreate) => {
    const newEntity = {
      id: entityToCreate.email,
      ...entityToCreate
    };

    return [...entities, newEntity];
  };

  const editEntities = async (entityToEdit) => {
    const { id } = entityToEdit;

    const updatedEntities = entities.map((currentEntity) => currentEntity.id === id ? entityToEdit : currentEntity);
    return updatedEntities;
  };

  return (
    <>
      <FormProvider id='csvForm' methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='subtitle1' gutterBottom>
          { translate(`${baseI18NEntityKey}.info`) } 
        
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <span>
              <CustomWidthTooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'transparent',
                      '& .MuiTooltip-arrow': {
                        color: 'common.black',
                      },
                    },
                  },
                }}
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={openInformationTooltip}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Alert severity='info' sx={{ marginBottom: 2 }}>
                    {translate(`${commonI18NMessages}.alert`)} {' '}
                    <b>{ requiredHeaders.join(',') }</b>
                  </Alert>
                }
              >
                <IconButton onClick={handleTooltipOpen}>
                  <Iconify
                    icon='mdi:information-variant-circle'
                    sx={{ color: (theme) => theme.palette.info.main }}
                  />
                </IconButton>
              </CustomWidthTooltip>
            </span>
          </ClickAwayListener>
        </Typography>

        <Divider />

        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <RHFUpload
              multiple
              thumbnail
              accept={{ 'text/csv': ['.csv'] }}
              name='csv'
              maxSize={3145728}
              onDrop={handleDrop}
              onRemove={handleRemoveFile}
              onUpload={onUploadFile}
              showStyledDropZone={!showTable}
              onRemoveAll={handleRemoveFile}
              removeAllButtonText={translate(`${commonI18NMessages}.remove_csv_files`)}
              uploadButtonText={translate(`${commonI18NMessages}.view_content`)}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </FormProvider>
      {showTable && (
        <CreateEntityTable
          handleEditEntity={handleConfirmDialog}
          gradeOptions={grades}
          entities={entities}
          setEntities={setEntities}
          tableHeaders={tableHeaders}
          entity={entity}
        />
      )}

      <Stack
        display='flex'
        direction='row'
        justifyContent='space-between'
        sx={{ mt: 3 }}
      >
        <Button
          size='small'
          color='inherit'
          onClick={onBackStep}
          startIcon={<Iconify icon='eva:arrow-ios-back-fill' />}
        >
          { translate(`${commonI18NMessages}.back_button`) } 
        </Button>

        <LoadingButton
          type='submit'
          form='csvForm'
          variant='contained'
          loading={isSubmitting}
        >
          { translate(`${commonI18NMessages}.next_button`) } 
        </LoadingButton>
      </Stack>
    </>
  );
}
