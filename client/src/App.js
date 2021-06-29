import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { useEffect } from "react";

const Routing = () => {
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Header />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <>
      {/* <Header /> */}
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </>
  );
}

export default App;
