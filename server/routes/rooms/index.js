'use strict'

module.exports = async function(fastify, opts){
    fastify.get("/:roomid", async (req, res) => fastify.getRoomDetails(req.params.roomid) );
    fastify.post("/:roomid", async (req, res) => fastify.joinRoom(req.params.roomid, req.body, res));
    fastify.post("/:roomid/as/:pid", async (req, res) => fastify.joinRoomAs(req.params.roomid, req.params.pid, req.body, res));
    fastify.put("/:roomid", async (req, res) => fastify.setChoice(req.params.roomid, req.body));
    fastify.delete("/:roomid", async (req, res) => fastify.cleanRoom(req.params.roomid));
}