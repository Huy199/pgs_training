import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import RegisterPage from './modules/auth/pages/RegisterPage';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import PublicRoute from './modules/common/components/PublicRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const PayrollPage = lazy(() => import('./modules/payroll/pages/PayrollPage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <ProtectedRoute path={ROUTES.payroll} component={PayrollPage} />
        <ProtectedRoute path={ROUTES.contact} component={ContactPage} />
        <PublicRoute path={ROUTES.login} component={LoginPage} />
        <PublicRoute path={ROUTES.register} component={RegisterPage} />
        <PublicRoute path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
