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

module.exports = { dummy, totalLikes, favoriteBlog }