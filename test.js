const { GraphQLServer, MockList } = require("graphql-yoga");
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const getMessages = () => [{
    id: 35,
    message: 'HELLO',
    senderMail: 'nat@gmail.com',
    receiverMail: "mel.liow@gmail.com",
    timestamp: 20190227
}]

const getUsers = () => [{
    id: 293,
    name: "Mel",
    email: "mel.liow@gmail.com",
}, {
    id: 2100,
    name: "Kieran",
    email: "kieranisdabest@gmail.com",
}]

const mocks = {
    Query: () => ({
        users: () => getUsers(),
        messages: () => getMessages()
    }),
    User: () => ({
        messages: (user) => getMessages()
    }),
    Message: () => ({
        users: (message) => getUsers()
    })
}

const server = new GraphQLServer({ typeDefs, resolvers: () => true, mocks })
server.start(() => console.log("test server starting up at localhost:4000"))