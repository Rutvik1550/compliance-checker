import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ComplianceEditView } from 'src/sections/compliance/view';

// ----------------------------------------------------------------------

export default function ComplianceEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Compliance Edit</title>
      </Helmet>

      <ComplianceEditView id={`${id}`} />
    </>
  );
}
