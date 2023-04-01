import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));

const sessionRoutes = [
  { path: '/auth/signup', element: <JwtRegister /> },
  { path: '/auth/signin', element: <JwtLogin /> },
  // { path: '/auth/forgot-password', element: <ForgotPassword /> },
  { path: '/auth/404', element: <NotFound /> },
];

export default sessionRoutes;
