import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { getUser } from '../../../services/user';
import { getRoles } from '../../../services/role';
import UserEditForm from '../../../sections/dashboard/user/update/UserEditForm';
import { useLocales } from '../../../locales';

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const { translate } = useLocales();

  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState({});

  const [simpleRoles, setSimpleRoles] = useState([]);

  const location = useLocation();

  const currentState = location.state;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(id);
      setCurrentUser(user);
    }

    const fetchRoles = async () => {
      const currentsRoles = await getRoles();
      setSimpleRoles(currentsRoles);
    }

    fetchUser();
    fetchRoles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>{translate('user_edit_page.title')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('user_edit_page.heading')}
          state={currentState}
          links={!location.state ? [
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            ...(location.state && location.state.links ? location.state.links : []),
            { name: translate('user_edit_page.update_name') },
          ] : [
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('user_edit_page.users_name'),
              href: PATH_DASHBOARD.user.list,
            },
            {
              name: translate('user_edit_page.update_name'),
            },
          ]}
        />
        <UserEditForm currentUserId={id} simpleRoles={simpleRoles} />
      </Container>
    </>
  );
}