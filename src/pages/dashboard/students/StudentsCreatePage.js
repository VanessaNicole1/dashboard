import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import StudentNewEditForm from '../../../sections/dashboard/student/create/StudentNewForm';
import { useLocales } from '../../../locales';

export default function StudentsCreatePage () {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('student_create_page.helmet')} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('student_create_page.heading')}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('student_create_page.link_student'),
              href: PATH_DASHBOARD.students.listStudents,
            },
            { name: translate('student_create_page.link_create_student') },
          ]}
        />
        <StudentNewEditForm />
      </Container>
    </>
  );
};
  