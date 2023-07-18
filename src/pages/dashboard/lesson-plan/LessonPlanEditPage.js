import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import LessonPlanUpdateForm from "../../../sections/dashboard/lesson-plan/update/LessonPlanUpdateForm";
import { useLocales } from "../../../locales";

export default function LessonPlanEditPage () {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('lesson_plan_update_page.title')} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('lesson_plan_update_page.heading')}
          links={[
            {
              name: translate('lesson_plan_update_page.links.dashboard'),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('lesson_plan_update_page.links.plans'),
              href: PATH_DASHBOARD.lessonPlan.root,
            },
            {
              name: translate('lesson_plan_update_page.links.update'),
            },
          ]}
        />

        <LessonPlanUpdateForm lessonPlanId={id}/>
      </Container>
    </>
  );
};
