var jwt = require("jsonwebtoken");
const model = require("../model/user");
const User = model.user;
const bcrypt = require("bcrypt");
require("dotenv").config();

//create products
exports.signUp = async (req, resp) => {
  try {
    const user = new User(req.body);
    var token = jwt.sign({ email: req.body.email }, process.env.JWTSECRET);
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash;
    const doc = await user.save();

    resp.status(201).json(doc);
  } catch (err) {
    console.log(err);
    resp.status(404).json(err);
  }
};

exports.login = async (req, resp) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, process.env.JWTSECRET);
      doc.token = token;
      const user = await doc.save();
      console.log({ user });
      resp.status(201).json({ token });
    } else {
      resp.sendStatus(401);
    }
  } catch (err) {
    resp.status(404).json("wrong credentials");
  }
};
