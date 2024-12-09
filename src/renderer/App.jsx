/* eslint-disable jsx-a11y/media-has-caption */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef, useEffect } from 'react';
// import icon from '../../assets/icon.svg';
import './App.css';
// import { getNotificationState } from 'macos-notification-state';
// import { collection, getDocs } from 'firebase/firestore';
// import db from '../firebaseConfig';

// import NotificationSound from './notification-sound.mp3';

function Hello() {
  const audioPlayer = useRef(null);

  async function playAudio() {
    console.log('notif pressed');

    // audioPlayer.current.play();
    // eslint-disable-next-line no-new
    new window.Notification('coba', {
      body: 'coba',
    });

    // const querySnapshot = await getDocs(collection(db, 'users'));
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, doc.data());
    // });
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-new
      new window.Notification('coba', {
        body: 'coba',
      });
    }, 3000);
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <h2>Press the button to play audio</h2>
        <button type="button" onClick={playAudio}>
          Play
        </button>
        {/* <audio ref={audioPlayer} src={NotificationSound} /> */}
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
