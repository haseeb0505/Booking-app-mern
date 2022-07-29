const express = require('express');
const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType, getHotelRooms } = require('../controllers/hotel');
const { verifyUser, verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

// const { createError } = require('../utils/error');


router.post('/', verifyAdmin, createHotel) // create a new hotel
router.put("/:id", verifyAdmin, updateHotel) // update a hotel
router.delete("/:id", verifyAdmin, deleteHotel) // delete a hotel
router.get("/find/:id", getHotel)  // get a hotel
router.get("/", getAllHotel) // get all hotels
router.get("/countByCity", countByCity) // get all hotels
router.get("/countByType", countByType) // get all hotels
router.get("/room/:id", getHotelRooms) // get rooms of hotel



module.exports = router;