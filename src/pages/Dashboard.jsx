import { Switch, useRouteMatch } from "react-router-dom";

import Reports from "@Pages/Reports";
import CreateReport from "@Pages/CreateReport";
import UpdatePassword from "@Pages/UpdatePassword";

import AppLayout from "@Layouts/AppLayout";
import { PrivateRoute, QuickAccessButtons } from "@Components/global";

function Dashboard() {
  const { path } = useRouteMatch();

  return (
    <AppLayout>
      <Switch>
        <PrivateRoute path={`${path}/reports`} component={Reports} />
        <PrivateRoute path={`${path}/create-report`} component={CreateReport} />
        <PrivateRoute
          path={`${path}/change-password`}
          component={UpdatePassword}
        />
        <PrivateRoute path={path} component={QuickAccessButtons} />
      </Switch>
    </AppLayout>
  );
}

export default Dashboard;
