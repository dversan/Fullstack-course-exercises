import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v4 as uuid } from 'uuid'
import mongoose from 'mongoose'
import Book from './books/models/book.js'
import Author from './books/models/author.js'
import 'dotenv/config'

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
    genres: [String!]!
  }
    
  type Query {
    allBooks(author:String, genre:String):[Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
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
          author: bookAuthor(book.author.toString()),
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
          .map((book) => ({ title: book.title, author: book.author }))
      }
    },
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      const authors = await Author.find({})
      if (!authors.some((author) => author.name === args.author)) {
        const author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: authorId(args.author) })
      const savedBook = await book.save()

      return {
        title: savedBook.title,
        published: savedBook.published,
        author: bookAuthor(savedBook.author.toString()),
        genres: savedBook.genres
      }
    },
    editAuthor: async (root, args) => {
      if (!authorId(args.name)) {
        return null
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born

      return await author.save()
    }
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      return books.filter((book) => book.author === root.name).length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
