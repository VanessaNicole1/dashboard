import PropTypes from 'prop-types';
import { Button, Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import Iconify from '../../../../../components/iconify';
import { useSettingsContext } from '../../../../../components/settings';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import FileNewFolderDialog from '../../../upload-file/FileNewFolderDialog';
import StudentsCSVTable from '../../../file/view/students-csv';

CreateStudents.propTypes = {
  checkout: PropTypes.object,
  onBackStep: PropTypes.func,
  onNextStep: PropTypes.func,
};

export default function CreateStudents({
  checkout,
  onBackStep,
  onNextStep,
}) {

  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [view, setView] = useState('list');
  const [data, setData] = useState([]);
  // const { cart, total, discount, subtotal } = checkout;

  const { themeStretch } = useSettingsContext();

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  return (
    <Grid container spacing={3}>
      <h1>Students</h1>
      <Helmet>
        <title> File Manager</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="File Students"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'File Students' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={handleOpenUploadFile}
            >
              Upload
            </Button>
          }
        />
        <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} inputData={data} onInputDataChange={setData} />
        {view === 'list' && (
            <StudentsCSVTable data={data} />
        )}
      </Container>
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={onNextStep}
      >
      Check Out
      </Button>

      <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>
    </Grid>
  );
}
