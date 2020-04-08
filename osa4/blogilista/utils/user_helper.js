const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const createUser = async () => {
    const dummyUser = new User({
        username: 'dummy',
        name: 'Dummy User',
        password: 'this-is-not-a-good-pw'
    })
    console.log('adsaddasdasdad')
    const response = await dummyUser.save()
    return response
}

module.exports = { usersInDb, createUser }