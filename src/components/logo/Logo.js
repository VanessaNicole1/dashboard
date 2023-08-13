import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';
import { useSettingsContext } from '../settings';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const { themeMode } = useSettingsContext();
  const baseLogoPath = "/assets/logo/unl";
  const logoPath = `${baseLogoPath}-${themeMode === 'light' ? 'black': 'white'}.png`;

  const logo = (
    <Box
      component="img"
      src={logoPath}
      sx={{height: 65, width: 200}}
    />
  );


  if (disabledLink) {
    return logo;
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <Link component={RouterLink} to="/" sx={{ display: 'contents'}}>
        {logo}
      </Link>
    </div>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
