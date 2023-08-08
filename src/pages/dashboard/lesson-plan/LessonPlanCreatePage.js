import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import LessonPlanNewForm from "../../../sections/dashboard/lesson-plan/create/LessonPlanNewForm";
import { useLocales } from "../../../locales";

export default function LessonPlanCreatePage () {
  const { themeStretch } = useSettingsContext();

  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('lesson_plan_create_page.title')} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('lesson_plan_create_page.heading')}
          links={[
            {
              name: translate('lesson_plan_create_page.links.dashboard'),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('lesson_plan_create_page.links.plans'),
              href: PATH_DASHBOARD.lessonPlan.listTeacherPlans,
            },
            {
              name: translate('lesson_plan_create_page.links.create'),
            },
          ]}
        />

        <LessonPlanNewForm />
      </Container>
    </>
  );
};
