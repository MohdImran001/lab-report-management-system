import { Switch, useRouteMatch } from "react-router-dom";

import Reports from "@Pages/Reports";
import CreateReport from "@Pages/CreateReport";
import UpdatePassword from "@Pages/UpdatePassword";

import AppLayout from "@Components/Layouts/AppLayout";
import { PrivateRoute, QuickAccessButtons } from "@Components/";

function Dashboard() {
  const { path } = useRouteMatch();

  return (
    <AppLayout>
      <Switch>
        <PrivateRoute exact path={path} component={QuickAccessButtons} />
        <PrivateRoute exact path={`${path}/reports`} component={Reports} />
        <PrivateRoute
          exact
          path={`${path}/create-report`}
          component={CreateReport}
        />
        <PrivateRoute
          exact
          path={`${path}/change-password`}
          component={UpdatePassword}
        />
      </Switch>
    </AppLayout>
  );
}

export default Dashboard;
