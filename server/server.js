const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');



const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // This ensures that every request performs an authentication check, and the updated request object will be passed to the resolvers as the context.
  // context: ({ req }) => req.headers
  // context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);

      // log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);