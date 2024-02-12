import { gql } from '@apollo/client';

export const GET_USER = gql`
query Query {
    getSingleUser {
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
`