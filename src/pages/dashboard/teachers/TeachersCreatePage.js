import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import TeacherNewEditForm from '../../../sections/dashboard/teacher/create/TeacherEditForm';
import { useLocales } from '../../../locales';


export default function TeachersCreatePage () {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('teacher_create_page.helmet')} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('teacher_create_page.heading')}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('teacher_create_page.link_teacher'),
              href: PATH_DASHBOARD.teachers.listTeachers,
            },
            { name: translate('teacher_create_page.link_create_teacher') },
          ]}
        />
        <TeacherNewEditForm />
      </Container>
    </>
  );
};
  