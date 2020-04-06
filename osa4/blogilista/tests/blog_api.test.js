const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = listHelper.initialBlogs
        .map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned in JSON', async () => {
    const blogsAtStart = listHelper.initialBlogs

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body.map(b => new Blog(b))

    expect(blogs.length).toEqual(blogsAtStart.length)
})

test('identifier field is named "id"', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body.map(b => new Blog(b))
    
    if (blogs.length > 0) {
        const idField = blogs[0].id
        expect(idField).toBeDefined()
    }
})

test('a new blog can be added', async () => {
    const blogsAtStart = listHelper.initialBlogs
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
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.length + 1)
    expect(blogsAtEnd.body).toContainEqual(createdBlog)
})

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

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(b => b.title === "How to Javascript")
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

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(listHelper.initialBlogs.length)
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

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(listHelper.initialBlogs.length)
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

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(listHelper.initialBlogs.length)
})


afterAll(() => {
    mongoose.connection.close()
})