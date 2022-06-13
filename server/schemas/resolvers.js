const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    user: async (parent, args) => {
      return User.findOne({
        $or: [{ _id: args.id }, { username: args.username }],
      }).populate('savedBooks');
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('incorrect credentials');
      }
      return user;
    },
    
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { id: context.user.id },
          { $addToSet: { savedBooks: args.bookId } },
          { new: true }
        ).populate('savedBooks');
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;
