const { PubSub, withFilter } = require("graphql-yoga");
const { User, Message } = require("./models");

const pubsub = new PubSub();


//TODO: make pubsub controller, change pubish messages to constants
const resolvers = {
	Query: {
		users: () => User.find(),
		messages: () => Message.find()
	},

	//Find messages by user email
	User: {
		messages: async ({ email }) => {
			return Message.find({
				senderMail: email
			});
		}
	},

	//Find sender email of message
	Message: {
		users: async ({ senderMail }) => {
			return User.find({
				email: senderMail
			});
		}
	},

	Mutation: {
		createUser: async (_, { name, email }) => {
			const user = new User({ name, email });
			await user.save();

			pubsub.publish("newUser", {
				newUser: user
			});
			return user;
		},
		updateUser: async (_, { name, email }) => {
			const user = await User.findOneAndUpdate(
				{ _id: id },
				{ name },
				{ new: true }
			);
			return user;
		},
		deleteUser: async (_, { name, email }) => {
			await Promise.all([
				User.findOneAndDelete({ email: email }),
				Message.deleteMany({ senderMail: email })
			]);
			pubsub.publish("oldUser", { oldUser: email });
			return true;
		},
		deleteAllUsers: async (_, { name, email }) => {
			await User.remove({})
			return true;
		},
		userTyping: (_, { email, receiverMail }) => {
			pubsub.publish("userTyping", { userTyping: email, receiverMail });
			return true;
		},
		createMessage: async (_, { message, senderMail, receiverMail, timestamp }) => {
			const userText = new Message({ message, senderMail, receiverMail, timestamp })
			await userText.save();

			pubsub.publish("newMessage", {
				newMessage: userText,
				receiverMail: receiverMail
			})
			return userText
		},
		updateMessage: async (_, { message, id }) => {
			const userText = await Message.findOneAndUpdate(
				{ _id: id },
				{ message },
				{ new: true }
			)
			return userText
		},
		deleteMessage: async (_, { id }) => {
			await Message.findOneAndDelete({ _id: id })
		},
		deleteAllMessages: async (_, { }) => {
			console.log('REMOVING')
			await Message.remove({})
			return true;
		},
	},


	Subscription: {
		newMessage: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("newMessage"),
				(payload, variables) => {
					return payload.receiverMail === variables.receiverMail;
				}
			)
		},
		newUser: {
			subscribe: (_, { }, { pubsub }) => {
				return pubsub.asyncIterator("newUser");
			}
		},
		oldUser: {
			subscribe: (_, { }, { pubsub }) => {
				return pubsub.asyncIterator("oldUser");
			}
		},
		userTyping: {
			subscribe: withFilter(
				() => pubsub.asyncIterator("userTyping"),
				(payload, variables) => {
					return payload.receiverMail === variables.receiverMail;
				}
			)
		}
	}
};

module.exports = resolvers;