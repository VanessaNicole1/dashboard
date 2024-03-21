import { Card, CardHeader, Container, Stack } from "@mui/material";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "../../../../components/settings";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import A2Resolution from "../resolution/A2Resolution";
import ManualFileItem from "../../../file-manager/manual-file-item";

export default function AboutManagerSection() {
  const { themeStretch } = useSettingsContext();

  const studentManual = {
    url: "./assets/manuals/MANUAL-DIRECTOR.pdf",
    name: "Manual de Plan de Clase.pdf",
    size: 24326,
    createdDate: "2023-09-04T04:35:47.845Z",
  };

  const teacherManual = {
    url: "teacher-manual.pdf",
    name: "Manual de Plan de Clase.pdf",
    size: 24326,
    createdDate: "2023-09-04T04:35:47.845Z",
  };

  const managerManual = {
    url: "manager-manual.pdf",
    name: "Manual de Plan de Clase.pdf",
    size: 24326,
    createdDate: "2023-09-04T04:35:47.845Z",
  };

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Información"
        links={[
          { name: "Dashboard", href: PATH_DASHBOARD.root },
          { name: "Información" },
        ]}
      />

      <Stack direction="column" spacing={2}>
        <Stack
          spacing={1}
          justifyContent="space-between"
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          <Card>
            <CardHeader title="Estudiantes" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <ManualFileItem file={studentManual} />
            </Stack>
          </Card>

          <Card>
            <CardHeader title="Docentes" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <ManualFileItem file={teacherManual} />
            </Stack>
          </Card>

          <Card>
            <CardHeader title="Directores" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <ManualFileItem file={managerManual} />
            </Stack>
          </Card>
        </Stack>

        <A2Resolution />
      </Stack>
    </Container>
  );
}
