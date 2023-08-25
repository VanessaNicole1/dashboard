import { Box, Stack, Tooltip, alpha } from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../iconify/Iconify";

export const TimeLineIcon = ({ item }) => {
  const statusColor = {
    COMPLETED: "primary.main",
    IN_PROGRESS: "orange",
    INCOMPLETED: "gray",
  };

  const tooltipText = {
    COMPLETED: "Completado",
    IN_PROGRESS: "En progreso",
    INCOMPLETED: "Pendiente",
  }

  const getBackgroundColor = (theme) => {
    const bgColor = {
      COMPLETED: theme.palette.primary.main,
      IN_PROGRESS: "#ED6903",
      INCOMPLETED: "#9F9D98",
    };

    return alpha(bgColor[item.status], 0.1);
  };

  return (
    <>
      {item && (
        <Tooltip title={tooltipText[item.status]}>
          <Box sx={{ textAlign: "center" }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                borderRadius: "50%",
                color: statusColor[item.status],
                bgcolor: (theme) => getBackgroundColor(theme),
              }}
            >
              <Iconify icon={item.icon} width={36} />
            </Stack>
          </Box>
        </Tooltip>
      )}
    </>
  );
};

TimeLineIcon.propTypes = {
  item: PropTypes.any,
};
