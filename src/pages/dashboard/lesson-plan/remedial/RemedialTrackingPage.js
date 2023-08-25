import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Timeline } from "@mui/lab";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { CustomTimeLineItem } from "../../../../components/timeline/CustomTimeLineItem";
import { getLessonPlanById } from "../../../../services/lesson-plan";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { useSettingsContext } from "../../../../components/settings";

export const RemedialTrackingPage = () => {
  const [remedialLessonPlan, setRemedialLessonPlan] = useState({});
  const { id: remedialLessonPlanId } = useParams();
  const { themeStretch } = useSettingsContext();

  useEffect(() => {
    const fetchLessonPlan = async () => {
      const fetchedLessonPlan = await getLessonPlanById(remedialLessonPlanId);
      setRemedialLessonPlan(fetchedLessonPlan);
    };
    fetchLessonPlan();
  }, []);

  const isLastItem = (index) => index === remedialLessonPlan.length - 1;
  const isFirstItem = (index) => index === 0;
  return (
    <>
      <Helmet>
        <title> Lesson Plan Remedial - Director de Carrera </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Plan de Clase Remedial"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Planes de Clase Remedial", href: PATH_DASHBOARD.lessonPlan.listManagerRemedialPlans },
            { name: remedialLessonPlan.topic },
          ]}
        />

        <Timeline position="alternate">
          {remedialLessonPlan.trackingSteps?.map((item, index) => (
            <CustomTimeLineItem
              key={item.id}
              item={item}
              isFirst={isFirstItem(index)}
              isLast={isLastItem(index)}
            />
          ))}
        </Timeline>
      </Container>
    </>
  );
};
