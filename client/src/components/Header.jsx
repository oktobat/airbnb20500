import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbBrandAirbnb } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { 
  FiMenu, 
  FiGlobe, 
  FiHelpCircle, 
  FiHeart, 
  FiMessageSquare, 
  FiUser, 
  FiBell, 
  FiSettings 
} from "react-icons/fi";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHostMode, setIsHostMode] = useState(false); // 호스트/게스트 모드 토글 상태
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 로그인 상태 체크
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('유저 정보 파싱 오류:', e);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // 💡 핵심: 호스팅 하기 클릭 핸들러
  const handleHostClick = () => {
    if (!user) {
      // 1. 비로그인 상태: 로그인 페이지로 이동
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      // 2. 로그인 상태: "게스트모드로 전환" <-> "호스트모드로 전환" 토글
      setIsHostMode((prev) => !prev);
      if (!isHostMode) {
        navigate('/host'); // 호스트 페이지로 이동
      } else {
        navigate('/'); // 메인(게스트) 페이지로 이동
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsHostMode(false);
    setIsMenuOpen(false);
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

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
          {/* 💡 로그인 여부 및 모드 상태에 따른 버튼 문구 변경 */}
          <HostButton onClick={handleHostClick}>
            {user ? (isHostMode ? '게스트모드로 전환' : '호스트 모드로 전환') : '호스팅 하기'}
          </HostButton>

          {/* 로그인 상태에 따른 프로필/아바타 처리 */}
          {user ? (
            <AvatarCircle title={user.name}>
              {user.name ? user.name.slice(0, 2) : '회원'}
            </AvatarCircle>
          ) : (
            <IconButton>
              <Link to="/login" title="로그인">
                <FaRegUserCircle />
              </Link>
            </IconButton>
          )}

          {/* 햄버거 버튼 & 드롭다운 메뉴 */}
          <MenuContainer ref={menuRef}>
            <IconButton onClick={toggleMenu} className={isMenuOpen ? 'active' : ''}>
              <FiMenu />
            </IconButton>

            {isMenuOpen && (
              <DropdownMenu>
                {user ? (
                  /* 로그인 시 드롭다운 메뉴 */
                  <>
                    <MenuItem onClick={() => setIsMenuOpen(false)} className="bold">
                      <FiHeart className="icon" /> 위시리스트
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <TbBrandAirbnb className="icon" /> 여행
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <FiMessageSquare className="icon" /> 메시지
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <FiUser className="icon" /> 프로필
                    </MenuItem>

                    <Divider />

                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <FiBell className="icon" /> 알림
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <FiSettings className="icon" /> 계정 관리
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <FiGlobe className="icon" /> 언어 및 통화
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <FiHelpCircle className="icon" /> 도움말 센터
                    </MenuItem>

                    <Divider />

                    <HostCardLink to="/host" onClick={() => setIsMenuOpen(false)}>
                      <div className="text-group">
                        <strong>호스팅 하기</strong>
                        <p>간단하게 호스팅을 시작하고 부수입을 올릴 수 있습니다.</p>
                      </div>
                    </HostCardLink>

                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      호스트 추천하기
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      공동 호스트 찾기
                    </MenuItem>

                    <Divider />

                    <MenuItem onClick={handleLogout} className="logout-btn">
                      로그아웃
                    </MenuItem>
                  </>
                ) : (
                  /* 비로그인 시 드롭다운 메뉴 */
                  <>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <FiGlobe className="icon" /> 언어 및 통화
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      <FiHelpCircle className="icon" /> 도움말 센터
                    </MenuItem>

                    <Divider />

                    <HostCardLink to="/host" onClick={() => setIsMenuOpen(false)}>
                      <div className="text-group">
                        <strong>호스팅 하기</strong>
                        <p>간단하게 호스팅을 시작하고 부수입을 올릴 수 있습니다.</p>
                      </div>
                    </HostCardLink>

                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      호스트 추천하기
                    </MenuItem>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                      공동 호스트 찾기
                    </MenuItem>

                    <Divider />

                    <MenuItem 
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/login');
                      }} 
                      className="bold"
                    >
                      로그인 또는 회원 가입
                    </MenuItem>
                  </>
                )}
              </DropdownMenu>
            )}
          </MenuContainer>
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
  border-bottom: 1px solid #ebebeb;
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
  align-items: center;
  gap: 8px;
`;

/* 호스팅/모드 전환 버튼 스타일 (button태그로 변경) */
const HostButton = styled.button`
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #222222;
  background: transparent;
  border: none;
  border-radius: 22px;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const AvatarCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #e8f0fe;
  color: #1a73e8;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background-color: #f2f2f2;
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
    color: #222;
  }

  &:hover, &.active {
    background-color: #e0e0e0;
  }
`;

const MenuContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 250px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  padding: 8px 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #222;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    font-size: 18px;
    color: #484848;
  }

  &.bold {
    font-weight: 600;
  }

  &.logout-btn {
    color: #222;
    &:hover {
      background-color: #f7f7f7;
    }
  }

  &:hover {
    background-color: #f7f7f7;
  }
`;

const HostCardLink = styled(Link)`
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text-group {
    strong {
      display: block;
      font-size: 14px;
      color: #222;
      margin-bottom: 2px;
    }
    p {
      font-size: 12px;
      color: #717171;
      line-height: 1.3;
      margin: 0;
    }
  }

  &:hover {
    background-color: #f7f7f7;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #eeeeee;
  margin: 6px 0;
`;