import { Helmet } from 'react-helmet-async';
// sections
import { CandidateListView } from 'src/sections/candidate/view';

// ----------------------------------------------------------------------

export default function CandidateListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Candidate List</title>
      </Helmet>

      <CandidateListView />
    </>
  );
}
