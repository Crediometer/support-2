import Loadable from '../../components/Loadable';
import { lazy } from 'react';

import { CredioProvider } from '../../contexts/CredioContext';
const AnalyticCredio = Loadable(lazy(() => import('../credio')));

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu'))); //'../Savings'
const CredioTableAnalytics = Loadable(lazy(() => import('./tables/credioTable'))); //''
const CredioUserAnalytics = Loadable(lazy(() => import('../../views/credio/user'))); //''
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));
const AllUserTable = Loadable(lazy(() => import('./tables/allUserTable')));
const Note = Loadable(lazy(() => import('../credio/user/Note')));
const materialRoutes = [
  {
    path: '/new/users',
    element: <AppTable />,
  },
  {
    path: '/all/users',
    element: <AllUserTable />,
  },
  {
    path: '/material/form',
    element: <AppForm />,
  },
  // {
  //   path: '/analytics/merchant/reader/exchange',
  //   element: <ExchangeReader />,
  // },
  {
    path: '/analytics/credio',
    element: (
      <CredioProvider>
        <AnalyticCredio />
      </CredioProvider>
    ),
  },
  {
    path: '/analytics/credio/table/:type/:phoneNumber',

    element: (
      <CredioProvider>
        <CredioTableAnalytics />
      </CredioProvider>
    ),
  },
  {
    path: '/analytics/credio/user/:phoneNumber',

    element: (
      <CredioProvider>
        <CredioUserAnalytics />
      </CredioProvider>
    ),
  },
  {
    path: '/analytics/credio/table/:type',

    element: (
      <CredioProvider>
        <CredioTableAnalytics/>
      </CredioProvider>
    ),
  },
  {
    path: '/analytics/credio/table/note/:phoneNumber',

    element: (
      <CredioProvider>
        <Note/>
      </CredioProvider>
    ),
  },
  {
    path: '/material/buttons',
    element: <AppButton />,
  },
  {
    path: '/material/icons',
    element: <AppIcon />,
  },
  {
    path: '/material/progress',
    element: <AppProgress />,
  },
  {
    path: '/material/menu',
    element: <AppMenu />,
  },
  {
    path: '/material/checkbox',
    element: <AppCheckbox />,
  },
  {
    path: '/material/switch',
    element: <AppSwitch />,
  },
  {
    path: '/material/radio',
    element: <AppRadio />,
  },
  {
    path: '/material/slider',
    element: <AppSlider />,
  },
  {
    path: '/material/autocomplete',
    element: <AppAutoComplete />,
  },
  {
    path: '/material/expansion-panel',
    element: <AppExpansionPanel />,
  },
  {
    path: '/material/dialog',
    element: <AppDialog />,
  },
  {
    path: '/material/snackbar',
    element: <AppSnackbar />,
  },
];

export default materialRoutes;
