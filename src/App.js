import React from "react";
import "./App.css";
import Customerlist from './components/Customerlist';
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Traininglist from "./components/Traininglist";


function App() {
  return (
    <div>
      <BrowserRouter>
        <div>

          <Link to="/customerlist">Customerlist</Link>{''}
          <Link to="/traininglist">Traininglist</Link>{''}
          <Switch>

            <Route path="/customerlist" component={Customerlist} />
            <Route path="/traininglist" component={Traininglist} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}



export default App;