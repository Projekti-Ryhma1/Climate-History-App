import './App.css';
import ClimateLineChart from './modules/ClimateLineChart';
import{ Routes, Route } from "react-router-dom";
import Preferences from './pages/Preferences';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      {/* <h2>Hello world</h2>

      <ClimateLineChart/> */}
      
      <div>
        <Routes>
          <Route path="/" element={<Preferences/>} />
        </Routes>
      </div>

    </div>

    
  );
}

export default App;
