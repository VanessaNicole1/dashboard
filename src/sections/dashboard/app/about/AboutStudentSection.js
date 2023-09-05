import { Button, Grid, Stack } from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";
import A2Resolution from "../resolution/A2Resolution";

export default function AboutStudentSection() {
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Grid item xs={12} md={6} lg={6}>
        <Stack
          display="flex"
          align="flex-start"
          spacing={3}
          direction={{ xs: "column", md: "row" }}
          justifyContent="flex-start"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Stack
            spacing={1.5}
            direction="row"
            align="center"
            justifyContent="space-between"
          >
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="mdi:file" />}
              // onClick={handleOpenUploadFile}
            >
              Manual - Plan de Clase
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="mdi:file" />}
              // onClick={handleOpenUploadFile}
            >
              Manual - Plan de Clase Remedial
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <A2Resolution />
      </Grid>
    </Grid>
  );
}
