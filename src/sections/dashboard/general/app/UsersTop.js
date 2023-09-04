import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import { alpha } from '@mui/material/styles';
import { Box, Stack, Card, CardHeader, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fShortenNumber } from '../../../../utils/formatNumber';
import Iconify from '../../../../components/iconify';
import { PATH_DASHBOARD } from '../../../../routes/paths';

UsersTop.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function UsersTop({ title, subheader, list, ...other }) {
  
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ['total'], ['desc']).map((user, index) => (
          <AuthorItem key={user.id} user={user} index={index} />
            ))}
      </Stack>
    </Card>
  );
}

AuthorItem.propTypes = {
  user
  : PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    total: PropTypes.number,
  }),
  index: PropTypes.number,
};

function AuthorItem({ user
  , index }) {

  const navigate = useNavigate();

  const handleRedirectUsers = () => {
    navigate(PATH_DASHBOARD.user.list);
  }
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Iconify
        icon="icon-park-outline:add-user"
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

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{user
        .name}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Iconify icon="solar:add-circle-bold" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(user
            .total)}
        </Typography>
      </Box>

      <IconButton onClick={handleRedirectUsers}>
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
