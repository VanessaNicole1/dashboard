import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import CreateEntitiesForm from '../../common/CreateEntitiesForm';
import { validateTeachers } from '../../../../../services/teacher';
import { useLocales } from '../../../../../locales';

CreateTeachers.propTypes = {
  csv: PropTypes.any,
  teachers: PropTypes.array,
  onBackStep: PropTypes.func,
  onCreateTeachers: PropTypes.func,
};

export default function CreateTeachers({ csv, teachers, onBackStep, onCreateTeachers }) {
  const { translate } = useLocales(); 

  const csvTeachersHeaders = {
    Nombre: 'name',
    Apellido: 'lastName',
    Correo: 'email',
    Materia: 'subject',
    Ciclo: 'numberParallel',
    Paralelo: 'parallel',
  };

  const tableHeaders = ['name', 'lastname', 'email', 'subject', 'grade', 'actions'];

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>{ translate('lesson_plan.start_process.teachers.header_title') }</Typography>}
      />
      <CardContent>
        <CreateEntitiesForm
          csv={csv}
          entitiesData={teachers}
          onBackStep={onBackStep}
          onCreateEntities={onCreateTeachers}
          validateEntities={validateTeachers}
          csvHeaders={csvTeachersHeaders}
          entity='teachers'
          tableHeaders={tableHeaders}
        />
      </CardContent>
    </Card>
  );
}
