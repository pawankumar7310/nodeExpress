var jwt = require("jsonwebtoken");
const model = require("../model/user");
const User = model.user;
const bcrypt = require("bcrypt");

//create products
exports.signUp = async (req, resp) => {
  try {
    const user = new User(req.body);
    var token = jwt.sign({ email: req.body.email }, "shhhhh");
    const hash = bcrypt.hashSync(req.body.password, 10);
    user.token = token;
    user.password = hash;
    const doc = await user.save();
    console.log({ doc });
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
      var token = jwt.sign({ email: req.body.email }, "shhhhh");
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
