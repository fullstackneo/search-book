const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Book {
    _id: ID
    anthors: String
    description: String
    bookID: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Query {
    user(_id: ID, username: String): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
  }
`;
// export the typeDefs
module.exports = typeDefs;
