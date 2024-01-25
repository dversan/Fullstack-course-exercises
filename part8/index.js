import { ApolloServer } from '@apollo/server'
import mongoose from 'mongoose'
import Book from './books/models/book.js'
import Author from './books/models/author.js'
import User from './books/models/user.js'
import 'dotenv/config'
import { GraphQLError } from 'graphql/error/index.js'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import cors from 'cors'
import http from 'http'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import jwt from 'jsonwebtoken'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id:ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
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
    allBooks(author:String, genre:String):[Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
    me: User
  }
  
  type Subscription {
    bookAdded: Book!
  }    
  
  type Mutation {
    addBook(
    title: String!,
    author: String!,
    published: Int!,
    genres: [String!]!
   ):Book!
   
   editAuthor(
   name: String!,
   born: Int!
   ):Author!
   
   createUser(
    username: String!
    favoriteGenre: String!
  ): User
  
  login(
    username: String!
    password: String!
  ): Token
  }
`

mongoose.set('strictQuery', false)

const MONGODB_URI =
  'mongodb+srv://daversan:Mongo131281@cluster0.y5ll2.mongodb.net/books?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

mongoose.set('debug', true)

const books = await Book.find({})
const authors = await Author.find({})
const authorId = (authorName) =>
  authors.find((author) => author.name === authorName).id.toString()
const booksByAuthor = (authorName) => {
  return books.filter((book) => book.author.toString() === authorId(authorName))
}
const bookAuthor = (authorId) =>
  authors.find((author) => author.id === authorId)

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      if (!args.genre && !args.author) {
        return books.map((book) => ({
          title: book.title,
          published: book.published,
          author: bookAuthor(book.author?.toString()) || { name: 'no author' },
          genres: book.genres
        }))
      }

      if (args.genre && args.author) {
        return booksByAuthor(args.author)
          .filter((book) => book.genres.includes(args.genre))
          .map((book) => ({
            title: book.title,
            author: bookAuthor(args.author)
          }))
      }

      if (args.author) {
        return booksByAuthor(args.author).map((book) => ({
          title: book.title,
          author: bookAuthor(authorId(args.author)),
          published: book.published,
          genres: book.genres
        }))
      }

      if (args.genre) {
        return books
          .filter((book) => book.genres.includes(args.genre))
          .map((book) => ({
            title: book.title,
            author: bookAuthor(book.author.toString()),
            published: book.published
          }))
      }
    },
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const authors = await Author.find({})
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (!authors.some((author) => author.name === args.author)) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }
      const book = new Book({ ...args, author: authorId(args.author) })
      let savedBook

      try {
        savedBook = await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', {
        bookAdded: {
          title: savedBook.title,
          published: savedBook.published,
          author: bookAuthor(savedBook.author.toString()),
          genres: savedBook.genres
        }
      })

      return {
        title: savedBook.title,
        published: savedBook.published,
        author: bookAuthor(savedBook.author.toString()),
        genres: savedBook.genres
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (!authorId(args.name)) {
        return null
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born

      return await author.save()
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== process.env.JWT_SECRET) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.JWT_SECRET)

      return { value: token }
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      return books.filter((book) => book.author === root.name).length
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

// using Express middleware, which means that Express must also be configured for the application, with the GraphQL server acting as middleware

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  // Set up ApolloServer
  const server = new ApolloServer({
    schema,
    plugins:
      // Proper shutdown for the HTTP server.
      [
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose()
              }
            }
          }
        }
      ]
  })

  await server.start()

  // integration function
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id).populate(
            'books'
          )
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${4000}`)
  )
}

start()
