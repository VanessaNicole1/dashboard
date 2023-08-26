import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import { alpha } from '@mui/material/styles';
import { Box, Stack, Card, CardHeader, Typography } from '@mui/material';
import Iconify from '../../../../components/iconify';
import CustomAvatar from '../../../../components/custom-avatar/CustomAvatar';

UploadReport.propTypes = {
  remedialReports: PropTypes.array,
};

export default function UploadReport({ remedialReports, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ['favourite'], ['desc']).map((author, index) => (
          <AuthorItem key={author.id} author={author} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Recursos de la clase:
        </Typography>
        {remedialReports.map((resource, index) => (
          <FileRecentItem
            key={index}
            file={resource}
            onDelete={() => console.info('DELETE', resource)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
