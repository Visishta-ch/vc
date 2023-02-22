import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Scenario from './components/Pages/Scenario/Scenario';
import AddScenario from './components/Pages/Scenario/AddScenario';
import AddVehicle from './components/Pages/Vehicle/AddVehicle';
import EditVehicle from './components/Pages/Vehicle/EditVehicle';
import EditScenario from './components/Pages/Scenario/EditScenario';
 import Nav from './components/NavigationBar/Nav';
function App() {
  return (
    <>
    <Nav>
    <Switch>
      <Route path="/" exact >
          <Home />
      </Route>
      <Route path="/scenario">
        <Scenario/>
      </Route>
      <Route path="/add-scenario">
        <AddScenario/>
      </Route>
      <Route path="/add-vehicle">
        <AddVehicle/>
      </Route>
      <Route path='/editVehicle/:id'>
      <EditVehicle />
      </Route>
      <Route path='/editscenario/:id'>
      <EditScenario />
      </Route>
    </Switch>
</Nav>
    </>
  );
}

export default App;
