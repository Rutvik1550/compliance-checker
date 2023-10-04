import { Helmet } from 'react-helmet-async';
// sections
import { ScanLogsListView } from 'src/sections/scanlogs/view';

// ----------------------------------------------------------------------

export default function CandidateListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Scan Logs</title>
      </Helmet>

      <ScanLogsListView />
    </>
  );
}
