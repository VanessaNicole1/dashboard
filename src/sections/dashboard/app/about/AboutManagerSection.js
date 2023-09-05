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
    url: "CIS1693802147820.jpg",
    name: "CIS.jpg",
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

      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={4}
          item
          xs={12}
          md={6}
          lg={6}
        >
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardHeader title="Estudiantes" />
              <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                <FileRecentItem file={resourceTest} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardHeader title="Docentes" />
              <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                <FileRecentItem file={resourceTest} />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardHeader title="Directores" />
              <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                <FileRecentItem file={resourceTest} />
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <A2Resolution />
        </Grid>
      </Grid>
    </Container>
  );
}
