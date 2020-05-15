import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Profile = React.lazy(() => import('./views/Profile'));
const CrudAdmin = React.lazy(() => import('./views/CrudAdmin'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/CrudAdmin', name: 'Gestion Admin', component: CrudAdmin },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

];

export default routes;
