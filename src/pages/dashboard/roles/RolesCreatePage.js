import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import RoleNewForm from '../../../sections/dashboard/role/create/RoleNewForm';

export default function RolesCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> User: Create a new role</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new role"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Role',
              href: PATH_DASHBOARD.roles.listRoles,
            },
            { name: 'New role' },
          ]}
        />
        <RoleNewForm />
      </Container>
    </>
  );
}

