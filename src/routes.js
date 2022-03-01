/** @format */

import React from 'react';
import { Switch } from 'react-router-dom';
import { SecureRoute } from '@okta/okta-react';
import { Logs, RefData, Users } from './pages/admin';
import { ManagerHome, Customers, Receipts, Reports, AddCustomer, CustomerView, Edit } from './pages/manager';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './redux/hooks';

const Routes = () => {
  const { groups, loading } = useAuth();

  if (!loading && groups.includes('Manager') && groups.includes('Admin')) {
    return (
      <Switch>
        <SecureRoute path="/" exact={true} component={ManagerHome} />
        <SecureRoute
          exact
          path="/manager/customers/add-customer"
          component={AddCustomer}
        />
        <SecureRoute exact path="/manager/customers" component={Customers} />
        <SecureRoute exact path="/manager/customers/:id" component={CustomerView} />
        <SecureRoute exact path="/manager/customers/:id/edit" component={Edit} />
        <SecureRoute exact path="/manager/receipts" component={Receipts} />
        <SecureRoute path="/manager/reports" component={Reports} />
        <SecureRoute path="/admin/managers" component={Users} />
        <SecureRoute path="/admin/refdata" component={RefData} />
        <SecureRoute path="/admin/logs" component={Logs} />
        <SecureRoute component={NotFoundPage} />
      </Switch>
    );
  } else if (!loading && groups.includes('Manager')) {
    return (
      <Switch>
        <SecureRoute path="/" exact={true} component={ManagerHome} />
        <SecureRoute
          exact
          path="/manager/customers/add-customer"
          component={AddCustomer}
        />
        <SecureRoute exact path="/manager/customers" component={Customers} />
        <SecureRoute exact path="/manager/customers/:id" component={CustomerView} />
        <SecureRoute exact path="/manager/customers/:id/edit" component={Edit} />
        <SecureRoute exact path="/manager/receipts" component={Receipts} />
        <SecureRoute path="/manager/reports" component={Reports} />
        <SecureRoute component={NotFoundPage} />
      </Switch>
    );
  } else if (!loading && groups.includes('Admin')) {
    return (
      <Switch>
        <SecureRoute path="/" exact component={ManagerHome} />
        <SecureRoute path="/admin/managers" component={Users} />
        <SecureRoute path="/admin/refdata" component={RefData} />
        <SecureRoute path="/admin/logs" component={Logs} />
        <SecureRoute component={NotFoundPage} />
      </Switch>
    );
  } else {
    return <SecureRoute exact path="/" component={NotFoundPage} />;
  }
};

export default Routes;
