import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiCamera, FiX } from 'react-icons/fi';

const HostSetupImage = ({ imageFile, setImageFile }) => {
  const [previewUrl, setPreviewUrl] = useState(
    imageFile ? URL.createObjectURL(imageFile) : null
  );
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 기존 미리보기 URL 메모리 해제
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // 메모리 해제
    }
    setImageFile(null);
    setPreviewUrl(null);

    // input value 초기화 (같은 파일 다시 선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Container>
      <Title>숙소 사진을 추가하세요</Title>
      <SubTitle>게스트가 숙소의 분위기를 파악할 수 있도록 근사한 사진을 올려주세요.</SubTitle>

      <UploadArea>
        {previewUrl ? (
          <PreviewBox>
            <img src={previewUrl} alt="숙소 미리보기" />
            <RemoveButton type="button" onClick={handleRemoveImage}>
              <FiX />
            </RemoveButton>
          </PreviewBox>
        ) : (
          <UploadLabel>
            <FiCamera className="icon" />
            <span>사진 업로드하기</span>
            <FileInput 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </UploadLabel>
        )}
      </UploadArea>
    </Container>
  );
};

export default HostSetupImage;

/* ==========================================================================
   Styled Components
   ========================================================================== */

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #222222;
  margin-bottom: 12px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #717171;
  margin-bottom: 32px;
`;

const UploadArea = styled.div`
  width: 100%;
  height: 320px;
  border: 2px dashed #b0b0b0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #222222;
  }
`;

const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  .icon {
    font-size: 48px;
    color: #484848;
  }

  span {
    font-size: 16px;
    font-weight: 600;
    color: #222222;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const PreviewBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;