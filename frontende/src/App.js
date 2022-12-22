import './App.css';
import Main from './pages/main/Main';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Logout from './pages/logout/Logout';

function App() {

  const getUser = () => {
    return localStorage.getItem("user")
  }

  return (
    <BrowserRouter>
      <div>
        <nav className="nav">
          <ul className="nav__ul">
            {getUser() ? (
              <li className="nav__li">
                <Link to="/">Main</Link>
              </li>
            ) : (
              <>
                <li className="nav__li">
                  <Link to="/login">Login</Link>
                </li>
                <li className="nav__li">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          {/* Chapuza??? hacer el login en  /???*/}
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
