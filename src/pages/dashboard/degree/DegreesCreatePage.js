import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { useSettingsContext } from "../../../components/settings";
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import DegreeNewEditForm from '../../../sections/dashboard/degree/create/DegreeNewForm';
import { useLocales } from '../../../locales';

export default function DegreesCreatePage () {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();

  return (
    <>
      <Helmet>
        <title> {translate('degree_create_page.helmet')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading= { translate('degree_create_page.helmet') }
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate('degree_create_page.link_degree'),
              href: PATH_DASHBOARD.degree.view,
            },
            { name: translate('degree_create_page.link_create_degree'), },
          ]}
        />
        <DegreeNewEditForm />
      </Container>
    </>
  );
};
  