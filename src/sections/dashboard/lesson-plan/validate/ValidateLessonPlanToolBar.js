import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { RouterLink } from "../../../../routes/components";
import Label from "../../../../components/label/Label";
import { fDateTime } from "../../../../utils/formatTime";
import Iconify from "../../../../components/iconify/Iconify";

// TODO: Add i18n
export default function ValidateLessonPlanToolBar({
  status,
  backLink,
  createdAt,
  topic,
  enableValidateButton,
  onClickValidate,
  onPrint,
  isPrinting
}) {
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
            <Label variant="soft" color={status ? "info" : "warning"}>
              {status ? "Validated" : "Not Validated"}
            </Label>
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
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
          onClick={onPrint}
          disabled={isPrinting}
        >
          {isPrinting ? "Cargando..." : "Imprimir"}
        </Button>

        {enableValidateButton && (
          <Button
            color="inherit"
            variant="outlined"
            onClick={onClickValidate}
            startIcon={<Iconify icon="grommet-icons:validate" />}
          >
            Validar
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

ValidateLessonPlanToolBar.propTypes = {
  backLink: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  topic: PropTypes.string,
  status: PropTypes.bool,
  enableValidateButton: PropTypes.bool,
  onClickValidate: PropTypes.func,
  onPrint: PropTypes.func,
  isPrinting: PropTypes.bool
};
