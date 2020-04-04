import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";

import Home from "./components/home";
import Favourites from "./components/favourites";

import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/favourite" component={Favourites} />
        </Switch>
      </>
    );
  }
}

export default App;
