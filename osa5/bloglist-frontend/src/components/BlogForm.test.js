import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('callback function is called by right values', () => {
    const createBlogMockHandler = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlogMockHandler} />
    )

    const titleInput = component.container.querySelector('#blog-title')
    const authorInput = component.container.querySelector('#blog-author')
    const urlInput = component.container.querySelector('#blog-url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'Web, design, & web design.' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'Stephen Hay' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'https://www.the-haystack.com/' }
    })
    fireEvent.submit(form)

    expect(createBlogMockHandler.mock.calls[0][0].title).toBe('Web, design, & web design.')
    expect(createBlogMockHandler.mock.calls[0][0].author).toBe('Stephen Hay')
    expect(createBlogMockHandler.mock.calls[0][0].url).toBe('https://www.the-haystack.com/')
  })
})