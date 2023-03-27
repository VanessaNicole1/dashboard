import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { getUser } from '../../../services/user';
import UserEditForm from '../../../sections/dashboard/user/update/UserEditForm';

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
        const user = await getUser(id);
        setCurrentUser(user);
      }
      fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet>
        <title> User: Edit user</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit user"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            { name: currentUser?.name },
          ]}
        />

        <UserEditForm currentUser={currentUser} />
      </Container>
    </>
  );
}
