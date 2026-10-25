import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; // 기존 인증/회원가입 라우터
import hostRoutes from './routes/host.js'; // 💡 새로 추가한 호스팅 등록 라우터
import path from 'path';
import { fileURLToPath } from 'url'; // 💡 import 추가

const __filename = fileURLToPath(import.meta.url); // 💡 추가
const __dirname = path.dirname(__filename);         // 💡 추가

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 연결
app.use('/api/auth', authRoutes); // 회원가입, 로그인 등
app.use('/api/host', hostRoutes); // 💡 숙소 등록 (/api/host/register)

// 기본 루트 엔드포인트
app.get('/', (req, res) => {
  res.send('Airbnb Backend Server is running...');
});


// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});