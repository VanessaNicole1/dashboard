import PropTypes from 'prop-types';
import { Grid, CardHeader, Typography, CardContent, Card } from '@mui/material';
import CreateGeneralInformationForm from './CreateGeneralInformationForm';

FillGeneralInformation.propTypes = {
  onFillGeneralInformation: PropTypes.func,
  generalInformation: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    manager: PropTypes.string,
    degree: PropTypes.string,
  }),
};

export default function FillGeneralInformation({
  generalInformation,
  onFillGeneralInformation,
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Card sx={{ mb: 3 }} style={{ paddingBottom: 40 }}>
          <CardHeader
            title={<Typography variant='h4'>General Information</Typography>}
          />

          <CardContent>
            <CreateGeneralInformationForm
              generalInformation={generalInformation}
              onFillGeneralInformation={onFillGeneralInformation}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
