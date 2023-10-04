import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const CandidateListPage = lazy(() => import('src/pages/dashboard/candidate/list'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      // { path: 'candidate', element: <PageTwo /> },
      {
        path: 'candidate',
        children: [
          { element: <CandidateListPage />, index: true },
          { path: 'list', element: <CandidateListPage /> },
        ],
      },
    ],
  },
];
