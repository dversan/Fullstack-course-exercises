import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v4 as uuid } from 'uuid'
import mongoose from 'mongoose'
import Book from './books/models/book.js'
import Author from './books/models/author.js'
import 'dotenv/config'

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
  }
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution']
  }
]

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
    id:ID!
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

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const books = await Book.find({})
      const booksByAuthor = books.filter((book) => book.author === args.author)

      if (!args.genre && !args.author) {
        return books
      }

      if (args.genre && args.author) {
        return booksByAuthor
          .filter((book) => book.genres.includes(args.genre))
          .map((book) => ({
            title: book.title,
            author: book.author
          }))
      }

      if (args.author) {
        return booksByAuthor.map((book) => ({
          title: book.title
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
      const book = new Book({ ...args, id: uuid() })
      if (!authors.some((author) => author.name === args.author)) {
        const author = new Author({ name: args.author, id: uuid() })
        return author.save()
      }
      return book.save()
    },
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name)

      if (!author.name) {
        return null
      }

      const updatedAuthor = { ...author, born: args.born }
      authors = authors.map((author) =>
        author.name === updatedAuthor.name ? updatedAuthor : author
      )
      return updatedAuthor
    }
  },

  Author: {
    bookCount: (root) => {
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
