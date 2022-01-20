import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import { AuthProvider } from "@Contexts/AuthContext";
import { PrivateRoute } from "@Components";

import Login from "@Pages/Login";
import Signup from "@Pages/Signup";
import Dashboard from "@Pages/Dashboard";
import ResetPassword from "@Pages/ResetPassword";
import DownloadReportFromUrl from "@Pages/DownloadReportFromUrl";
import PageNotFound404 from "@Pages/PageNotFound404";

import { cacheDataOnLoad } from "@Helpers/cache.helper";

function App() {
  const [loading, setLoading] = useState(true);

  const cacheData = async () => {
    setLoading(true);
    const id = toast.loading("loading resources ...");
    try {
      await cacheDataOnLoad();
      toast.success("You are ready to go", { id });
    } catch (e) {
      toast.error("please reload the page", { id });
    }
    setLoading(false);
  };

  useEffect(() => {
    cacheData();
  }, []);

  return (
    <div className="App">
      <Toaster />
      {loading && (
        <Container className="pt-4 text-center">
          <img src="/assets/images/loader.gif" alt="loader" />
        </Container>
      )}
      {!loading && (
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/signup" component={Signup} />
              <Route
                path="/download/:serialNo/:token"
                component={DownloadReportFromUrl}
              />
              <Route component={PageNotFound404} />
            </Switch>
          </AuthProvider>
        </Router>
      )}
    </div>
  );
}

export default App;
