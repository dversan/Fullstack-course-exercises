/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react'
import CreateBlogForm from '../components/CreateBlogForm.jsx'
import {
  sampleInitialFormValues,
  sampleNewBlog
} from '../doubles/testSamples.jsx'
import React from 'react'

describe('CreateBlogForm tests', () => {
  test('The form calls the event handler it received as props with the right details when a new blog is created', () => {
    const createBlogMocked = jest.fn()
    render(
      <CreateBlogForm
        initialFormValues={sampleInitialFormValues}
        createNewBlog={createBlogMocked}
      />
    )

    const titleInput = screen.getByTestId('title')
    const authorInput = screen.getByTestId('author')
    const urlInput = screen.getByTestId('url')

    fireEvent.change(titleInput, { target: { value: sampleNewBlog.title } })
    fireEvent.change(authorInput, { target: { value: sampleNewBlog.author } })
    fireEvent.change(urlInput, { target: { value: sampleNewBlog.url } })

    const formSubmitButton = screen.getByText('save')

    fireEvent.click(formSubmitButton)

    expect(createBlogMocked.mock.calls).toHaveLength(1)
    expect(createBlogMocked).toHaveBeenCalledWith(sampleNewBlog)
  })
})
