import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/login';
import Logout from './pages/logout';
import SignUp from './pages/signUp';
import Emissions from './pages/Emissions';
import TempCo2 from './pages/TempCo2';
import Preferences from './pages/Preferences';
import CustomView from './pages/CustomView';
import 'bootstrap/dist/css/bootstrap.min.css';

//Limit when mobile view is used (NavBar, StackedLineChart etc.)
//Smaller value = mobile view
const mobileWindowLimit = 830;

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [jwt_token, setUserToken] = useState(cookies.token);
  
  // Base value for active routes when user is logged out
  let authRoutes = <>
        <Route path="/login" element={<Login login={(newToken) => {
          setUserToken(newToken);
          let decodedToken = jwtDecode(newToken);
          console.log("Decoded Token", decodedToken);
          setCookie('token', newToken,
          { path: '/', httpOnly: decodedToken.httpOnly, secure: decodedToken.secure, maxAge: decodedToken.cookieMaxAge });
        }}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/custom/:username" element={<CustomView/>} />
  </>

  if(jwt_token!= null) {
    // Active routes when user is logged in
    authRoutes = <>
        <Route path="/logout" element={<Logout logout={(isLoggingOut) => {
        if(isLoggingOut) {
          removeCookie('token',{path:'/'});
          sessionStorage.removeItem("preferences");
          window.location = "/";
        }
        }}/>} />
        <Route path="/custom/:username" element={<CustomView/>} />
    </>
  }

  return (
    <div className="App">
      <NavBar maxWindowWidth= {mobileWindowLimit}/>
      <Routes>
        { authRoutes }
        <Route path='/' element={<TempCo2 maxWindowWidth={mobileWindowLimit}/>} />
        <Route path='/emissions' element={<Emissions maxWindowWidth={mobileWindowLimit}/>} />
        <Route path="/preferences" element={<Preferences/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;