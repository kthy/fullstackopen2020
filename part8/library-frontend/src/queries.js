import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int, $authorName: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    authorName: $authorName,
    genres: $genres
  ) {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
    bookCount
    id
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login (
    username: $username,
    password: $password
  ) {
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}`
