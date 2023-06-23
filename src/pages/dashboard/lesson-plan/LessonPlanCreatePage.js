import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import LessonPlanNewForm from "../../../sections/dashboard/lesson-plan/create/LessonPlanNewForm";

export default function LessonPlanCreatePage () {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Lesson Plan: New Lesson Plan | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Lesson Plan"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Blog',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: 'Create',
            },
          ]}
        />

        <LessonPlanNewForm />
      </Container>
    </>
  );
};
