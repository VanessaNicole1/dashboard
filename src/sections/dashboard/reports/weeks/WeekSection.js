import PropTypes from 'prop-types';
import { Box, Link, Card, CardHeader, Typography, Stack, Tooltip, IconButton, Alert } from '@mui/material';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify/Iconify';
import CustomAvatar from '../../../../components/custom-avatar/CustomAvatar';

WeeksReportSection.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function WeeksReportSection({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar sx={{height: '450px'}}>
        <Stack spacing={3} sx={{ p: 3 }}>
          {
            list.length === 0 ? (
              <Alert severity='info'>
                Aún no hay reportes semanales
              </Alert>
            ): 
            list.map((week) => (
            <WeekItem key={week.id} week={week} />
            ))
          }
        </Stack>
      </Scrollbar>
    </Card>
  );
}

WeekItem.propTypes = {
  week: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    range: PropTypes.string
  }),
};

function WeekItem({ week }) {
  const { name, id, range } = week;

  return (
    <Stack direction="row" spacing={2}>
      <CustomAvatar
        name={`${id}`}
        custom="yes"
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{name}</Link>

        <Stack direction="row">
          <Typography variant="body2" sx={{ color:'text.secondary' }}>
            {range}
          </Typography>
        </Stack>
      </Box>

      <Tooltip title={`Generar Reporte ${name}`}>
        <IconButton>
          <Iconify icon="tabler:report"/>
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
