import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./container/signup";
import EmailVerification from "./container/email-verification";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={SignUp} />
              <Route path="/email-verification" component={EmailVerification} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
