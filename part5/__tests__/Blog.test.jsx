/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Blog from '../components/Blog/Blog.jsx'
import {
  sampleBlog,
  sampleInitialFormValues,
  sampleNewBlog,
  sampleUser
} from '../doubles/testSamples.jsx'
import blogService from '../services/blogs.js'
import CreateBlogForm from '../components/CreateBlogForm.jsx'
import App from '../App.jsx'

describe('Blog tests', () => {
  test('renders blog details only with the tittle and author info', () => {
    const { container } = render(<Blog blog={sampleBlog} user={sampleUser} />)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(`${sampleBlog.title} - ${sampleBlog.author}`)
    expect(screen.queryByText(sampleBlog.url)).toBeFalsy()
  })

  test('All blog details are shown when the detail button is clicked', () => {
    render(<Blog blog={sampleBlog} user={sampleUser} />)

    const detailsButton = screen.getByText('details')

    fireEvent.click(detailsButton)

    expect(screen.getByText(sampleBlog.url)).toBeTruthy()
    expect(screen.getByText(sampleBlog.likes)).toBeTruthy()
  })

  test('The eventHandler to add likes to the likes count is called as many times as the likes button is clicked.', () => {
    blogService.update = jest.fn()

    render(<Blog blog={sampleBlog} user={sampleUser} />)

    const detailsButton = screen.getByText('details')

    fireEvent.click(detailsButton)

    const likesButton = screen.getByText('likes')

    fireEvent.click(likesButton)
    fireEvent.click(likesButton)

    expect(blogService.update.mock.calls).toHaveLength(2)
  })
})
