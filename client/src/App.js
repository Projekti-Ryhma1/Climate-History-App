import './App.css';
import { Route, Routes} from 'react-router-dom';
import CreateUser from './components/createUser';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/createuser" element={<CreateUser />} />
      </Routes>  
    </div>
  );
}

export default App;
