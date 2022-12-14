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
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

const mobileWindowLimit = 830; // maxWindowWidth: Horizontal window width limit for more mobile friendly solution

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']); // React's own cookie "state"
  const [jwt_token, setUserToken] = useState(cookies.token); // State for holding the token value

  // Base value for active routes when user is logged out
  // Encrypts the token taken from the login and transfroms it to browser's cookie
  let authRoutes = <>
    <Route className="user_route" path="/login" element={<Login login={(newToken) => {
      setUserToken(newToken);
      let decodedToken = jwtDecode(newToken);
      console.log("Decoded Token", decodedToken);
      setCookie('token', newToken,
        { path: '/', httpOnly: decodedToken.httpOnly, secure: decodedToken.secure, maxAge: decodedToken.cookieMaxAge });
    }} />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/custom/:username" element={<CustomView className='customview' maxWindowWidth={mobileWindowLimit}/>} />
  </>

  // When token exists
  if (jwt_token != null) {
    // Active routes when user is logged in
    // When user is logging out -> removes cookie token and preferences from the local storage
    authRoutes = <>
      <Route path="/logout" element={<Logout logout={(isLoggingOut) => {
        if (isLoggingOut) {
          removeCookie('token', { path: '/' });
          sessionStorage.removeItem("preferences");
          window.location = "/";
        }
      }} />} />
      <Route path="/custom/:username" element={<CustomView className='customview' maxWindowWidth={mobileWindowLimit}/>} />
    </>
  }

    // maxWindowWidth: sets the props for the Navbar, TempCo2 and Emissions.
    // {authRoutes}: determines which Navbar buttons are visible based on current state.
    return (
      <div className="App">
        <Container className="App-container" fluid>
          <Row className="vh100">
        <NavBar maxWindowWidth={mobileWindowLimit} />
        <Routes>
          {authRoutes}
          <Route path='/' element={<TempCo2 maxWindowWidth={mobileWindowLimit} />} />
          <Route path='/emissions' element={<Emissions maxWindowWidth={mobileWindowLimit} />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
        </Row>
        </Container>
        <Footer />
      </div>
    );
  }

export default App;