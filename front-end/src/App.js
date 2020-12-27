import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Cafes from "./cafes/Cafes";
import Cafe from "./cafes/Cafe";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cafes/:cafeId">
          <Cafe/>
        </Route>
        <Route path="/cafes">
          <Cafes/>
        </Route>
        <Route exact path="/">
          <Redirect to="/cafes" />
        </Route>
        <Route path="/">
          <div>Path not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
