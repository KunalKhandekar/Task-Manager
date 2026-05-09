import { validationResult } from 'express-validator';
import * as authService from '../services/auth.service.js';

const COOKIE_NAME = 'token';

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { user, token } = await authService.signup(req.body);

    res
      .cookie(COOKIE_NAME, token, cookieOptions())
      .status(201)
      .json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { user, token } = await authService.login(req.body);

    res
      .cookie(COOKIE_NAME, token, cookieOptions())
      .status(200)
      .json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

const logout = (_req, res) => {
  res
    .clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'strict' })
    .status(200)
    .json({ success: true, message: 'Logged out successfully' });
};

const me = (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
};

export { signup, login, logout, me };
