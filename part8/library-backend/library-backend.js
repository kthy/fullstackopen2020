const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

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
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
  }
`

const resolvers = {
  Mutation: {
    addAuthor: (_, args) => new Author({ ...args }).save(),
    addBook: (_, args) => new Book({ ...args }).save(),
    editAuthor: (_, args) => Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
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
      return Book.find(filterQuery)
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
  },
  Author: {
    bookCount: (root) => Book.collection.countDocuments({ author: ObjectId(root._id) })
  },
  Book: {
    author: (root) => Author.findById(root.author)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
