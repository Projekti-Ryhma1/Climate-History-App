import './App.css';
import AtmosphericCO2LineChart from './modules/AtmosphericCO2LineChart';
import ClimateLineChart from './modules/ClimateLineChart';
import EmissionPieChart from './modules/EmissionPieChart';
import StackedLineChart from './modules/StackedLineChart';


function App() {
  return (
    <div className="App">
      <h2>Hello world</h2>
      <AtmosphericCO2LineChart/>
       <EmissionPieChart/>
       <ClimateLineChart/>
       <StackedLineChart/>
          </div>
  );
}

export default App;
