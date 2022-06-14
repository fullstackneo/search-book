import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation (
    $description: String
    $bookId: String!
    $title: String!
    $authors: [String]
    $image: String
    $link: String
  ) {
    saveBook(
      description: $description
      bookId: $bookId
      title: $title
      authors: $authors
      image: $image
      link: $link
    ) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation ($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      savedBooks {
        description
        bookId
      }
      username
    }
  }
`;
