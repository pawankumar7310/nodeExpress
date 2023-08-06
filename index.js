const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://pawanNcr:${process.env.Password}@cluster0.7gklnbm.mongodb.net/ecommerce`
  );

  console.log("DataBase connected");
}

//middleware
// body parser

server.use(cors());
server.use(express.json());

//router middleware
server.use("/products", productRoutes.router);
server.use("/users", userRoutes.router);

server.listen(process.env.PORT, () => {
  console.log("server is running");
});
