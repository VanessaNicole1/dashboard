import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import RemedialPlanNewForm from "../../../sections/dashboard/remedial-plan/create/RemedialPlanNewForm";

export default function RemedialPlanCreatePage () {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Plan de Clase Remedial - Remedial </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Plan de Clase Remedial"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Lista de Planes Remediales',
              href: PATH_DASHBOARD.lessonPlan.listTeacherPlans,
            },
            {
              name: 'Crear',
            },
          ]}
        />

        <RemedialPlanNewForm />
      </Container>
    </>
  );
};
