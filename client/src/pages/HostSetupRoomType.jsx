import styled from 'styled-components';
import { TbHome, TbDoor, TbHome2 } from 'react-icons/tb';

const ROOM_TYPES = [
  {
    id: 'entire',
    title: '공간 전체',
    description: '게스트가 숙소 전체를 단독으로 사용합니다.',
    icon: <TbHome />,
  },
  {
    id: 'private',
    title: '방',
    description: '단독으로 사용하는 개인실이 있고, 공용 공간도 있는 형태입니다.',
    icon: <TbDoor />,
  },
  {
    id: 'shared',
    title: '호스텔 내 다인실',
    description: '게스트는 연중무휴 직원이 상주하는 전문 숙박시설인 호스텔 내부 다인실에서 머뭅니다.',
    icon: <TbHome2 />,
  },
];

// 💡 props 받기
const HostSetupRoomType = ({ selectedRoomType, setSelectedRoomType }) => {
  return (
    <Container>
      <Title>게스트가 사용할 숙소 유형</Title>

      <CardGroup>
        {ROOM_TYPES.map((item) => (
          <TypeCard
            key={item.id}
            className={selectedRoomType === item.id ? 'selected' : ''}
            onClick={() => setSelectedRoomType(item.id)}
          >
            <TextGroup>
              <CardTitle>{item.title}</CardTitle>
              <CardDesc>{item.description}</CardDesc>
            </TextGroup>
            <IconBox>{item.icon}</IconBox>
          </TypeCard>
        ))}
      </CardGroup>
    </Container>
  );
};

export default HostSetupRoomType;

/* (Styled Components는 기존과 동일) */
const Container = styled.div` max-width: 640px; margin: 40px auto; padding: 0 20px; `;
const Title = styled.h2` font-size: 32px; font-weight: 700; color: #222222; margin-bottom: 40px; `;
const CardGroup = styled.div` display: flex; flex-direction: column; gap: 16px; `;
const TypeCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: #ffffff;

  &:hover { border-color: #222222; }
  &.selected { border: 2px solid #222222; background-color: #f7f7f7; }
`;
const TextGroup = styled.div` display: flex; flex-direction: column; padding-right: 20px; `;
const CardTitle = styled.h3` font-size: 18px; font-weight: 700; color: #222222; margin: 0 0 6px 0; `;
const CardDesc = styled.p` font-size: 14px; color: #717171; margin: 0; `;
const IconBox = styled.div` font-size: 32px; color: #222222; `;