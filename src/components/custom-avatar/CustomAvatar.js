import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Badge, Avatar } from '@mui/material';

const getCharAtName = (name, custom = undefined) => {
  if (!custom) {
    return name && name.charAt(0).toUpperCase();
  }

  return name && `${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}`;
}

const getColorByName = (name, other = {}) => {
  if (['A', 'N', 'H', 'L', 'Q', '1', '6', '11', '16', '21', '26'].includes(getCharAtName(name, other.custom))) return 'primary';
  if (['F', 'G', 'T', 'I', 'J', '2', '7', '12', '17', '22', '27'].includes(getCharAtName(name, other.custom))) return 'info';
  if (['K', 'D', 'Y', 'B', 'O', '3', '8', '13', '18', '23', '28'].includes(getCharAtName(name, other.custom))) return 'success';
  if (['P', 'E', 'R', 'S', 'U', '4', '9', '14', '19', '24', '29'].includes(getCharAtName(name, other.custom))) return 'warning';
  if (['V', 'W', 'X', 'M', 'Z', '5', '10', '15', '20', '25', '30'].includes(getCharAtName(name, other.custom))) return 'error';
  return 'default';
};

const CustomAvatar = forwardRef(({ color, name = '', BadgeProps, children, sx, ...other }, ref) => {
  const theme = useTheme();

  const charAtName = getCharAtName(name, other.custom);

  const colorByName = getColorByName(name, other);

  const colr = color || colorByName;

  const renderContent =
    colr === 'default' ? (
      <Avatar ref={ref} sx={sx} {...other}>
        {name && charAtName}
        {children}
      </Avatar>
    ) : (
      <Avatar
        ref={ref}
        sx={{
          color: theme.palette[colr]?.contrastText,
          backgroundColor: theme.palette[colr]?.main,
          fontWeight: theme.typography.fontWeightMedium,
          ...sx,
        }}
        {...other}
      >
        {name && charAtName}
        {children}
      </Avatar>
    );

  return BadgeProps ? (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...BadgeProps}
    >
      {renderContent}
    </Badge>
  ) : (
    renderContent
  );
});

CustomAvatar.propTypes = {
  sx: PropTypes.object,
  name: PropTypes.string,
  children: PropTypes.node,
  BadgeProps: PropTypes.object,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
};

export default CustomAvatar;
