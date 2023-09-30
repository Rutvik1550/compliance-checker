import { Helmet } from 'react-helmet-async';
// sections
import { ComplianceCreateView } from 'src/sections/compliance/view';

// ----------------------------------------------------------------------

export default function ComplianceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new compliance</title>
      </Helmet>

      <ComplianceCreateView />
    </>
  );
}
