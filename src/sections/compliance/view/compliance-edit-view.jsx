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
import ComplianceNewEditForm from '../compliance-new-edit-form';

// ----------------------------------------------------------------------

export default function ComplianceEditView({ id }) {
  const settings = useSettingsContext();

  const currentCompliance = _invoices.find((compliance) => compliance.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
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
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ComplianceNewEditForm currentCompliance={currentCompliance} />
    </Container>
  );
}

ComplianceEditView.propTypes = {
  id: PropTypes.string,
};
