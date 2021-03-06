const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const blogs = [
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

const listWithEquallyLikedBlogs = [
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
        likes: 7,
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


describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])

        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)

        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)

        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {

    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog([])

        expect(result).toEqual(null)
    })

    test('is the single blog when a list has only one', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)

        const expection = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
        expect(result).toEqual(expection)
    })

    test('is the most popular', () => {
        const result = listHelper.favoriteBlog(blogs)

        const expection = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        }
        expect(result).toEqual(expection)
    })

    test('returns one when two blogs are equally liked', () => {
        const result = listHelper.favoriteBlog(listWithEquallyLikedBlogs)

        const blogsMapped = listWithEquallyLikedBlogs.map(b => {
           return (
            { 
                title: b.title,
                author: b.author,
                likes: b.likes
            })
        })
        expect(blogsMapped).toContainEqual(result)
    })
})

describe('who has most blogs', () => {

    test('returns the author with most blogs and number of blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        const expected = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(expected).toEqual(result)
    })

    test('returns one of numerous authors when equal number of blogs', () => {
        const result = listHelper.mostBlogs(listWithEquallyLikedBlogs)

        const blogsMapped = listWithEquallyLikedBlogs.map(b => {
           return (
            { 
                author: b.author,
                blogs: 1
            })
        })
        expect(blogsMapped).toContainEqual(result)
    })

    test('is null in empty array', () => {
        const result = listHelper.mostBlogs([])

        expect(result).toEqual(null)
    })
})

describe('who has most likes', () => {

    test('returns the author with most likes and number of likes', () => {
        const result = listHelper.mostLikes(blogs)
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(expected).toEqual(result)
    })

    test('returns one of numerous authors when equal number of likes', () => {
        const result = listHelper.mostLikes(listWithEquallyLikedBlogs)

        const possibleObjects = [
            {
                author: 'Michael Chan',
                likes: 7
            },
            {
                author: 'Edsger W. Dijkstra',
                likes: 7
            }
        ]
        expect(possibleObjects).toContainEqual(result)
    })

    test('is null in empty array', () => {
        const result = listHelper.mostLikes([])

        expect(result).toEqual(null)
    })
})