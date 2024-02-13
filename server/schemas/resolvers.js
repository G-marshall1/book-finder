const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
    },
  },

  Mutation: {
    createUser: async (parent, args, context) => {
      const user = await User.create(args);
  
      if (!user) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return ({ token, user });
    },
    login: async (parent, args, context) => {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }
  
      const correctPw = await user.isCorrectPassword(args.password);
  
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return ({ token, user });
    },
    saveBook: async (parent, args, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return (updatedUser);
      } catch (err) {
        console.log(err);
        throw AuthenticationError;
      }
    },
    deleteBook: async (parent, args, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw AuthenticationError;
      }
      return (updatedUser);
    },
  }
};

module.exports = resolvers;
