import { useAuthContext } from "../../../auth/useAuthContext";
import AboutManagerSection from "../../../sections/dashboard/app/about/AboutManagerSection";
import AboutTeacherSection from "../../../sections/dashboard/app/about/AboutTeacherSection";
import AboutStudentSection from "../../../sections/dashboard/app/about/AboutStudentSection";

export default function LessonPlanAboutPage() {
  const { user } = useAuthContext();
  let currentRoles = user.roles.map((role) => role.name);

  if (currentRoles.includes("MANAGER")) {
    currentRoles = [];
    currentRoles.push('MANAGER');
  }

  return (
    <>
      {
        currentRoles.length === 1 && currentRoles.includes("MANAGER") && <AboutManagerSection />
      }

      {
        currentRoles.length === 1 && currentRoles.includes("TEACHER") && <AboutTeacherSection />
      }

      {
        currentRoles.includes("STUDENT") && <AboutStudentSection />
      }
    </>
  );
}
