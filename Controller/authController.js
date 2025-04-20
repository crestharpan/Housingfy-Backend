const Admin = require('../Model/adminModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createNewToken = (admin, statusCode, res) => {
  const token = signToken(admin.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  admin.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      admin,
    },
  });
};

exports.adminCredentials = async (req, res) => {
  const { name, email, password } = req.body;
  const admin = await Admin.create({
    name,
    email,
    password,
  });
  res.status(200).json({
    status: 'success',
    data: admin,
  });
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Enter the credentails', 400));
  }
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return next(new AppError('Admin not found', 400));
  }

  //NEW TOKEN FOR LOGGED IN ADMIN
  createNewToken(admin, 201, res);
};

exports.protect = async (req, res, next) => {
  //1) Getting the token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) next(new AppError('You are not logged in', 401));
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currAdmin = await Admin.findById({ _id: decoded.id });
  if (!currAdmin) return next(new AppError('Invalid data', 400));
  req.admin = currAdmin;

  next();
};

exports.forgotPassword = async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return next(new AppError('No user found', 400));

  const resetToken = admin.createResetToken();
  await admin.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/V1/admin/resetPassword/${resetToken}`;
  const message = `Forgot your password, submit new password on the ${resetURL}`;

  try {
    await sendEmail({
      email: admin.email,
      subject: 'Your password reset token( valid for 10 mins)',
      message,
    });
    res.status('200').json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch {
    admin.PasswordResetToken = undefined;
    admin.PasswordResetExpires = undefined;
    await admin.save({ validateBeforeSave: false });
    return next(
      new AppError('Error while sending Email, Try again Later', 500)
    );
  }
};
exports.resetPassword = async (req, res, next) => {
  //1) GET USER BASED ON THE TOKEN
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  //RETURN USER ONLY AFTER MATCHING THE RESET-TOKEN AND IF DATE IS GREATER THAN PRESENT DATE
  const admin = await Admin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //2) IF TOKEN HAS NOT EXPIRED AND THERE IS USER, SET THE NEW PASSWORD
  if (!admin) return next(new AppError('Token is expired or is invalid', 400));
  admin.password = req.body.password;
  admin.passwordResetToken = undefined;
  admin.passwordResetExpires = undefined;

  await admin.save();

  //4)LOG THE USER IN AND SEND JWT
  createNewToken(admin, 200, res);
};

exports.getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: admin,
  });
};

exports.adminLogout = async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0), // Expire immediately
    httpOnly: true, // Prevent access via JavaScript
    secure: true, // Secure in production (HTTPS)
    sameSite: 'None', // Avoid CORS issues
  });
  res.status(200).json({
    status: 'success',
  });
};
