const User = require('../model/User');

const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).json(updateUser);

    } catch (error) {
        next(error)
    }
}


const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "User deleted" });

    } catch (error) {
        next(error)
    }
}



const getUser = async (req, res, next) => {
    try {
        const response = await User.findOne({ _id: req.params.id })
        res.status(200).json(response);

    } catch (error) {
        next(error)
    }
}


const getAllUser = async (req, res, next) => {
    try {
        const updateUser = await User.find()
        res.status(200).json(updateUser);

    } catch (error) {
        next(error)
    }
}



module.exports = { updateUser, deleteUser, getUser, getAllUser }