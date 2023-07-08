import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import LessonPlanUpdateForm from "../../../sections/dashboard/lesson-plan/update/LessonPlanNewForm";

export default function LessonPlanUpdatePage () {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Lesson Plan: Update Lesson Plan</title>
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

        <LessonPlanUpdateForm />
      </Container>
    </>
  );
};
