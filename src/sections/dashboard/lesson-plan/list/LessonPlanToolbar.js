import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import Iconify from '../../../../components/iconify';

LessonPlanToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterContent: PropTypes.string,
  filterPeriod: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterPeriod: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsPeriods: PropTypes.arrayOf(PropTypes.object),
};

export default function LessonPlanToolbar({
  isFiltered,
  filterContent,
  filterPeriod,
  optionsPeriods,
  onFilterName,
  onFilterPeriod,
  onResetFilter,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        select
        label="Period"
        value={filterPeriod}
        onChange={onFilterPeriod}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 380 },
          textTransform: 'capitalize',
        }}
      >
        {optionsPeriods.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterContent}
        onChange={onFilterName}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}