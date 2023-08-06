const model = require("../model/user");
const User = model.user;

//create products
exports.createUser = async (req, resp) => {
  try {
    const user = new User(req.body);
    const doc = await user.save();
    console.log({ doc });
    resp.status(201).json(doc);
  } catch (err) {
    console.log(err);
    resp.status(404).json(err);
  }
};

//read all
exports.getAllUser = async (req, resp) => {
  const user = await User.find();
  resp.status(200).json(user);
};

//read one
exports.getUser = async (req, resp) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    resp.status(200).json(user);
  } catch (error) {
    console.log(error);
    resp.status(404).json("wrong id ");
  }
};

//PUT update
exports.replaceUser = async (req, resp) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    resp.status(200).json(doc);
  } catch (error) {
    resp.status(404).json(error);
  }
};

// PATCH update
exports.updateUser = async (req, resp) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    resp.status(201).json(doc);
  } catch (error) {
    resp.status(404).json(error);
  }
};

//delete
exports.deleteUser = async (req, resp) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndDelete({ _id: id });
    resp.status(200).json(doc);
  } catch (error) {
    resp.status(404).json(error);
  }
};
