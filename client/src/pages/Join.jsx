import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { TbBrandAirbnb } from "react-icons/tb";

const Join = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Login.jsx에서 넘겨받은 state 데이터 (이메일, 비밀번호)
  const initialEmail = location.state?.email || '';
  const initialPassword = location.state?.password || '';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/signup', {
        email,
        password,
        name,
        birth_date: birthDate
      });

      alert(res.data.message || '회원가입이 완료되었습니다!');
      navigate('/'); // 가입 완료 후 메인/로그인 페이지로 이동
    } catch (err) {
      alert(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <JoinBlock>
      <CardContainer>
        {/* 로고 & 타이틀 */}
        <SignupTitle>
          <LogoIcon />
          <Title>회원가입 완료하기</Title>
          <Subtitle>에어비앤비 계정을 만들기 위해 기본 정보를 입력하세요.</Subtitle>
        </SignupTitle>

        {/* 회원가입 폼 */}
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            {/* 이메일 (고정) */}
            <InputGroup>
              <Label>이메일</Label>
              <StyledInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            {/* 비밀번호 */}
            <InputGroup>
              <Label>비밀번호</Label>
              <StyledInput
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>

            {/* 이름 */}
            <InputGroup>
              <Label>이름</Label>
              <StyledInput
                type="text"
                placeholder="이름 (예: 홍길동)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>

            {/* 생년월일 */}
            <InputGroup>
              <Label>생년월일</Label>
              <StyledInput
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </InputGroup>
          </InputWrapper>

          <SubmitButton type="submit">가입 및 동의</SubmitButton>
        </Form>
      </CardContainer>
    </JoinBlock>
  );
};

export default Join;

/* ==========================================================================
   Styled Components (Login.jsx 디자인 테마 연동)
   ========================================================================== */

const JoinBlock = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  padding: 20px;
  box-sizing: border-box;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 28px;
  padding: 40px 32px 36px 32px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const SignupTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 24px;
  text-align: center;
`;

const LogoIcon = styled(TbBrandAirbnb)`
  color: #ff385c;
  font-size: 56px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #222222;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #717171;
  margin: 0;
  line-height: 1.4;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #222222;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  font-size: 15px;
  color: #222222;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border: 2px solid #222222;
  }

  &::placeholder {
    color: #b0b0b0;
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #717171;
    cursor: not-allowed;
    border-color: #e0e0e0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #e00b41;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 8px;

  &:hover {
    background-color: #d70466;
  }
`;