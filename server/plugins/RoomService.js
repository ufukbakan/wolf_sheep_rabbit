'use strict'

const { default: fp } = require('fastify-plugin');
const { Pool } = require('pg');
let pool = undefined;
if(process.env.NODE_ENV == "development"){
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'wolf_sheep_rabbit',
        password: 'postgres',
        port: 5432,
    });
}
else{
    pool = new Pool();
}
let activeRooms = new Set();

async function getRoomDetails(roomId){
    let response = (await pool.query('SELECT * from game_rooms where room_id=$1', [roomId])).rows[0];
    return response;
}

async function joinRoom(roomId, data, response){
    let statusCode = 200;
    let returnData = {message:""};

    if(!data.playerName){
        statusCode = 403;
        returnData.message = "Oyuncu ismi girilmemiş";
    }else{
        const room = await getRoomDetails(roomId);
        if(room.player1 == null){
            await pool.query("update game_rooms set player1=$1 where room_id=$2", [data.playerName, roomId]).then(()=>{
                returnData.playerNo = 1;
                returnData.message = "Başarıyla giriş yapıldı";
                activeRooms.add(roomId);
            }).catch(err => {
                statusCode = 500;
                returnData.message = "Odaya katılınamadı";
            })
        }else if(room.player2 == null){
            await pool.query("update game_rooms set player2=$1 where room_id=$2", [data.playerName, roomId]).then(()=>{
                returnData.playerNo = 2;
                returnData.message = "Başarıyla giriş yapıldı";
                activeRooms.add(roomId);
            }).catch(err =>{
                statusCode = 500;
                returnData.message = "Odaya katılınamadı";
            });
        }else{
            statusCode = 405;
            returnData.message = "Oda dolu";
        }
    }

    response.code(statusCode);
    return returnData;
}

async function joinRoomAs(roomId, playerId, data, response){
    let statusCode = 200;
    let returnData = {message:""};

    if(!data.playerName){
        statusCode = 403;
        returnData.message = "Oyuncu ismi girilmemiş";
    }else{
        if(playerId == 1){
            await pool.query("update game_rooms set player1=$1 where room_id=$2", [data.playerName, roomId]).then(()=>{
                returnData.playerNo = 1;
                returnData.message = "Başarıyla giriş yapıldı";
                activeRooms.add(roomId);
            }).catch(err => {
                statusCode = 500;
                returnData.message = "Odaya katılınamadı";
            })
        }else if(playerId == 2){
            await pool.query("update game_rooms set player2=$1 where room_id=$2", [data.playerName, roomId]).then(()=>{
                returnData.playerNo = 2;
                returnData.message = "Başarıyla giriş yapıldı";
                activeRooms.add(roomId);
            }).catch(err =>{
                statusCode = 500;
                returnData.message = "Odaya katılınamadı";
            });
        }else{
            statusCode = 400;
            returnData.message = "Bad request";
        }
    }

    response.code(statusCode);
    return returnData;
}

async function setChoice(roomId, data){
    console.log(data);
    if(data.playerNo == 1){
        await pool.query("update game_rooms set \"player1-choice\"=$1 where room_id=$2", [data.choice, roomId]);
        activeRooms.add(roomId);
    }else{
        await pool.query("update game_rooms set \"player2-choice\"=$1 where room_id=$2", [data.choice, roomId]);
        activeRooms.add(roomId);
    }
    return true;
}

async function cleanRoom(roomId){
    await pool.query("update game_rooms set \"player1\"=NULL, \"player2\"=null, \"player1-choice\"=null, \"player2-choice\"=null where room_id=$1", [roomId]);
    return true;
}

function isRoomClean(roomId){
    let result = false;
    const details = getRoomDetails(roomId).then(details => {
        if(details.player1 == null && details.player2 == null && details && details["player1-choice"] == null && details["player2-choice"] == null){
            result = true;
        }
    });
    return result;
}

function cleanAFKs(roomCount){
    for(let i = 1; i <= roomCount; i++){
        if(!activeRooms.has(i) && !isRoomClean(i) ){
            cleanRoom(i);
            console.log("Room "+i+" cleaned");
        }
        activeRooms.delete(i);
    }
}

module.exports = fp(async (fastify,opts)=>{
    fastify.decorate('getRoomDetails', getRoomDetails);
    fastify.decorate('joinRoom', joinRoom);
    fastify.decorate('setChoice', setChoice);
    fastify.decorate('cleanRoom', cleanRoom);
    fastify.decorate('joinRoomAs', joinRoomAs);
    fastify.decorate('cleanAFKs', cleanAFKs);
} );