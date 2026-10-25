import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HostSetupStay from './HostSetupStay';
import HostSetupRoomType from './HostSetupRoomType';
import HostSetupDetails from './HostSetupDetails';
import HostSetupImage from './HostSetupImage'; // 💡 추가

const HostSetupFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 💡 1~4단계

  const [formData, setFormData] = useState({
    category: 'apartment',
    roomType: 'entire',
    guests: 2,
    bedrooms: 1,
    beds: 1,
  });
  const [imageFile, setImageFile] = useState(null); // 💡 이미지 파일 상태

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // 💡 4단계: FormData 생성하여 제출
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const user = JSON.parse(storedUser);

      // FormData 객체에 텍스트 및 파일 데이터 추가
      const data = new FormData();
      data.append('userEmail', user.email);
      data.append('category', formData.category);
      data.append('roomType', formData.roomType);
      data.append('guests', formData.guests);
      data.append('bedrooms', formData.bedrooms);
      data.append('beds', formData.beds);
      if (imageFile) {
        data.append('image', imageFile); // 'image' 필드명으로 파일 첨부
      }

      try {
        const response = await fetch('http://localhost:5000/api/host/register-stay', {
          method: 'POST',
          body: data, // Headers에 Content-Type을 지정하지 않음 (FormData가 자동 처리)
        });

        const result = await response.json();

        if (response.ok) {
          alert('숙소 등록이 완료되었습니다!');
          navigate('/');
        } else {
          alert(result.message || '등록 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('등록 요청 에러:', error);
        alert('서버 통신 실패');
      }
    }
  };

  return (
    <FlowContainer>
      <ProgressBar style={{ width: `${(step / 4) * 100}%` }} />

      <StepContent>
        {step === 1 && (
          <HostSetupStay
            selectedType={formData.category}
            setSelectedType={(val) => updateFormData('category', val)}
          />
        )}
        {step === 2 && (
          <HostSetupRoomType
            selectedRoomType={formData.roomType}
            setSelectedRoomType={(val) => updateFormData('roomType', val)}
          />
        )}
        {step === 3 && (
          <HostSetupDetails
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {step === 4 && (
          <HostSetupImage
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
        )}
      </StepContent>

      <FooterBar>
        <BackButton onClick={handlePrev} disabled={step === 1}>
          뒤로
        </BackButton>
        <NextButton onClick={handleNext}>
          {step === 4 ? '등록하기' : '다음'}
        </NextButton>
      </FooterBar>
    </FlowContainer>
  );
};

export default HostSetupFlow;

/* ==========================================================================
   Styled Components
   ========================================================================== */

const FlowContainer = styled.div`
  min-height: calc(100vh - 80px);
  padding-bottom: 90px;
  position: relative;
`;

const ProgressBar = styled.div`
  height: 4px;
  background-color: #222222;
  transition: width 0.3s ease;
`;

const StepContent = styled.div`
  padding: 20px;
`;

const FooterBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;

  &:disabled {
    color: #cccccc;
    text-decoration: none;
    cursor: not-allowed;
  }
`;

const NextButton = styled.button`
  padding: 14px 32px;
  background-color: #222222;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #000000;
  }
`;