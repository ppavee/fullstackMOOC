const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    genres: [String!]!
    recommendations: [Book]!
    findUser(username: String): User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if(args.genre) {
        return Book.find({ genres: { $in: args.genre }}).populate('author')
      }
      return Book.find({}).populate('author')
    },

    allAuthors: () => {
      return Author.find({}).populate('books')
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    genres: () => {
      return [ ...new Set(Book.find({}).map(b => b.genres.join(',').split(',')))]
    },
    recommendations: (root, args, { currentUser }) => {
      try {
        if(!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
        return Book.find({ genres: { $in: currentUser.favoriteGenre }}).populate('author')
      } catch(error) {
        return []
      }
    },
    findUser: (root, args) => {
      return User.findOne({ username: args.username })
    }
  },

  Book: {
    author: (root, args) => {
      return Author.findOne({ name: root.author.name }).populate('books')
    }
  },

  Author: {
    bookCount: (root, args) => {
     return root.books.length
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let authorOfBook =  await Author.findOne({ name: args.author }).populate('books')
      if(!authorOfBook) {
        authorOfBook = new Author({ name: args.author })
        try{
          await authorOfBook.save()
        } catch(error) {
          throw new UserInputError('Author\'s name must be atleast 4 characters long', {
            invalidArgs: args,
          })
        }
      }
      const newBook = new Book({
        title: args.title,
        author: authorOfBook,
        published: args.published,
        genres: args.genres
      })
      
      try {
        await newBook.save()
        console.log(newBook)
        console.log(authorOfBook)
        authorOfBook.books = authorOfBook.books.concat(newBook)
        
        await authorOfBook.save()
      } catch(error) {
        throw new UserInputError('The title of the book must be atleast 2 characters long', {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook

    },
    editAuthor: async (root, args, { currentUser }) => {
      if(!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const authorToEdit = await Author.findOne({ name: args.name }).populate('books')
      if(!authorToEdit) {
        return null
      }

      try {
        authorToEdit.born = args.setBornTo
        await authorToEdit.save()
      } catch(error) {
        throw new UserInputError("Age must be an integer", {
          invalidArgs: args
        })
      }
      return authorToEdit

    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if(!user || args.password !== 'sekret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})