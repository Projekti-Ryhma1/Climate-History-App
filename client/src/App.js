import './App.css';
import { useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signUp';
import Home from './components/home';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

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
  </>

  if(jwt_token!= null) {
    // Active routes when user is logged in
    authRoutes = <> </>
    
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home userLoggedIn={jwt_token!= null}/>} />
        { authRoutes }
        <Route path="*" element={<Home userLoggedIn={jwt_token!= null}/>} />
      </Routes>
    </div>
  );
}

export default App;