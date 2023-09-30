import { Helmet } from 'react-helmet-async';
// sections
import { ComplianceListView } from 'src/sections/compliance/view';

// ----------------------------------------------------------------------

export default function ComplianceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Compliance List</title>
      </Helmet>

      <ComplianceListView />
    </>
  );
}
