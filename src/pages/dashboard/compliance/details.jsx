import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ComplianceDetailsView } from 'src/sections/compliance/view';

// ----------------------------------------------------------------------

export default function ComplianceDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Compliance Details</title>
      </Helmet>

      <ComplianceDetailsView id={`${id}`} />
    </>
  );
}
