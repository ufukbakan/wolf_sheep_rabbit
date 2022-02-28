import classNames from "classnames";
import { useEffect, useState } from "react"
import loading from "./assets/loading.svg";
import sheep from "./assets/sheep.png";
import wolf from "./assets/wolf.png";
import rabbit from "./assets/rabbit.png";
import Choice from "./Choice";
import MyAxios from "./MyAxios";

export default function (props) {

    const [playerNames, setPlayerNames] = useState([]);
    const [fetchRoom, setFetchRoom] = useState(true);
    const [timer, setTimer] = useState(undefined);
    const [firstFecth, setFirstFecth] = useState(true);
    const [myChoice, setMyChoice] = useState(undefined);
    const [status, setStatus] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [didIwin, setDidIwin] = useState(false);

    useEffect(() => {
        if (timer) {
            clearInterval(timer);
        }
        setTimer(setInterval(fetchTick, 1000));
    }, [fetchRoom]);

    function fetchTick() {
        if (fetchRoom) {
            MyAxios.get("/api/rooms/" + props.roomId).then((response) => {
                checkWinner(response.data);
                fetchChoice(response.data);
                setPlayerNames([response.data.player1, response.data.player2]);
                prepareStatusText(response.data);
            });
            if (firstFecth) {
                setFirstFecth(false);
            }
        }
    }

    function fetchChoice(data) {
        if (props.myPlayerNo == 1) {
            setMyChoice(data["player1-choice"]);
        } else {
            setMyChoice(data["player2-choice"]);
        }
    }

    function checkWinner(data) {
        if (data["player1-choice"] && data["player2-choice"]) {
            setFetchRoom(false);
            let myChoice = "";
            let opChoice = "";
            let opName = "";
            if (props.myPlayerNo == 1) {
                myChoice = data["player1-choice"];
                opChoice = data["player2-choice"];
                opName = data["player2"];
            } else {
                myChoice = data["player2-choice"];
                opChoice = data["player1-choice"];
                opName = data["player1"];
            }

            let content = "";
            if (myChoice == "wolf" && opChoice == "wolf")
                content = "BERABERE!\nDişe diş!";
            else if (myChoice == "wolf" && opChoice == "sheep")
                content = "KAZANDIN!\n" + opName + " kuzu pirzola oldu.";
            else if (myChoice == "wolf" && opChoice == "rabbit")
                content = "KAYBETTİN!\n" + opName + " zıp zıp zıplayarak sana toz yutturdu.";
            else if (myChoice == "sheep" && opChoice == "wolf")
                content = "KAYBETTİN!\nKuzu pirzola oldun.";
            else if (myChoice == "sheep" && opChoice == "sheep")
                content = "BERABERE!\nKoyun koyuna!";
            else if (myChoice == "sheep" && opChoice == "rabbit")
                content = "KAZANDIN!\nHavuçlarını yediğin için " + opName + " açlıktan öldü.";
            else if (myChoice == "rabbit" && opChoice == "wolf")
                content = "KAZANDIN!\n" + opName + " seni yakalayacağım diye çukura düştü.";
            else if (myChoice == "rabbit" && opChoice == "sheep")
                content = "KAYBETTİN!\nBütün havuçları " + opName + " yemiş olmalı.";
            else if (myChoice == "rabbit" && opChoice == "rabbit")
                content = "BERABERE!\nHavuç kardeşliği!";

            content += "\nTekrar oynamak için tıkla";
            if (content.includes("KAZANDIN"))
                setDidIwin(true);
            else
                setDidIwin(false);

            setModalContent(content);
            setShowModal(true);
            setTimeout(resetMyChoice, 1001);
        } else {
            setFetchRoom(true);
        }
    }

    function resetMyChoice() {
        MyAxios.delete("/api/rooms/" + props.roomId);
    }

    function playAgain() {
        setShowModal(false);
        setFirstFecth(true);
        setTimeout(() => {
            MyAxios.post("/api/rooms/" + props.roomId + "/as/" + props.myPlayerNo, { "playerName": props.myPlayerName }).then((response) => {
                if (response.status === 200) {
                    setFetchRoom(true);
                } else {
                    throw new Error("Error");
                }
            }).catch(err => {
                setFirstFecth(false);
                setModalContent(err.message);
                setShowModal(true);
            });
        }, 1001);
    }

    function prepareStatusText(data) {
        let playersNotReady = [];
        console.log();
        if (!data["player1-choice"]) {
            playersNotReady.push(data.player1);
        }
        if (!data["player2-choice"]) {
            playersNotReady.push(data.player2);
        }
        if (playersNotReady.length > 0) {
            setStatus(playersNotReady.reduce((pv, next) => { return pv.concat(" " + next) }, "Seçim yapması bekleniyor:"));
        } else {
            setStatus("");
        }
    }

    function sendChoice(value) {
        MyAxios.put("/api/rooms/" + props.roomId, {
            playerNo: props.myPlayerNo,
            choice: value
        }).then(() => {
            setMyChoice(value);
        })
    }

    function renderChoiceText(){
        if(myChoice == undefined || myChoice.length == null){
            return <span>Seçimini Yap<br></br>▼</span>
        }else{
            return <span>Seçimini Hala Değiştirebilirsin<br></br>▼</span>
        }
    }

    return (
        <div className="screen">
            <div className="players">
                <div className="player-name">{playerNames[0]}</div>
                <div className="player-name player-vs">VS.</div>
                <div className="player-name">{playerNames[1]}</div>
            </div>

            <div className="game-screen">
                <div className={classNames({
                    "loading-circle": true,
                    "hide": !firstFecth
                })} >
                    <img src={loading} />
                </div>
                <br />
                <div className="choices">
                    <h2>{renderChoiceText()}</h2>
                    <Choice active={myChoice == "wolf"} img={wolf} value="wolf" sendChoice={sendChoice}></Choice>
                    <Choice active={myChoice == "sheep"} img={sheep} value="sheep" sendChoice={sendChoice}></Choice>
                    <Choice active={myChoice == "rabbit"} img={rabbit} value="rabbit" sendChoice={sendChoice}></Choice>
                </div>
                <div className="status">{status}</div>

                <div className={
                    classNames({
                        "winner-modal": true,
                        "hide": !showModal,
                        "win": didIwin
                    })
                } onClick={playAgain}>
                    {modalContent}
                </div>
            </div>
        </div>
    )
}