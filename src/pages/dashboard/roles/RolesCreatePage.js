import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import RoleNewForm from '../../../sections/dashboard/role/create/RoleNewForm';
import { useLocales } from '../../../locales';

export default function RolesCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('role_create_page.helmet')} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={ translate('role_create_page.heading') }
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('role_create_page.link_degree'),
              href: PATH_DASHBOARD.roles.listRoles,
            },
            { name: translate('role_create_page.link_create_degree') },
          ]}
        />
        <RoleNewForm />
      </Container>
    </>
  );
}

