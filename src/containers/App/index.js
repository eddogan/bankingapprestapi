import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Custom imports
import Loading from "../../components/Loading";
import PrivateRoute from "../../components/PrivateRoute";
import Layout from "../../containers/Layout";
import { createResponseInterceptor } from "../../services/Authentication";
import ChangeTempPasswordForm from "../../components/ChangeTempPasswordForm";
const Login = lazy(() => import("../../components/Login"));
const Overview = lazy(() => import("../Overview"));
const ScheduledFutureTransactions = lazy(() =>
  import("../ScheduledFutureTransactions")
);
const CompletedTransactions = lazy(() => import("../CompletedTransactions"));
const SecurityQuestions = lazy(() =>
  import("../../components/SecurityQuestions")
);
const Faq = lazy(() => import("../Faq"));
const AccountSettings = lazy(() => import("../AccountSettings"));
const CustomerSupport = lazy(() => import("../CustomerSupport"));

export default function App() {
  createResponseInterceptor();
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <Layout>
        <Router>
          <Fragment>
            <Route exact path="/" component={Login} />
            <PrivateRoute
              exact
              path="/overview"
              component={() => (
                <SecurityQuestions securedComponent={<Overview />} />
              )}
              temporary={() => <ChangeTempPasswordForm />}
            />
            <PrivateRoute
              exact
              path="/scheduled-future-transactions"
              component={() => (
                <SecurityQuestions
                  securedComponent={<ScheduledFutureTransactions />}
                />
              )}
              temporary={() => <ChangeTempPasswordForm />}
            />
            <PrivateRoute
              exact
              path="/completed-transactions"
              component={() => (
                <SecurityQuestions
                  securedComponent={<CompletedTransactions />}
                />
              )}
              temporary={() => <ChangeTempPasswordForm />}
            />
            <PrivateRoute
              exact
              path="/faq"
              component={() => <SecurityQuestions securedComponent={<Faq />} />}
            />
            <PrivateRoute
              exact
              path="/account-settings"
              component={() => (
                <SecurityQuestions securedComponent={<AccountSettings />} />
              )}
              temporary={() => <ChangeTempPasswordForm />}
            />
            <PrivateRoute
              exact
              path="/customer-support"
              component={() => (
                <SecurityQuestions securedComponent={<CustomerSupport />} />
              )}
              temporary={() => <ChangeTempPasswordForm />}
            />
          </Fragment>
        </Router>
      </Layout>
    </Suspense>
  );
}
