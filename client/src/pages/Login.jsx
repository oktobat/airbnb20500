import {useState } from 'react';
import {useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import { TbBrandAirbnb } from "react-icons/tb";
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('/api/auth/login-or-signup', { email, password });
    const { action, message, token, user } = res.data; // 🔥 user 추가

    if (action === 'LOGIN_SUCCESS') {
      // 토큰과 유저 정보를 함께 저장합니다.
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // 🔥 유저 정보 저장 필수!

      alert(message);
      
      // 메인 페이지로 이동하면서 페이지를 새로고침하여 Header 상태를 갱신
      window.location.href = '/'; 
      // 또는 navigate('/')를 쓰려면 아래 2번 항목을 적용해야 합니다.
    } else if (action === 'SIGNUP_REQUIRED') {
      alert(message);
      navigate('/signup', { state: { email, password } });
    }
  } catch (err) {
    alert(err.response?.data?.message || '요청 처리 중 오류가 발생했습니다.');
  }
};


  return (
        <LoginBlock>
          <CardContainer>
            {/* 로고 & 타이틀 */}
            <LoginTitle>
              <LogoIcon />
              <Title>로그인 또는 회원 가입</Title>
            </LoginTitle>

            {/* 입력 폼 */}
            <Form onSubmit={handleSubmit}>
              <InputWrapper>
                <StyledInput
                  type="text"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <StyledInput
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputWrapper>

              <SubmitButton type="submit">계속</SubmitButton>
            </Form>

            {/* 구분선 (또는) */}
            <Divider>
              <span>또는</span>
            </Divider>

            {/* 리액트 아이콘은 color와 size 등 속성을 사용하여 스타일 직접 지정 가능 */}
            <SocialContainer>
              <SocialButton title="네이버 로그인" type="button">
                <SiNaver color="#03C75A" size={18} />
              </SocialButton>
              <SocialButton title="구글 로그인" type="button">
                <FcGoogle size={24} />
              </SocialButton>
              <SocialButton title="애플 로그인" type="button">
                <FaApple color="#000" size={24} />
              </SocialButton>
            </SocialContainer>
          </CardContainer>
        </LoginBlock>
  )
}

export default Login;


const LoginBlock = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7; /* 전체 페이지 배경색 */
  padding: 20px;
  box-sizing: border-box;
`

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


const LoginTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const LogoIcon = styled(TbBrandAirbnb)`
  color: #ff385c;
  font-size: 64px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #222222;
  margin: 0;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  font-size: 16px;
  color: #222222;
  box-sizing: border-box;
  outline: none;
  margin-bottom:10px;

  &:focus {
    border: 2px solid #222222;
  }

  &::placeholder {
    color: #717171;
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

  &:hover {
    background-color: #d70466;
  }
`;

const Divider = styled.div`
  width: 100%;
  margin: 28px 0;
  border-bottom: 1px solid #e0e0e0;
  line-height: 0.1em;
  text-align: center;

  span {
    background: #ffffff;
    padding: 0 16px;
    color: #717171;
    font-size: 13px;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const SocialButton = styled.button`
  width: 72px;
  height: 64px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #222222;
    background-color: #f7f7f7;
  }
`;
