import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { PrivateRoute } from "@Components/global";
import { AuthProvider } from "@Contexts/AuthContext";

import Login from "@Pages/Login";
import Signup from "@Pages/Signup";
import Dashboard from "@Pages/Dashboard";
import ResetPassword from "@Pages/ResetPassword";
import PageNotFound404 from "@Pages/PageNotFound404";
import DownloadReportFromUrl from "@Pages/DownloadReportFromUrl";

import { cacheDataOnLoad } from "@Utils/cache";

function App() {
  const [loading, setLoading] = useState(true);

  const cacheData = async () => {
    setLoading(true);
    const id = toast.loading("loading resources ...");
    try {
      await cacheDataOnLoad();
      toast.success("You are ready to go", { id });
    } catch (e) {
      console.error(e);
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
        <BrowserRouter>
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
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
