import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import StudentsWhoValidated from '../update/StudentsWhoValidated';
import RemedialPlanFileTeacherItem from '../../remedial-plan/section/file-recent-item-remedial-plan-teacher';

// TODO: Add i18n
export default function LessonPlanTeacherInfo({ teacher, subject, grade, studentsValidated, remedialReports }) {
  const { user } = teacher;

  if (!remedialReports) {
    remedialReports = [];
  }

  const studentsWhoAccepted = studentsValidated.filter((studentValidated) => studentValidated.isValidated);
  const studentsWhoHaveNotAccepted = studentsValidated.filter((studentValidated) => !studentValidated.isValidated);

  const renderTeacher = (
    <>
      <CardHeader
        title="Información del docente"
      />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar
          alt={user.displayName}
          src={teacher.avatarUrl}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{user.displayName}</Typography>

          <Box sx={{ color: 'text.secondary' }}>{user.email}</Box>

        </Stack>
      </Stack>
    </>
  );

  const renderSubject = (
    <>
      <CardHeader
        title="Subject"
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Nombre:
          </Box>
          {subject.name}
        </Stack>
      </Stack>
    </>
  );

  const renderGrade = (
    <>
      <CardHeader
        title="Grade"
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Ciclo:
          </Box>
          {grade.number}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Paralelo:
          </Box>
          {grade.parallel}
        </Stack>
      </Stack>
    </>
  );

  const renderResources = (
    <>
      <CardHeader title="Reportes Firmados"/>
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
      {remedialReports && <>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Docente:
          </Box>
        </Stack>
        {
          remedialReports.length > 0 &&
          <RemedialPlanFileTeacherItem
          key={remedialReports[0] ? remedialReports[0].role : 0}
          file={remedialReports[0]}
        />
        }
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Director:
          </Box>
        </Stack>
        {
          remedialReports.length > 1 &&
          <RemedialPlanFileTeacherItem
          key={remedialReports[1] ? remedialReports[1].role : 1}
          file={remedialReports[1]}
        />
        }
       </>
      }
    </Stack>
    </>
  );

  return (
    <Card>
      {
        remedialReports.length > 0 &&  <>
         {
          renderResources
         }
         <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      }
      {renderTeacher}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderSubject}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderGrade}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {
        studentsWhoAccepted.length > 0 &&
        <StudentsWhoValidated title="Estudiantes que han aceptado" list={studentsWhoAccepted} />
      }
      {
        studentsWhoHaveNotAccepted.length > 0 &&
        <StudentsWhoValidated title="Estudiantes pendientes de aceptar" list={studentsWhoHaveNotAccepted} />
      }

    </Card>
  );
}

LessonPlanTeacherInfo.propTypes = {
  teacher: PropTypes.object,
  subject: PropTypes.object,
  grade: PropTypes.object,
  studentsValidated: PropTypes.array,
  remedialReports: PropTypes.array,
};
