

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');

// const UserSchema = new Schema({
//  username: { type: String, required: true, unique: true },
//  email: { type: String, required: true, unique: true },
//  password: { type: String, required: true },
// });


// module.exports = mongoose.model('User', UserSchema);

// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  failedAttempts: { type: Number, default: 0 },
  lockTime: { type: Date, default: null }
});

// UserSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

module.exports = mongoose.model('User', UserSchema);