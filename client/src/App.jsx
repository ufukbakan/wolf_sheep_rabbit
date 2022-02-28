import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios';
import LoginForm from './LoginForm';
import Game from './Game';
import Footer from './Footer';

function App() {

  const [myPlayerNo, setMyPlayerNo] = useState(-1);
  const [myPlayerName, setMyPlayerName] = useState("");
  const [roomId, setRoomId] = useState(1);

  function renderApp() {
    if (myPlayerNo <= 0) {
      return <div className="main-grid">
        <LoginForm roomId={roomId} setRoomId={setRoomId} setMyPlayerNo={setMyPlayerNo} myPlayerName={myPlayerName} setMyPlayerName={setMyPlayerName}></LoginForm>
        <Footer></Footer>
      </div>;
    } else {
      return <div className="main-grid">
        <Game roomId={roomId} myPlayerNo={myPlayerNo} setMyPlayerNo={setMyPlayerNo} myPlayerName={myPlayerName}></Game>
        <Footer></Footer>
      </div>;
    }
  }

  return (
    renderApp()
  )
}

export default App
