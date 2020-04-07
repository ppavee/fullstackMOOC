const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const userHelper = require('../utils/user_helper')

describe('when there is initially one user in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'root',
            name: 'Superuser',
            passwordHash
        })

        await user.save()
    })

    describe('a valid user can be created', () => {
        test('user creation is successful', async () => {
            const usersAtStart = await userHelper.usersInDb()

            const newUser = {
                username: 'jDoe',
                name: 'John Doe',
                password: 'password'
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await userHelper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
            const usernamesAtEnd = usersAtEnd.map(u => u.username)
            expect(usernamesAtEnd).toContainEqual(newUser.username)
        })
    })

    describe('user must have a valid username', () => {
        test('username must be unique', async () => {
            const usersAtStart = await userHelper.usersInDb()

            const user = {
                username: 'root',
                name: 'Unique Name',
                password: 'salainen'
            }

            const result = await api
                .post('/api/users')
                .send(user)
                .expect(400)
                .expect('Content-Type', /application\/json/)

                expect(result.body.error).toContain('`username` to be unique')

            const usersAtEnd = await userHelper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('username must be provided', async () => {
            const usersAtStart = await userHelper.usersInDb()
            const user = {
                name: 'a-uniq-name',
                password: 'salainen'
            }

            const result = await api
                .post('/api/users')
                .send(user)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(result.body.error).toContain('users must have a username and it must be atleast 3 characters long')

            const usersAtEnd = await userHelper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('username must be atleast three characters long', async () => {
            const usersAtStart = await userHelper.usersInDb()
            const user = {
                username: 'ab',
                user: 'QweRty',
                password: 'salainen'
            }

            const result = await api
                .post('/api/users')
                .send(user)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('users must have a username and it must be atleast 3 characters long')
            const usersAtEnd = await userHelper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)

        })
    })

    describe('user must have a valid password', () => {
        test('password must be provided', async () => {
            const usersAtStart = await userHelper.usersInDb()
            const user = {
                username: 'new-user',
                name: 'New User',
            }

            const result = await api
                .post('/api/users')
                .send(user)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(result.body.error).toContain('users must have a password and it must be atleast 3 characters long')

            const usersAtEnd = await userHelper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('password must be atleast three characters long', async () => {
            const usersAtStart = await userHelper.usersInDb()
            const user = {
                username: 'QweRty',
                user: 'Qwen Rtyler',
                password: 'ab'
            }

            const result = await api
                .post('/api/users')
                .send(user)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('users must have a password and it must be atleast 3 characters long')
            const usersAtEnd = await userHelper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)

        })
    })

})

afterAll(() => {
    mongoose.connection.close()
})