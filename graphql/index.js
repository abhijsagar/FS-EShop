const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "../.env",
  });
}

// connect db
connectDatabase();

//graphql config
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


// create server
const server = app.listen(process.env.GRAPHQL_PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.GRAPHQL_PORT}`
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
