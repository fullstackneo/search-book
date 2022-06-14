import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    user {
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
