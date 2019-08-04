const { PubSub, GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const { DB_URL } = process.env;
console.log(DB_URL)

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});