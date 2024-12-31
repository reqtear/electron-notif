import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';

import icon from '../../assets/icon.svg';

function Hello() {
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

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
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
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
