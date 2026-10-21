import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

// 1. 로그인 또는 회원가입 이동 판별 API
router.post('/login-or-signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM members WHERE email = ?', [email]);

    // 신규 회원인 경우
    if (rows.length === 0) {
      return res.json({
        action: 'SIGNUP_REQUIRED',
        message: '등록되지 않은 이메일입니다. 회원가입 페이지로 이동합니다.'
      });
    }

    // 기존 회원인 경우 -> 비밀번호 검증
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        action: 'WRONG_PASSWORD',
        message: '비밀번호가 올바르지 않습니다.'
      });
    }

    // JWT 토큰 발급
    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '1h' }
    );

    return res.json({
      action: 'LOGIN_SUCCESS',
      message: '로그인에 성공하였습니다.',
      token,
      user: { email: user.email, name: user.name }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 2. 실제 회원가입 처리 API
router.post('/signup', async (req, res) => {
  const { email, password, name, birth_date } = req.body;

  try {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB에 사용자 저장
    await db.query(
      'INSERT INTO members (email, password, name, birth_date) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, birth_date]
    );

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '회원가입 처리 중 오류가 발생했습니다.' });
  }
});

export default router;