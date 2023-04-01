import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
import Loadable from '../../components/Loadable';

import { CredioProvider } from '../../contexts/CredioContext';
const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  {
    path: '/analytics/credio',
    element: (
      <CredioProvider>
        <Analytics />
      </CredioProvider>
    ),
    auth: authRoles.sa,
  },
];

export default dashboardRoutes;
//
