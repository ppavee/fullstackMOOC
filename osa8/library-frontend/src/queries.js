import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(
      author: $author
      genre: $genre
      ) {
        title
        published
        author {
          name
          born
          id
          bookCount
        }
        id
        genres
      }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
      addBook(
        title: $title
        published: $published
        author: $author
        genres: $genres
      ) {
        title
        published
        author {
          name
          born
          id
          bookCount
        }
        id
        genres
      }
    }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ) {
      name
      id
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`

export const RECOMMENDATIONS = gql`
  query {
    recommendations {
      title
      published
      author {
        name
        born
        id
        bookCount
      }
      id
      genres
    }
  }
`

export const FIND_USER = gql`
  query findUser($username: String) {
    findUser(
      username: $username
    ) {
      id
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
        id
        bookCount
      }
      id
      genres
    }
  }
`