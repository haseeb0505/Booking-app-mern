const Hotel = require('../model/Hotel');
const Room = require('../model/Room');

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err)
    }

}

const updateHotel = async (req, res, next) => {
    try {

        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(updateHotel);

    } catch (error) {
        next(error)
    }
}


const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Hotel deleted" });

    } catch (error) {
        next(error)
    }
}


const getHotel = async (req, res, next) => {
    try {
        const response = await Hotel.findOne({ _id: req.params.id })
        res.status(200).json(response);

    } catch (error) {
        next(error)
    }
}


const getAllHotel = async (req, res, next) => {
    const { min, max, ...others } = req.query
    try {
        const result = await Hotel.find({ ...others, cheapestPrice: { $gte: min || 1, $lte: max || 999 } }).limit(req.query.limit).sort({ cheapestPrice: 1 })
        res.status(200).json(result);

    } catch (error) {
        next(error)
    }
}
const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(async (city) => {
            const count = await Hotel.countDocuments({ city })
            return { city, count }
        }))
        res.status(200).json(list);

    } catch (error) {
        next(error)
    }
}
const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" })
        const resortCount = await Hotel.countDocuments({ type: "Resort" })
        const villaCount = await Hotel.countDocuments({ type: "Villa" })
        const cabinCount = await Hotel.countDocuments({ type: "Cabin" })
        const appartmentCount = await Hotel.countDocuments({ type: "Appartment" })


        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
            { type: "appartment", count: appartmentCount }
        ]);

    } catch (error) {
        next(error)
    }
}

const getHotelRooms = async (req, res, next) => {

    try {
        const resp = await Hotel.findById(req.params.id)
        const list = await Promise.all(resp.rooms.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).json(list);


    } catch (error) {
        next(error)
    }
}



module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType, getHotelRooms }