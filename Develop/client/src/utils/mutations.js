import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($username: String, $email: String, $password: String) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
      }
    }
  }
`
export const LOGIN_USER = gql`
mutation Mutation($username: String, $email: String, $password: String) {
    login(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
        savedBooks {
          authors
          bookId
          description
          link
          image
          title
        }
      }
    }
  }
  `

  export const SAVE_BOOK = gql`
  mutation Mutation($authors: [String], $description: String, $bookId: String, $image: String, $link: String, $title: String) {
    saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
  `

    export const REMOVE_BOOK = gql`
    mutation Mutation($bookId: String) {
        deleteBook(bookId: $bookId) {
          email
          savedBooks {
            authors
            bookId
            description
            image
            link
            title
          }
          username
        }
      }
      `
