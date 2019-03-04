const mongoose = require("mongoose");
const bcrypt = require("bcrypt-node");
const Schema = mongoose.Schema;

let adminSchema = Schema({
  email: { type: String, unique: true, lowercase: true },
  username: String,
  pass: { type: String, select: false },
  lastlogin: Schema.Types.Date
});

adminSchema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("pass")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();

    bcrypt.hash(user.pass, salt, null, (err, hash) => {
      if (err) return next(err);

      user.pass = hash;
      next();
    });
  });
});

module.exports = mongoose.model("Admin", adminSchema);
