const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

describe('when there are some blogs saved', () => {
    beforeEach(async () => {
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
        const newBlog = {
            title: "How to Javascript",
            author: "Java Script",
            url: "http://www.jsByHeart.com",
            likes: 12
        }

        const response = await api.post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const createdBlog = response.body
        const blogsAtEnd = await listHelper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
        expect(blogsAtEnd).toContainEqual(createdBlog)
    })
    describe('adding a new blog', () => {
        test('likes have default value zero', async () => {
            const newBlog = {
                title: "How to Javascript",
                author: "Java Script",
                url: "http://www.jsByHeart.com",
            }

            await api.post('/api/blogs')
                .send(newBlog)
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
                .expect(400)

            const blogsAtEnd = await listHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length)
        })
    })
    describe('deleting a blog', () => {
        test('a blog can be deleted', async () => {
            const blogsAtStart = await listHelper.blogsInDb()
            const id = blogsAtStart[0].id

            await api.delete(`/api/blogs/${id}`)
                .expect(204)

            const blogsAtEnd = await listHelper.blogsInDb()
            expect(blogsAtEnd).not.toContain(blogsAtStart[0])
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