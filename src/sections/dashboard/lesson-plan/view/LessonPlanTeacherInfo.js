import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import StudentsWhoValidated from '../update/StudentsWhoValidated';
import FileRecentItem from '../../../file-manager/file-recent-item';
import UploadReport from '../remedial/view/UploadReport';

// TODO: Add i18n
export default function LessonPlanTeacherInfo({ teacher, subject, grade, studentsValidated, remedialReports }) {
  const { user } = teacher;

  if (!remedialReports) {
    remedialReports = [];
  }

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
    <Stack spacing={2}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Recursos de la clase:
      </Typography>
      {remedialReports.map((resource, index) => (
        <FileRecentItem
          key={index}
          file={resource}
          onDelete={() => console.info('DELETE', resource)}
        />
      ))}
    </Stack>
  );

  return (
    <Card>
      {renderTeacher}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderSubject}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderGrade}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <StudentsWhoValidated title="Estudiantes" list={studentsValidated} />

      <Divider sx={{ borderStyle: 'dashed' }} />

      {
        remedialReports.length > 0 &&  renderResources
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
