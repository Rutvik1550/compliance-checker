import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _invoices } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ComplianceDetails from '../compliance-details';

// ----------------------------------------------------------------------

export default function ComplianceDetailsView({ id }) {
  const settings = useSettingsContext();

  const currentCompliance = _invoices.filter((compliance) => compliance.id === id)[0];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={currentCompliance?.complianceNumber}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Compliance',
            href: paths.dashboard.compliance.root,
          },
          { name: currentCompliance?.complianceNumber },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ComplianceDetails compliance={currentCompliance} />
    </Container>
  );
}

ComplianceDetailsView.propTypes = {
  id: PropTypes.string,
};
