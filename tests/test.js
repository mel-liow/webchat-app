const { GraphQLServer, MockList } = require("graphql-yoga");
const typeDefs = require('../server/typeDefs');
const resolvers = require('../server/resolvers');

const getMessages = () => [{
    id: 35,
    message: 'HELLO',
    senderMail: 'kieran@gmail.com',
    receiverMail: "mel@gmail.com",
    timestamp: 20190227
},
{
    id: 36,
    message: 'yo whatsupp',
    senderMail: 'kieran@gmail.com',
    receiverMail: "mel@gmail.com",
    timestamp: 20190230
},
{
    id: 37,
    message: 'hi',
    senderMail: 'mel@gmail.com',
    receiverMail: "kieran@gmail.com",
    timestamp: 20191004
}]

const getUsers = () => [{
    id: 293,
    name: "Mel",
    email: "mel@gmail.com",
}, {
    id: 2100,
    name: "Kieran",
    email: "kieran@gmail.com",
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