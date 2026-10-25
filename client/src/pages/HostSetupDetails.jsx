import styled from 'styled-components';
import { FiMinus, FiPlus } from 'react-icons/fi';

// 💡 props 받기
const HostSetupDetails = ({ formData, updateFormData }) => {
  const { guests, bedrooms, beds } = formData;

  const handleQuantity = (key, value, delta, min = 1) => {
    const newValue = value + delta;
    if (newValue >= min) {
      updateFormData(key, newValue);
    }
  };

  return (
    <Container>
      <Title>기본 사항 작성하기</Title>
      <SubTitle>숙박 가능한 인원은 몇 명인가요?</SubTitle>

      <CounterList>
        {/* 게스트 */}
        <CounterRow>
          <Label>게스트</Label>
          <CounterControls>
            <CounterButton 
              onClick={() => handleQuantity('guests', guests, -1, 1)} 
              disabled={guests <= 1}
            >
              <FiMinus />
            </CounterButton>
            <Value>{guests}</Value>
            <CounterButton onClick={() => handleQuantity('guests', guests, 1)}>
              <FiPlus />
            </CounterButton>
          </CounterControls>
        </CounterRow>

        {/* 침실 */}
        <CounterRow>
          <Label>침실</Label>
          <CounterControls>
            <CounterButton 
              onClick={() => handleQuantity('bedrooms', bedrooms, -1, 1)} 
              disabled={bedrooms <= 1}
            >
              <FiMinus />
            </CounterButton>
            <Value>{bedrooms}</Value>
            <CounterButton onClick={() => handleQuantity('bedrooms', bedrooms, 1)}>
              <FiPlus />
            </CounterButton>
          </CounterControls>
        </CounterRow>

        {/* 침대 */}
        <CounterRow>
          <Label>침대</Label>
          <CounterControls>
            <CounterButton 
              onClick={() => handleQuantity('beds', beds, -1, 1)} 
              disabled={beds <= 1}
            >
              <FiMinus />
            </CounterButton>
            <Value>{beds}</Value>
            <CounterButton onClick={() => handleQuantity('beds', beds, 1)}>
              <FiPlus />
            </CounterButton>
          </CounterControls>
        </CounterRow>
      </CounterList>
    </Container>
  );
};

export default HostSetupDetails;

/* (Styled Components는 기존과 동일) */
const Container = styled.div` max-width: 600px; margin: 40px auto; padding: 0 20px; `;
const Title = styled.h2` font-size: 32px; font-weight: 700; color: #222222; margin-bottom: 24px; `;
const SubTitle = styled.h3` font-size: 18px; font-weight: 600; color: #222222; margin-bottom: 40px; `;
const CounterList = styled.div` display: flex; flex-direction: column; `;
const CounterRow = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 0; border-bottom: 1px solid #f0f0f0;
`;
const Label = styled.span` font-size: 18px; font-weight: 500; color: #222222; `;
const CounterControls = styled.div` display: flex; align-items: center; gap: 16px; `;
const CounterButton = styled.button`
  width: 36px; height: 36px; border-radius: 50%; border: 1px solid #b0b0b0;
  background-color: #ffffff; display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  &:hover:not(:disabled) { border-color: #222222; }
  &:disabled { border-color: #e0e0e0; color: #e0e0e0; cursor: not-allowed; }
`;
const Value = styled.span` font-size: 16px; font-weight: 600; color: #222222; min-width: 20px; text-align: center; `;