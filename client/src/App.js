import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AtmosphericCO2LineChart from './modules/AtmosphericCO2LineChart';
import ClimateLineChart from './modules/ClimateLineChart';
import EmissionPieChart from './modules/EmissionPieChart';
import StackedLineChart from './modules/StackedLineChart';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <h2>Hello world</h2>
      <AtmosphericCO2LineChart/>
       <EmissionPieChart/>
       <ClimateLineChart/>
       <StackedLineChart/>
       <Routes>
        {/* <Route/>s here! */}
       </Routes>
          </div>
  );
}

export default App;
