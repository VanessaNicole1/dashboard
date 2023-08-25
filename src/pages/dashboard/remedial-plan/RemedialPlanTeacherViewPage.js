import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { getLessonPlanWithPeriod } from "../../../services/lesson-plan";
import LessonPlanViewPage from "../../../sections/dashboard/lesson-plan/view/LessonPlanViewPage";
import RemedialPlanViewPage from "../../../sections/dashboard/remedial-plan/view/RemedialPlanViewPage";

// TODO: Add i18n.
export const RemedialplanTeacherViewPage = () => {
  const { remedialPlanId } = useParams();
  const [lessonPlan, setLessonPlan] = useState();
  const [lessonPlanTracking, setLessonPlanTracking] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const fecthLessonPlan = async () => {
      const fetchedLessonPlanInfo = await getLessonPlanWithPeriod(remedialPlanId);
      setLessonPlan(fetchedLessonPlanInfo);
      setIsLoading(false);
      setLessonPlanTracking(fetchedLessonPlanInfo?.validationsTracking);
    }
    fecthLessonPlan();
  }, []);

  return (
    <>
      {
        isLoading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <CircularProgress />
          </div>
        ):
        (
          <>
            <Helmet>
              <title> Dashboard: Plan de Clase Remedial</title>
            </Helmet>

            <RemedialPlanViewPage 
              lessonPlan={lessonPlan}
              lessonPlanTracking={lessonPlanTracking}
            />
          </>
        )
      }
    </>
  );
  

}
