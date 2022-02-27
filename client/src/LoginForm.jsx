import { useState } from "react";
import MyAxios from "./MyAxios";

export default function LoginForm(props) {

    const [errorMessage, setErrorMessage] = useState("");

    function connectToRoom(e) {
        e.preventDefault();
        MyAxios.post('/api/rooms/'+props.roomId, { "playerName": props.myPlayerName }).then((response) => {
            //console.log(response.data);
            if (response.status === 200)
                props.setMyPlayerNo(response.data.playerNo);
        }).catch(error => { setErrorMessage(error.response.data.message); });
    }

    function handlePlayerNameChange(e) {
        props.setMyPlayerName(e.target.value);
    }

    function cleanTheRoom(e) {
        MyAxios.delete("/api/rooms/"+props.roomId).then((response) => {
            if (response.data == true) {
                setErrorMessage("Oda temizlendi");
            }
        });
    }

    function handleRoomIdChange(e){
        props.setRoomId(e.target.value);
    }

    return (
        <div className="absolute-center">
            <form method="post" onSubmit={connectToRoom}>
                <div><input type="text" name="player_name" placeholder="Enter your name" value={props.myPlayerName} onChange={handlePlayerNameChange} required={true} /></div>
                <center>
                    <select name="room" id="roomid" onChange={handleRoomIdChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </center>
                <div id="input-error">{errorMessage}</div>
                <center><input type="submit" className="button" value="Connect to Room"></input></center>
                <center><div className="button" onClick={cleanTheRoom}>Odayı Temizle</div></center>
            </form>
        </div>
    )
}