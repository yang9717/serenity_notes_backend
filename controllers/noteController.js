const User = require('../models/User')
const Note = require('../models/Note')
const { customAlphabet } = require('nanoid');
const asyncHandler = require('express-async-handler')


const getAllNotes = asyncHandler(async(req, res) => {
    const notes = await Note.find().lean()

    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found'})
    }

    const notesWithUser = await Promise.all(notes.map(async(note) => {
        const user = await User.findById(note.user).lean().exec()
        return { ...note, username: user.username}
    }))

    res.json(notesWithUser)
})

const createNewNote = asyncHandler(async(req, res) => {
    const { user, title, text } = req.body

    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    const datePrefix = new Date().toISOString().split('T')[0].replace(/-/g, "")
    const nanoidGenerator = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
    const nanoSuffix = nanoidGenerator();
    ticketno = `${datePrefix}${nanoSuffix}`

    const noteObject = { ticketno, user, title, text }
    const note = await Note.create(noteObject)

    if (note){
        res.status(201).json({ message: `New note ${ticketno} created` })
    } else {
        res.status(400).json({ message: 'Invalid note data received'})
    }
})


const updateNote = asyncHandler(async(req, res) => {
    const { id, ticketno, user, title, text, completed } = req.body

    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required'})
    }

    if (ticketno) {
        return res.status(400).json({ message: 'Ticket number cannot be modified' })
    }

    const note = await Note.findById(id).exec()

    if (!note) {
        res.status(400).json({ message: 'Note not found'})
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    await note.save()

    res.json({ message: `Note ${note.ticketno} updated` })
})

const deleteNote = asyncHandler(async(req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Note ID is required'})
    }
    
    const note = await Note.findById(id).exec()
    
    if (!note) {
        return res.status(400).json({ message: 'Note not found'})
    }

    await note.deleteOne()

    res.json(`Note ${note.ticketno} has been deleted`)
})

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote}