import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders by default only title and author', () => {
    const blog = {
        title: 'test title',
        author: 'A uthor',
        url: 'www.url.asd',
        likes: 19
    }
})