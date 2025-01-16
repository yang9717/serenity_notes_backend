const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')
const app = express()

app.use(verifyJWT)

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router