

const express = require('express');
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomavailability } = require('../controllers/room');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

// const { createError } = require('../utils/error');


router.post('/:hotelId', verifyAdmin, createRoom) // create a new hotel
router.put("/:id", verifyAdmin, updateRoom) // update a hotel
router.put("/availibility/:id", updateRoomavailability) // update a hotel
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom) // delete a hotel
router.get("/:id", getRoom)  // get a hotel
router.get("/", getAllRooms) // get all hotels



module.exports = router;