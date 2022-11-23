import './App.css';
import ClimateLineChart from './modules/ClimateLineChart';
import EmissionPieChart from './modules/EmissionPieChart';
import StackedLineChart from './modules/StackedLineChart';


function App() {
  return (
    <div className="App">
      <h2>Hello world</h2>
       <EmissionPieChart/>
       <ClimateLineChart/>
       <StackedLineChart/>
          </div>
  );
}

export default App;
