import { createSlice } from '@reduxjs/toolkit'
import serviceBlogs from '../services/blogs.js'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addLikeToBlog(state, action) {
      const blogToUpdate = state.find((blog) => blog.id === action.payload.id)
      const blogs = state

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }

      return blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    addCommentToBlog(state, action) {
      const blogToUpdate = state.find(
        (blog) => blog.id === action.payload.blog.id
      )
      const blogs = state

      const updatedBlog = {
        ...blogToUpdate,
        comments: blogToUpdate.comments.concat(action.payload.comment)
      }

      return blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    }
  }
})

export const { setBlogs, addLikeToBlog, addCommentToBlog } = blogsSlice.actions

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    await serviceBlogs.create(newBlog)
    dispatch(initializeBlogs())
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    dispatch(addCommentToBlog({ blog, comment }))
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }
    await serviceBlogs.update(blog.id, updatedBlog)
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    dispatch(addLikeToBlog(blog))
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await serviceBlogs.update(blog.id, updatedBlog)
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await serviceBlogs.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export default blogsSlice.reducer
