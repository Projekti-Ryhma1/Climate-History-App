import './App.css';
import ClimateLineChart from './modules/ClimateLineChart';
import StackedLineChart from './modules/StackedLineChart';


function App() {
  return (
    <div className="App">
      <h2>Hello world</h2>
       <StackedLineChart/>
       <ClimateLineChart/>
          </div>
  );
}

export default App;
