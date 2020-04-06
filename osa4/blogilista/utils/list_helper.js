const _ = require('lodash')
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(b => b.likes)

    return likes.reduce((sum, value) => sum + value, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return null

    const blogsOrderedByLikesDESC = blogs.sort((b1, b2) => {
        return b1.likes === b2.likes
            ? 0
            : -(b1.likes - b2.likes)
    })

    const favoriteBlogObject = {
        title: blogsOrderedByLikesDESC[0].title,
        author: blogsOrderedByLikesDESC[0].author,
        likes: blogsOrderedByLikesDESC[0].likes,
    }

    return favoriteBlogObject
}

const mostBlogs = (blogs) => {
    if(!blogs || blogs.length === 0) {
        return null
    }
    let authorWithMostBlogs = _.chain(blogs)
        .groupBy('author')
        .map(o => {
            return (
                {
                    author: o[0].author,
                    blogs: o.length
                })
        })
        .maxBy('blogs')
        .value()
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    if(!blogs || blogs.length === 0) {
        return null
    }
    let authorWithMostLikes = _.chain(blogs)
        .groupBy('author')
        .map(blogsByAuthor => {
            let likesAmountByAuthor = _.sumBy(blogsByAuthor, function(o) {return o.likes})
            return (
                {
                    author: blogsByAuthor[0].author,
                    likes: likesAmountByAuthor
                })
        })
        .maxBy('likes')
        .value()
    return authorWithMostLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, initialBlogs, mostBlogs, mostLikes, blogsInDb }