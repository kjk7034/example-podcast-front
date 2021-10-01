import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { CreateAccount } from "../pages/createAccount";
import { NotFound } from "../pages/404";

export const LoggedOutRoute = () => (
  <Router>
    <Switch>
      <Route path="/create-account">
        <CreateAccount />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
