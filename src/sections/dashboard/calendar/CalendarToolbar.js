import { Stack, Typography } from '@mui/material';

export default function CalendarToolbar() {

  return (
    <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2.5, pr: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6">Plan de Clases</Typography>
        </Stack>
      </Stack>
  );
}
