import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};


const signup = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token,
  };
};


const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const token = generateToken(user._id);

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token,
  };
};

export { signup, login, generateToken };
