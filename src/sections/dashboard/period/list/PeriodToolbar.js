import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { useLocales } from '../../../../locales';

PeriodToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterContent: PropTypes.string,
  filterManager: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterManager: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsManagers: PropTypes.arrayOf(PropTypes.object),
};

export default function PeriodToolbar({
  isFiltered,
  filterContent,
  filterManager,
  optionsManagers,
  onFilterName,
  onFilterManager,
  onResetFilter,
}) {

  const { translate } = useLocales();
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
        label={translate("period_list_page.manager")}
        value={filterManager}
        onChange={onFilterManager}
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
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsManagers.map((option) => (
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
        placeholder={translate("period_list_page.search")}
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