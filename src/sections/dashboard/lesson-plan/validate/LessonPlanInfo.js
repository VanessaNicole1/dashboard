import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import useLocales from '../../../../locales/useLocales';

export default function LessonPlanInfo({ teacher, subject, grade, validationComment }) {
  const { user } = teacher;

  const { translate } = useLocales();

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
        title={translate('validate_lesson_plan_page.subject_title')}
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
        title={translate('validate_lesson_plan_page.grade_title')}
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

  const renderStudentComment = (
    <>
      <CardHeader
        title="Comentario de la aceptación:"
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        {validationComment}
      </Stack>
    </>
  )

  return (
    <Card>
      {renderTeacher}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderSubject}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderGrade}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {
        validationComment && renderStudentComment
      }

    </Card>
  );
}

LessonPlanInfo.propTypes = {
  teacher: PropTypes.object,
  subject: PropTypes.object,
  grade: PropTypes.object,
  validationComment: PropTypes.string
};
