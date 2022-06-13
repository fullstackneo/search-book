const { User } = require('../models');
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
  },
};

module.exports = resolvers;
