import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HostTypeSelect = () => {
  const navigate = useNavigate();

  const handleSelectType = (type) => {
    if (type === 'stay') {
      // 💡 기존 '/host/stay'에서 통합 등록 플로우인 '/host/setup'으로 수정
      navigate('/host/setup');
    } else if (type === 'experience') {
      navigate('/host/experience');
    } else if (type === 'service') {
      navigate('/host/service');
    }
  };

  return (
    <Container>
      <Title>원하시는 호스팅 유형을 선택하세요</Title>
      
      <CardGroup>
        {/* 1. 숙소 카드 */}
        <TypeCard onClick={() => handleSelectType('stay')}>
          <IconWrapper>
            <img 
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3e0.png" 
              alt="숙소" 
            />
          </IconWrapper>
          <CardText>숙소</CardText>
        </TypeCard>

        {/* 2. 체험 카드 */}
        <TypeCard onClick={() => handleSelectType('experience')}>
          <IconWrapper>
            <img 
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f388.png" 
              alt="체험" 
            />
          </IconWrapper>
          <CardText>체험</CardText>
        </TypeCard>

        {/* 3. 서비스 카드 */}
        <TypeCard onClick={() => handleSelectType('service')}>
          <IconWrapper>
            <img 
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f6ce.png" 
              alt="서비스" 
            />
          </IconWrapper>
          <CardText>서비스</CardText>
        </TypeCard>
      </CardGroup>
    </Container>
  );
};

export default HostTypeSelect;

/* ==========================================================================
   Styled Components
   ========================================================================== */

const Container = styled.div`
  max-width: 1080px;
  margin: 60px auto;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #222222;
  margin-bottom: 50px;
`;

const CardGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const TypeCard = styled.div`
  width: 280px;
  height: 320px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #222222;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  img {
    width: 72px;
    height: 72px;
    object-fit: contain;
  }
`;

const CardText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #222222;
`;