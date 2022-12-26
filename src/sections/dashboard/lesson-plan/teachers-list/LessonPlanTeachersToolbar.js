import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { useLocales } from '../../../../locales';

LessonPlanTeachersToobar.propTypes = {
  isFiltered: PropTypes.bool,
  filterContent: PropTypes.string,
  filterGrade: PropTypes.string,
  onFilterContent: PropTypes.func,
  onFilterGrade: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsGrade: PropTypes.arrayOf(PropTypes.string),
};

export default function LessonPlanTeachersToobar({
  isFiltered,
  filterContent,
  filterGrade,
  optionsGrade,
  onFilterContent,
  onFilterGrade,
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
        label={translate('sections.lesson_plan_toolbar.grade')}
        value={filterGrade}
        onChange={onFilterGrade}
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
        {optionsGrade.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            { option === 'all' ? translate('sections.toolbar_custom.all_option'): option}
          </MenuItem>
        ))}
      </TextField>

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