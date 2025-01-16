const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found'})
    }
    res.json(users)
})

const createNewUser = asyncHandler(async(req, res) => {
    const { username, password, roles } = req.body

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicate){
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, 'password': hashedPwd} 
        : { username, "password": hashedPwd, roles }

    const user = await User.create(userObject)

    if (user){
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received'})
    }
})

const updateUser = asyncHandler(async(req, res) => {
    const { id, username, password, roles, active } = req.body
    
    if (!id || !username) {
        return res.status(400).json({ message: 'All fields (except password) are required'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        res.status(400).json({ message: 'User not found'})
    }

    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `User ${updatedUser.username} updated` })
})

const deleteUser = asyncHandler(async(req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'User ID is required'})
    }

    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User to be deleted has assigned notes'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    await user.deleteOne()

    res.json(`User ${user.username} (ID ${user._id}) has been deleted`)
    }
)

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser}