import classNames from "classnames";
import { useState } from "react";
import MyAxios from "./MyAxios";

export default function LoginForm(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [showInstructions, setShowInstructions] = useState(true);

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

    function showTutorial(e) {
        setShowInstructions(true);
    }

    function hideTutorial(e) {
        setShowInstructions(false);
    }

    return (
        <div className="login-form">
            <div className={classNames({
                "instructions": true,
                "hide": !showInstructions
            })}>
                <ol>
                    <li>İsminizi girin ve arkadaşınızla aynı no'lu odaya bağlanın.</li>
                    <li>Oyun odasına bağlandığınızda kurt, koyun veya tavşan resimlerine tıklayarak seçiminizi yapın.</li>
                    <li>Arkadaşınız seçim yapana kadar seçiminizi değiştirebilirsiniz.</li>
                    <li>İki oyuncu da seçim yaptığında kazanan ekranda gözükecektir.</li>
                    <li>Tekrar oynamak isterseniz ekranda çıkan bildirime tıklayınız.</li>
                </ol>
                <div className="button" onClick={hideTutorial}>Anladım</div>
            </div>
            <form method="post" onSubmit={connectToRoom}>
                <center><input type="text" name="player_name" placeholder="İsminizi girin" value={props.myPlayerName} onChange={handlePlayerNameChange} required={true} /></center>
                <center>
                    <label><span>Oda No: </span> 
                    <select name="room" id="roomid" onChange={handleRoomIdChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    </label>
                </center>
                <center>
                    <div id="input-error">{errorMessage}</div>
                </center>
                <center><input type="submit" className="button" value="Odaya Bağlan"></input></center>
                <center><div className="button" onClick={showTutorial}>Nasıl Oynanır?</div></center>
                {/*
                <center><div className="button" onClick={cleanTheRoom}>Odayı Temizle</div></center>
                */}
            </form>
        </div>
    )
}