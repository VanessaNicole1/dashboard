import PropTypes from "prop-types";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { RouterLink } from "../../../../routes/components";
import { fDateTime } from "../../../../utils/formatTime";
import Iconify from "../../../../components/iconify/Iconify";
import SignedFileDialog from "./SignedFileDialog";

// TODO: Add i18n
export default function ViewRemedialPlanToolBar({
  backLink,
  createdAt,
  topic,
  onPrint,
  isThePrintLoading,
  remedialPlanId
}) {

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

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
        <Button
          disabled={isThePrintLoading}
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="mdi:sign" />}
          onClick={handleOpenUploadFile}
        >
          Firmar
        </Button>
      </Stack>
      <SignedFileDialog onPrint={onPrint} isThePrintLoading={isThePrintLoading} remedialPlanId={remedialPlanId} open={openUploadFile} onClose={handleCloseUploadFile} />
    </Stack>
  );
}

ViewRemedialPlanToolBar.propTypes = {
  backLink: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  topic: PropTypes.string,
  onPrint: PropTypes.func,
  isThePrintLoading: PropTypes.bool,
  remedialPlanId: PropTypes.string
};
