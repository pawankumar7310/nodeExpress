const express = require("express");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const authRoutes = require("./routes/auth");
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
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log("------->", token);
    var decode = jwt.verify(token, "shhhhh");
    if (decode.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
  }
};
server.use(cors());
server.use(express.json());

//router middleware

server.use("/auth", authRoutes.router);
server.use("/products", auth, productRoutes.router);
server.use("/users", auth, userRoutes.router);

server.listen(process.env.PORT, () => {
  console.log("server is running");
});
