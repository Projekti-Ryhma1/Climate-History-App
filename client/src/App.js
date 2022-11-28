import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Emissions from './pages/Emissions';
import TempCo2 from './pages/TempCo2';


function App() {
  return (
    <div className="App">
      <NavBar/>
       <Routes>
       <Route path='/' element={<TempCo2/>} />
        <Route path='/emissions' element={<Emissions/>} />
       </Routes>
       <Footer />
          </div>
  );
}

export default App;
