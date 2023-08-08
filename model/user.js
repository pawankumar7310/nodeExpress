const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fname: { type: String },
  lname: { type: String },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email !`,
    },
    required: true,
  },
  gender: { type: String },
  password: { type: String, minLength: 6 },
  token: String,
});
exports.user = mongoose.model("user", userSchema);
