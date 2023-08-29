import PropTypes from "prop-types";
import { useState } from "react";
import { Chip, Tooltip } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { RouterLink } from "../../../../routes/components";
import { fDateTime } from "../../../../utils/formatTime";
import Iconify from "../../../../components/iconify/Iconify";
import SignedFileManagerDialog from "./SignedFileManagerDialog";

export default function RemedialPlanManagerToolBar({
  reports,
  isSignedByTeacher,
  backLink,
  createdAt,
  topic,
  remedialPlanId,
  isValidatedByManager,
}) {
  const [openUploadFile, setOpenUploadFile] = useState(false);

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const handleValidateReport = () => {};

  return (
    <Stack
      spacing={3}
      direction={{ xs: "column", md: "row" }}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <IconButton component={RouterLink} href={backLink}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        <Stack spacing={0.5}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h4">{topic}</Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: "text.disabled" }}>
            {fDateTime(createdAt)}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        flexGrow={1}
        spacing={1.5}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        {isSignedByTeacher ? (
          <Button
            disabled={isValidatedByManager}
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="mdi:sign" />}
            onClick={handleOpenUploadFile}
          >
            Firmar
          </Button>
        ) : (
          <Tooltip title="Una vez que el docente haya firmado el reporte, usted podrá validar el mismo.">
            <Chip
              variant="filled"
              color="warning"
              label="El docente aún no ha firmado el reporte"
            />
          </Tooltip>
        )}
      </Stack>

      {isSignedByTeacher && (
        <SignedFileManagerDialog
          reports={reports}
          onValidate={handleValidateReport}
          remedialPlanId={remedialPlanId}
          open={openUploadFile}
          onClose={handleCloseUploadFile}
        />
      )}
    </Stack>
  );
}

RemedialPlanManagerToolBar.propTypes = {
  reports: PropTypes.any,
  isSignedByTeacher: PropTypes.bool,
  backLink: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  topic: PropTypes.string,
  remedialPlanId: PropTypes.string,
  isValidatedByManager: PropTypes.bool,
};
