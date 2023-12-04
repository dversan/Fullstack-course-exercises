import { createSlice } from '@reduxjs/toolkit'
import serviceBlogs from '../services/blogs.js'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { setBlogs } = blogsSlice.actions

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    await serviceBlogs.create(newBlog)
    dispatch(initializeBlogs())
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
