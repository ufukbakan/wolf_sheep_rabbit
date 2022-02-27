import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios';
import LoginForm from './LoginForm';
import Game from './Game';

function App() {

  const [myPlayerNo, setMyPlayerNo] = useState(-1);
  const [myPlayerName, setMyPlayerName] = useState("");
  const [roomId, setRoomId] = useState(1);

  function renderApp(){
    if(myPlayerNo <= 0){
      return <LoginForm roomId={roomId} setRoomId={setRoomId} setMyPlayerNo={setMyPlayerNo} myPlayerName={myPlayerName} setMyPlayerName={setMyPlayerName}></LoginForm>
    }else{
      return <Game roomId={roomId} myPlayerNo={myPlayerNo} setMyPlayerNo={setMyPlayerNo} myPlayerName={myPlayerName}></Game>;
    }
  }

  return (
    renderApp()
  )
}

export default App
