import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, Button } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { useLocales } from '../../../../locales';

StudentToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterContent: PropTypes.string,
  onFilterContent: PropTypes.func,
  onResetFilter: PropTypes.func,
};

export default function StudentToolbar({
  isFiltered,
  filterContent,
  onFilterContent,
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
        value={filterContent}
        onChange={onFilterContent}
        placeholder={translate('sections.toolbar_custom.search')}
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
};