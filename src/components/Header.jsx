import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { TbBrandAirbnb } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 유저 정보 불러오기
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('유저 정보 파싱 오류:', e);
      }
    }
  }, []);

  return (
    <HeaderBlock>
      <div className="row">
        <h1><Link to="/"><TbBrandAirbnb /></Link></h1>
        <nav>
          <ul className="depth1">
            <li>전체</li>
            <li>숙소</li>
            <li>체험</li>
            <li>서비스</li>
          </ul>
        </nav>
        <NavWrapper>
          <HostLink to="/host">호스팅하기</HostLink>

          {/* 로그인 상태별 분기 */}
          {user ? (
            <UserProfileLink to="/profile" title="회원정보 수정">
              <UserName>{user.name} 님</UserName>
            </UserProfileLink>
          ) : (
            <IconButton>
              <Link to="/login" title="로그인">
                <FaRegUserCircle />
              </Link>
            </IconButton>
          )}

          <IconButton>
            <FiMenu />
          </IconButton>
        </NavWrapper>
      </div>
    </HeaderBlock>
  );
};

export default Header;

/* ==========================================================================
   Styled Components
   ========================================================================== */

const HeaderBlock = styled.header`
  padding: 20px 0;
  .row { 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    h1 { font-size: 50px; color: red; }
    nav { .depth1 { display: flex; li { margin: 0 10px; } } }
  }
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 8px; /* 요소 간 간격 */
`;

/* 1. 호스팅하기 텍스트 스타일 */
const HostLink = styled(Link)`
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #222222;
  text-decoration: none;
  border-radius: 22px;

  &:hover {
    background-color: #f7f7f7;
  }
`;

/* 2. 로그인 안 했을 때 / 메뉴용 동그라미 아이콘 버튼 */
const IconButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #eee;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    text-decoration: none;
  }

  svg {
    font-size: 22px;
    display: block;
  }

  &:hover {
    background-color: #e0e0e0;
  }
`;

/* 3. 로그인 후 유저 이름용 알약형(Pill) 버튼 */
const UserProfileLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 16px;
  background-color: #eee;
  border-radius: 21px; /* 높이의 절반으로 라운딩 */
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #222222;
  white-space: nowrap; /* 이름 줄바꿈 방지 */
`;