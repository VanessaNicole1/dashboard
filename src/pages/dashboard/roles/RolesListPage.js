import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  Grid,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';

import { useLocales } from '../../../locales';
import { getRoles } from '../../../services/role';
import Iconify from '../../../components/iconify/Iconify';
import RoleNewForm from '../../../sections/dashboard/role/create/RoleNewForm';
import AnalyticsWidgetSummary from '../../../sections/dashboard/general/app/AnalyticsWidgetSummary';

export default function RolesListPage () {
  const { translate } = useLocales();

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRoles();
      setTableData(roles);
    };

    const fetchRolesType = async () => {
      const roles = await getRoles();
      const simplesRoles = roles.map(role => role.name);
      simplesRoles.unshift('all');
    };

    fetchRoles();
    fetchRolesType();
  }, []);


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Helmet>
        <title>{translate('roles_list_page.helmet')}</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={translate('roles_list_page.heading')}
            links={[
              { name: translate('roles_list_page.dashboard'), href: PATH_DASHBOARD.root },
              { name: translate('roles_list_page.roles'), href: PATH_DASHBOARD.lessonPlan.root },
              { name: translate('roles_list_page.list') },
            ]}
            action={
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleOpenModal}
              >
                {translate('roles_list_page.new')}
              </Button>
            }
          />
          <Grid sx={{ flexGrow: 1 }} alignItems="center" container spacing={10}>
            {
              tableData.map((role) => (
                <Grid key={role.id} item xs={6} style={{maxWidth: 400}}>
                  <AnalyticsWidgetSummary
                    key={role.id}
                    title={role.name}
                    total={role.users.length}
                    color={ (role.name === 'MANAGER' && 'error') ||
                      (role.name === 'STUDENT' && 'warning') ||
                      (role.name === 'TEACHER' && 'info') ||
                      ('info')
                    }
                    icon={ (role.name === 'MANAGER' && 'mdi:user') ||
                     (role.name === 'STUDENT' && 'mdi:account-student') ||
                     (role.name === 'TEACHER' && 'mdi:teacher')
                    } 
                  />
                </Grid>
              ))
            }
          </Grid>
          <Dialog
            fullWidth
            maxWidth="xs"
            open={openModal}
            onClose={handleCloseModal}
          >
            <DialogTitle>Create Role</DialogTitle>
            <RoleNewForm  onClose={handleCloseModal}/>
        </Dialog>
      </Container>
    </>
  );
};
  