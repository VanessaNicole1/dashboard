import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import LessonPlanUpdateForm from "../../../sections/dashboard/lesson-plan/update/LessonPlanUpdateForm";

export default function LessonPlanEditPage () {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title> Lesson Plan: Update Lesson Plan</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Update a new Lesson Plan"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Lesson Plan',
              href: PATH_DASHBOARD.lessonPlan.root,
            },
            {
              name: 'Edit',
            },
          ]}
        />

        <LessonPlanUpdateForm lessonPlanId={id}/>
      </Container>
    </>
  );
};
