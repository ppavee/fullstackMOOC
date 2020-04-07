const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1} )
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    if(body.username === undefined || body.username.length < 3) {
        return response.status(400).json({
            error: 'users must have a username and it must be atleast 3 characters long'
        })
    }
    if(body.password === undefined || body.password.length < 3) {
        return response.status(400).json({
            error: 'users must have a password and it must be atleast 3 characters long'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter