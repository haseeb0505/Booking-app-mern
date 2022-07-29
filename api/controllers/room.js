const Room = require('../model/Room');
const Hotel = require('../model/Hotel');


const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (error) {
            next(error);
        }
        res.status(201).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

const updateRoom = async (req, res, next) => {
    try {

        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom);

    } catch (error) {
        next(error)
    }
}
const updateRoomavailability = async (req, res, next) => {
    try {

        const updateRoom = await Room.updateOne({ "roomNumbers._id": req.params.id }, { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }, { new: true })
        res.status(200).json(updateRoom);

    } catch (error) {
        next(error)
    }
}


const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
        } catch (error) {
            next(error);
        }

        res.status(200).json({ message: "Room deleted" });

    } catch (error) {
        next(error)
    }
}


const getRoom = async (req, res, next) => {
    try {
        const response = await Room.findOne({ _id: req.params.id })
        res.status(200).json(response);

    } catch (error) {
        next(error)
    }
}


const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms);

    } catch (error) {
        next(error)
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomavailability }