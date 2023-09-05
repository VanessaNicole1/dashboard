import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "../../../../components/settings";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import FileRecentItem from "../../../file-manager/file-recent-item";
import A2Resolution from "../resolution/A2Resolution";

export default function AboutManagerSection() {
  const { themeStretch } = useSettingsContext();

  const resourceTest = {
    url: "CIS1693802147820.pdf",
    name: "CIS.pdf",
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

      <Stack direction='column' spacing={2}>
        <Stack spacing={1} justifyContent="space-between" sx={{ flexDirection: { xs: 'column' , md: 'row'}}}>
          <Card>
            <CardHeader title="Estudiantes" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <FileRecentItem file={resourceTest} />
            </Stack>
          </Card>

          <Card>
            <CardHeader title="Docentes" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <FileRecentItem file={resourceTest} />
            </Stack>
          </Card>

          <Card>
            <CardHeader title="Directores" />
            <Stack spacing={3} sx={{ p: 3 }}>
              <FileRecentItem file={resourceTest} />
            </Stack>
          </Card>
        </Stack>

        <A2Resolution />
      </Stack>
    </Container>
  );
}
