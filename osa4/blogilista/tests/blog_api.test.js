const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const config = require('../utils/config')

let token

describe('when there are some blogs saved', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        dummyUser = new User({
            username: 'dummy',
            name: 'Dummy User',
            password: 'this-is-not-a-good-pw'
        })
        await dummyUser.save()
        const user = await User.findOne({ username: 'dummy' })
        token = listHelper.getToken(user)

        await Blog.deleteMany({})

        const blogObjects = listHelper.initialBlogs
            .map(b => new Blog(b))
        const promiseArray = blogObjects.map(b => b.save())
        await Promise.all(promiseArray)
    })
    describe('general blog properties', () => {
        test('all blogs are returned in JSON', async () => {
            const blogsAtStart = await listHelper.blogsInDb()

            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogs = response.body.map(b => new Blog(b))

            expect(blogs.length).toEqual(blogsAtStart.length)
        })

        test('identifier field is named "id"', async () => {
            const response = await listHelper.blogsInDb()
            const blogs = response

            if (blogs.length > 0) {
                const idField = blogs[0].id
                expect(idField).toBeDefined()
            }
        })
    })

    test('a new blog can be added', async () => {
        const blogsAtStart = await listHelper.blogsInDb()

        const user = await User.findOne({ username: 'dummy' })
        const newBlog = listHelper.createTestBlog(user._id)

        await api.post('/api/blogs')
            .send(newBlog)
            .set({ 'Authorization': ` Bearer ${token}` })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await listHelper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
        const blogTitles = blogsAtEnd.map(b => b.title)
        expect(blogTitles).toContainEqual(newBlog.title)
    })
    describe('adding a new blog', () => {
        test('likes have default value zero', async () => {
            const user = await User.findOne({ username: 'dummy' })
            const newBlog = listHelper.createTestBlog(user._id)
            delete newBlog.likes

            await api.post('/api/blogs')
                .send(newBlog)
                .set({ 'Authorization': ` Bearer ${token}` })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const response = await listHelper.blogsInDb()
            const addedBlog = response.find(b => b.title === "How to Javascript")
            expect(addedBlog.likes).toBe(0)
        })

        test('a blog without title and url is not added', async () => {
            const newBlog = {
                author: "Java Script",
                likes: 12
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set({ 'Authorization': ` Bearer ${token}` })
                .expect(400)

            const blogsAtEnd = await listHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length)
        })

        test('a blog without title is not added', async () => {
            const newBlog = {
                author: "Java Script",
                url: "http://www.jsByHeart.com",
                likes: 12
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set({ 'Authorization': ` Bearer ${token}` })
                .expect(400)

            const blogsAtEnd = await listHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length)
        })

        test('a blog without url is not added', async () => {
            const newBlog = {
                title: "How to Javascript",
                author: "Java Script",
                likes: 12
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set({ 'Authorization': ` Bearer ${token}` })
                .expect(400)

            const blogsAtEnd = await listHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length)
        })

        test('a blog without providing a token is not added', async () => {
            const user = await User.findOne({ username: 'dummy' })
            const newBlog = listHelper.createTestBlog(user._id)

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)

            const blogsAtEnd = await listHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length)
        })
    })
    describe('deleting a blog', () => {
        test('a blog can be deleted', async () => {
            const user = await User.findOne({ username: 'dummy' })
            const newBlog = listHelper.createTestBlog(user._id)

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set({ 'Authorization': ` Bearer ${token}` })


            const blogsAtStart = await listHelper.blogsInDb()
            const blogToDelete = await Blog.find({ title: 'How to Javascript' })

            await api.delete(`/api/blogs/${blogToDelete[0]._id}`)
                .set({ 'Authorization': ` Bearer ${token}` })
                .expect(204)


            const blogsAtEnd = await listHelper.blogsInDb()
            expect(blogsAtEnd).not.toContain(newBlog)
            expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
        })
    })

    describe('updating a blog', () => {

        test('a blog can be updated', async () => {
            const blogsAtStart = await listHelper.blogsInDb()
            const firstBlog = blogsAtStart[0]
            const id = firstBlog.id
            const updatedBlog = {
                title: firstBlog.title,
                author: firstBlog.author,
                url: firstBlog.url,
                likes: 77
            }

            await api
                .put(`/api/blogs/${id}`)
                .send(updatedBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await listHelper.blogsInDb()
            expect(blogsAtEnd[0].likes).toEqual(77)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})