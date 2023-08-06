const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fname: { type: String },
  lname: { type: String },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email !`,
    },
  },
  gender: { type: String },
  password: { type: String, min: [8, "min length"], max: [16, "max length"] },
});
exports.user = mongoose.model("user", userSchema);
