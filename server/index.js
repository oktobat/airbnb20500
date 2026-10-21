import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';

// .env 환경 변수 불러오기
dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors()); // CORS 허용
app.use(express.json()); // 클라이언트가 보낸 JSON 데이터 해석

// 라우터 연결 (/api/auth 하위 경로 처리)
app.use('/api/auth', authRouter);

// 기본 테스트용 루트 경로
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// 서버 포트 설정 및 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 백엔드 서버 구동 중: http://localhost:${PORT}`);
});