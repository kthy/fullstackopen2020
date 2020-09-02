const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = 'TOP_SEKRET'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int
    ): Author!
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book!
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
    me: User
  }
`

const throwIfNotAuthenticated = (context) => {
  const currentUser = context.currentUser
  if (!currentUser) {
    throw new AuthenticationError('not authenticated')
  }
}

const resolvers = {
  Mutation: {
    addAuthor: async (_, args, context) => {
      throwIfNotAuthenticated(context)

      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
    addBook: async (_, args, context) => {
      throwIfNotAuthenticated(context)

      const book = new Book({ ...args })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return book
    },
    createUser: async (_, args) => {
      const user = new User({ ...args })
      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (_, args, context) => {
      throwIfNotAuthenticated(context)
      await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'sekret' ) {
        throw new UserInputError('login failed')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Query: {
    allAuthors: () => Author.find({}),
    allBooks: (_, args) => {
      let filterQuery = {}
      if (args.author) {
        filterQuery = { author: ObjectId(args.author) }
      }
      if (args.genre) {
        filterQuery = { ...filterQuery, genre: { $in: [args.genre] } }
      }
      return Book.find(filterQuery).populate('author')
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (_, __, context) => context.currentUser,
  },
  Author: {
    bookCount: (root) => Book.collection.countDocuments({ author: ObjectId(root._id) })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
