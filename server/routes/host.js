import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';     // 💡 확인
import db from '../db.js';

const router = express.Router();

// uploads 폴더가 없으면 자동 생성
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 💡 이미지 저장 위치 및 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // server/uploads/ 폴더에 저장
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 💡 숙소 등록 API (File Upload 포함)
router.post('/register-stay', upload.single('image'), async (req, res) => {
  const { userEmail, category, roomType, guests, bedrooms, beds } = req.body;
  // 파일이 업로드되었으면 경로 설정, 없으면 null
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const query = `
      INSERT INTO accommodations (user_email, category, room_type, guests, bedrooms, beds, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [
      userEmail, category, roomType, guests, bedrooms, beds, imageUrl
    ]);

    return res.status(201).json({
      message: '숙소와 사진이 성공적으로 등록되었습니다.',
      accommodationId: result.insertId,
    });
  } catch (error) {
    console.error('숙소 등록 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;