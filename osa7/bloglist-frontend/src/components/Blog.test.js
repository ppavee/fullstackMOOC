import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let likeMockHandler
  let removeMockHandler

  beforeEach(() => {
    const blog = {
      title: 'David Walsh Blog',
      author: 'David Walsh',
      url: 'https://davidwalsh.name/',
      likes: 19,
      user: {
        username: 'roor',
        name: 'Superuser'
      }
    }

    likeMockHandler = jest.fn()
    removeMockHandler = jest.fn()

    component = render(
      <Blog blog={blog} handleRemove={removeMockHandler} clickLike={likeMockHandler} />
    )
  })

  test('renders by default only title and author', () => {
    // title should render
    expect(component.container).toHaveTextContent('David Walsh Blog')
    // author should render
    expect(component.container).toHaveTextContent('David Walsh')
    // url should NOT render
    expect(component.container).not.toHaveTextContent('https://davidwalsh.name/')
    // likes should NOT render
    expect(component.container).not.toHaveTextContent(19)
  })

  test('shows title, author, url and likes after "view" button press', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    // title should render
    expect(component.container).toHaveTextContent('David Walsh Blog')
    // author should render
    expect(component.container).toHaveTextContent('David Walsh')
    // url should render
    expect(component.container).toHaveTextContent('https://davidwalsh.name/')
    // likes should render
    expect(component.container).toHaveTextContent(19)
  })

  test('"like" button clicks are calculated right', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})

