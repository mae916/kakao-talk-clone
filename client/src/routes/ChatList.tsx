import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getChattingListAxios } from '../api/chatting';
import { userDataState } from '../recoil/auth/atom';
import { useRecoilValue } from 'recoil';
import { IUserAtom, ChatRoom } from '../types';

const Container = styled.div``;
const TitleBox = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  margin: 0 18px 10px 0;
`;
const TopMenu = styled.ul`
  display: flex;
  & i {
    font-size: 1.1rem;
    color: #9d9d9d;
  }
  & > li:first-child i {
    margin-right: 10px;
  }
`;
const ContentBox = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;
  margin-left: -17px;
  padding-left: 17px;
  height: 514px;

  &::-webkit-scrollbar {
    width: 14px; /* 세로 스크롤바 폭 */
  }

  /* 스크롤바 막대 */
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc; /* 스크롤바 막대 색상 */
    border-radius: 12px;
    border: 3px solid #ffffff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #7f7f7f;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0); /* 스크롤바 뒷 배경을 투명 처리한다 */
  }

  & > li {
    display: flex;
    align-items: center;
  }
`;

const ImgBox = styled.div<{ $length: number }>`
  width: 45px;
  height: 45px;
  margin-right:12px;
  & > img {
    border: 1px solid #e9e9e9;
  }
  /* $length 값에 따라 스타일 조정 */
  ${({ $length }) =>
    $length === 1 &&
    `
    & > img {
      width:100%;
      height:100%;
      object-fit: cover;
      border-radius: 15px;
    }
    `}

  ${({ $length }) =>
    $length === 2 &&
    `
       position: relative;

      & > img {
        width: 27px;
        height: 27px;
        object-fit: cover;
        border-radius: 11px;
      }
      & > img:last-child {
        position:absolute;
        outline:2px solid #fff;
        bottom:2px;
        right:2px;
      }
    `}

  ${({ $length }) =>
    $length === 3 &&
    ` position: relative;

      & > img {
        width: 22px;
        height: 22px;
        object-fit: cover;
        border-radius: 9px;
      }
       & > img:first-child {
        position:absolute;
        top:2px;
        right:13px;
        z-index:3;
        outline:2px solid #fff;
       }
       & > img:nth-child(2) {
        position:absolute;
        bottom:2px;
        left:2px;
        z-index:1;
       }
       & > img:last-child {
        position:absolute;
        outline:2px solid #fff;
        bottom:2px;
        right:2px;
        z-index:2;
       }
    `}

  ${({ $length }) =>
    $length >= 4 &&
    `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap:1px;
      & > img {
        width: 22px;
        height: 22px;
        object-fit: cover;
        border-radius: 9px;
      }
    `}
`;
const TextBox = styled.div`
  max-width:80%;
`;
const LeftBox = styled.div``;
const Title = styled.div`
`;
const Names = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  margin-right:4px;
  `;
const Count = styled.span`
 font-weight: 300;
 font-size: 0.7rem;
 color: #b2b0af;
`;
const LastMsg = styled.span``;
const LastMsgDate = styled.span``;

function ChatList() {
  const user = useRecoilValue<IUserAtom>(userDataState);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  useEffect(() => {
    (async () => {
      await getChattingList();
    })();
  }, []);

  async function getChattingList() {
    try {
      const { data } = await getChattingListAxios(user.user_id);
      console.log('data', data);
      setRooms(data);
    } catch (error) {
      console.error('채팅 리스트 조회 실패:', error);
    }
  }

  return (
    <Container>
      <TitleBox>
        <h1>채팅</h1>
        <TopMenu>
          <li>
            <i className="xi-search"></i>
          </li>
          <li>
            <i className="xi-message-o"></i>
          </li>
        </TopMenu>
      </TitleBox>
      <ContentBox>
        {rooms.map((room) => (
          <li key={room.room_id}>
            <ImgBox $length={room.images.length}>
              {room.images.map((img, i) => (
                <img key={i} src={img} alt="" />
              ))}
            </ImgBox>
            <TextBox>
              <LeftBox>
                <Title>
                  <Names>
                    {room.names.map((name, j) =>
                      j >= 0 && j >= room.names.length - 1 ? name : name + ','
                    )}
                  </Names>
                  <Count>{room.names.length > 2 && room.names.length + 1}</Count>
                </Title>
                <LastMsg>{room.last_message}</LastMsg>
              </LeftBox>
              <LastMsgDate>{room.last_message_created_at}</LastMsgDate>
            </TextBox>
          </li>
        ))}
      </ContentBox>
    </Container>
  );
}

export default ChatList;
