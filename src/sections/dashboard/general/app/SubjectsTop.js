import PropTypes from 'prop-types';
import { Box, Link, Card, CardHeader, Typography, Stack, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Scrollbar from '../../../../components/scrollbar';
import CustomAvatar from '../../../../components/custom-avatar/CustomAvatar';
import Iconify from '../../../../components/iconify/Iconify';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function SubjectsTop({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={1.5} sx={{ p: 3, pr: 0 }}>
          {list.map((subject, index) => (
            <ProductItem key={subject.id} subject={subject} index={index} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

SubjectsTop.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

ProductItem.propTypes = {
  subject: PropTypes.shape({
    name: PropTypes.string,
    total: PropTypes.number,
  }),
  index: PropTypes.number,

};

function ProductItem({ subject, index }) {
  const { name, total } = subject;

  const navigate = useNavigate();

  const handleViewReports = () => {
    navigate(PATH_DASHBOARD.reports.root);
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <CustomAvatar src={name} alt={name} name={`${name} ${name}`} />
      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link sx={{ color: 'text.primary', typography: 'subtitle2' }}>{name}</Link>
        <Stack direction="row">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {(`${total} Planes de Clases`)}
          </Typography>
        </Stack>
      </Box>
      <IconButton onClick={handleViewReports}>
        <Iconify
          icon="mdi:eye"
          sx={{
            p: 1,
            width: 40,
            height: 40,
            borderRadius: '50%',
            color: 'primary.main',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            ...(index === 1 && {
              color: 'info.main',
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
            }),
            ...(index === 2 && {
              color: 'error.main',
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            }),
          }}
        />
      </IconButton>
    </Stack>
  );
}
