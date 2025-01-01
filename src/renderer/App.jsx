import { MemoryRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import icon from '../../assets/icon.svg';
// import backGround from '../../assets/bg-login.jpg';
import Login from './login/Login';
import Sidebar from './layout/Sidebar'
import Admin from './admin/Admin';


function Hello() {
  const navigate = useNavigate();
  window.Pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '275cda7bf41eba251385',
    cluster: 'ap1',
    forceTLS: true,
  });

  const channel = window.Echo.channel('my-channel');
  channel.listen('.user-change', function myEventHandler(data) {
    alert(JSON.stringify(data));
  });

  useEffect(() => {
    navigate('/login');
  }, [])

  return (
    <div>
      <div>
        <h1 className="bg-gray-500 text-center text-white">
          Please Wait...
        </h1>
      </div>
      {/* <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div> */}
      {/* <h1>electron-react-boilerplate</h1> */}
      {/* <div className="Hello"> */}
        {/* <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div> */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route element={
              <>
                  <Sidebar outlet={<Outlet />} />
              </>
          }>
            <Route path="/admin" element={<Admin />} />
          </Route>
        {/* <Route path="/main" element={<Main />} /> */}
      </Routes>
    </Router>
  );
}
