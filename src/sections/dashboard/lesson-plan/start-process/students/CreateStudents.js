import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import CreateEntitiesForm from '../../common/CreateEntitiesForm';
import { validateStudents } from '../../../../../services/student';
import { useLocales } from '../../../../../locales';

CreateStudents.propTypes = {
  csv: PropTypes.any,
  students: PropTypes.array,
  onBackStep: PropTypes.func,
  onCreateStudents: PropTypes.func,
};

export default function CreateStudents({ csv, students, onBackStep, onCreateStudents }) {
  const { translate } = useLocales(); 

  const csvStudentsHeaders = {
    Nombre: 'name',
    Apellido: 'lastName',
    Correo: 'email',
    Ciclo: 'numberParallel',
    Paralelo: 'parallel',
  };
  
  const tableHeaders = ['name', 'lastname', 'email', 'grade', 'actions'];

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h4'>{ translate('lesson_plan.start_process.students.header_title') }</Typography>}
      />
      <CardContent>
        <CreateEntitiesForm
          csv={csv}
          entitiesData={students}
          onBackStep={onBackStep}
          onCreateEntities={onCreateStudents}
          validateEntities={validateStudents}
          csvHeaders={csvStudentsHeaders}
          entity='students'
          tableHeaders={tableHeaders}
        />
      </CardContent>
    </Card>
  );
}
