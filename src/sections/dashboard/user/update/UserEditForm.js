import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, Chip } from '@mui/material';
import { fData } from '../../../../utils/formatNumber';
import Label from '../../../../components/label';
import FormProvider, {
  RHFAutocomplete,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import { getUser, updateUser } from '../../../../services/user';
import { getRoles } from '../../../../services/role';
import { manualHideErrorSnackbarOptions } from '../../../../utils/snackBar';
import { useSnackbar } from '../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../routes/paths';

UserEditForm.propTypes = {
  currentUserId: PropTypes.string,
};

export default function UserEditForm({ currentUserId }) {

  const [currentUser, setCurrentUser] = useState({});
  const [simpleRoles, setSimpleRoles] = useState([]);
  const [currentRoles, setCurrentRoles] = useState([]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const userSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.number(),
    identificationCard: Yup.string(),
    city: Yup.string(),
    roles: Yup.array().min(1, 'A role should be select at least'),
    isActive: Yup.boolean(),
    avatarUrl: Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || 0,
      identificationCard: currentUser?.identificationCard || '',
      city: currentUser?.city || '',
      roles: currentUser?.roles || [],
      isActive: currentUser?.isActive || false,
      avatarUrl: currentUser?.avatarUrl || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(currentUserId);
      setCurrentRoles(user.roles);
      setCurrentUser(user);
    }
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRoles();
      const validateCurrentRoles = currentRoles.map((role) => role.name);
      if (validateCurrentRoles.includes('STUDENT')) {
        const studentRole = roles.filter((role) => role.name === 'STUDENT');
        setSimpleRoles(studentRole);
      } else {
        const newCurrentRoles = roles.filter((role) => role.name !== 'STUDENT');
        setSimpleRoles(newCurrentRoles);
      }
    }
    fetchRoles();
  }, [currentUser]);
  

  useEffect(() => {
    if (currentUser) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const methods = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    const updatedUser = await updateUser(currentUser.id, data);
    if (updatedUser.errorMessage) {
      enqueueSnackbar(updatedUser.errorMessage, manualHideErrorSnackbarOptions);
      navigate(PATH_DASHBOARD.user.list);
    } else {
      enqueueSnackbar(updatedUser.message, { variant: 'success', autoHideDuration: 5000 });
      navigate(PATH_DASHBOARD.user.list);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  function removeDuplicates(arr) {
    const tempObject = {};
    for (const obj of arr) {
      const attrValue = obj.id;
      if (!tempObject[attrValue]) {
        tempObject[attrValue] = obj;
      }
    }
    const uniqueArray = Object.values(tempObject);
    return uniqueArray;
  }

  const handleRoleChange = (event, newValue) => {
    const validValues = removeDuplicates(newValue);
    setValue("roles", validValues);
    setCurrentRoles(validValues);
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {true && (
              <Label
                color={values.isActive === true ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.isActive ? 'Active' : 'Inactive'}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {true && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== true}
                        onChange={(event) =>
                          field.onChange(!event.target.checked)
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="identificationCard" label="Identification Card" />
              <RHFAutocomplete
                control={control}
                value={currentRoles}
                name="roles"
                label="roles"
                multiple
                freeSolo
                onChange={handleRoleChange}
                options={simpleRoles.map(
                  (role) => ({id: role.id, name: role.name})
                )}
                getOptionLabel={(option) => option.name}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      disabled={option.isValidated === true}
                    />
                  ))
                }
                ChipProps={{ size: "small" }}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}