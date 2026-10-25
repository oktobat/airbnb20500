import styled from 'styled-components';
import { 
  TbHome, 
  TbBuildingSkyscraper, 
  TbHome2, 
  TbCoffee, 
  TbTree, 
  TbSailboat, 
  TbWood, 
  TbCaravan, 
  TbBuildingBridge, 
  TbBuildingCastle, 
  TbMountain, 
  TbContainer 
} from 'react-icons/tb';

const ACCOMMODATION_TYPES = [
  { id: 'house', label: '주택 또는 한옥', icon: <TbHome /> },
  { id: 'apartment', label: '아파트', icon: <TbBuildingSkyscraper /> },
  { id: 'barn', label: '헛간', icon: <TbHome2 /> },
  { id: 'bnb', label: 'B&B', icon: <TbCoffee /> },
  { id: 'pension', label: '펜션 (독채, 감성숙소 등)', icon: <TbTree /> },
  { id: 'boat', label: '보트', icon: <TbSailboat /> },
  { id: 'cabin', label: '통나무집', icon: <TbWood /> },
  { id: 'camper', label: '캠핑카', icon: <TbCaravan /> },
  { id: 'casa', label: '카사 파르티쿨라르', icon: <TbBuildingBridge /> },
  { id: 'castle', label: '캐슬', icon: <TbBuildingCastle /> },
  { id: 'cave', label: '동굴', icon: <TbMountain /> },
  { id: 'container', label: '컨테이너하우스', icon: <TbContainer /> },
];

// 💡 props로 selectedType과 setSelectedType을 받아옵니다.
const HostSetupStay = ({ selectedType, setSelectedType }) => {
  return (
    <Container>
      <Title>다음 중 숙소를 가장 잘 설명하는 것은 무엇인가요?</Title>

      <GridGroup>
        {ACCOMMODATION_TYPES.map((type) => (
          <TypeCard
            key={type.id}
            className={selectedType === type.id ? 'selected' : ''}
            onClick={() => setSelectedType(type.id)}
          >
            <IconBox>{type.icon}</IconBox>
            <Label>{type.label}</Label>
          </TypeCard>
        ))}
      </GridGroup>
    </Container>
  );
};

export default HostSetupStay;

/* (Styled Components는 기존과 동일) */
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #222222;
  margin-bottom: 40px;
`;

const GridGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const TypeCard = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  cursor: pointer;
  background-color: #ffffff;

  &:hover { border-color: #222222; }

  &.selected {
    border: 2px solid #222222;
    background-color: #f7f7f7;
  }
`;

const IconBox = styled.div` font-size: 36px; color: #222222; margin-bottom: 12px; `;
const Label = styled.span` font-size: 16px; font-weight: 600; color: #222222; `;