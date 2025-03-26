const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'A email is required'],
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    minlength: [6, 'The password must be greater than 7 characters'],
    maxlength: [11, 'The password must be less than 11 characters'],
    upperCase: true,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

adminSchema.pre('save', async function (next) {
  //CHECK IF PASSWORD IS ODIFIED OR NOT
  if (!this.isModified('password')) return;

  //ENCRYPT THE PASSWORD
  this.password = await bcrypt.hash(this.password, 12); //hash is async so it returns promise
  next();
});

//INSTANCE METHOD TO CHECK IF PASSWORD IS CORRECT
adminSchema.methods.correctPassword = async function (
  candidatePassword,
  adminPassword
) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

adminSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(36).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
