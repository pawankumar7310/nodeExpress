const express = require("express");
const server = express();
var jwt = require("jsonwebtoken");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
require("dotenv").config();

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE);

  console.log("DataBase connected");
}

//middleware
// body parser
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log("------->", token);
    var decode = jwt.verify(token, process.env.JWTSECRET);
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
server.use("/products", productRoutes.router);
server.use("/users", auth, userRoutes.router);
server.use("/", (req, resp) => {
  resp.send("hii I am pawan kumar");
});

server.listen(process.env.PORT, () => {
  console.log("server is running");
});
