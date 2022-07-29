const express = require('express');
const { updateUser, deleteUser, getUser, getAllUser } = require('../controllers/User');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();



router.put("/:id", verifyUser, updateUser) // update a user
router.delete("/:id", verifyUser, deleteUser) // delete a user
router.get("/:id", verifyUser, getUser)  // get a user
router.get("/", verifyAdmin, getAllUser) // get all user



module.exports = router;