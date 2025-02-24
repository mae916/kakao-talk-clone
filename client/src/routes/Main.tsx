import styled from 'styled-components';
import SideMenu from '../components/SideMenu';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Friends from './Friends';
import ChatList from './ChatList';
import Banner from '../components/Banner';
import { useEffect, useMemo, useState } from 'react';
import { getSocket } from '../sockets/socket';
import { getReadNotCountAxios } from '../api/chatting';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/auth/atom';
import { IUserAtom } from '../types';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Inner = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: minmax(58px, 5%) 1fr;
`;
const ContentBox = styled.div``;
const CloseBox = styled.div`
  display: flex;
  justify-content: right;
  margin: 30px 10px 15px;
  & > i:first-child {
    margin-right: 8px;
  }
  & i {
    font-size: 0.6rem;
  }
`;
const RouteBox = styled.div`
  padding: 0 1px 0 17px;
`;

function Main() {
  const [readNotCount, setReadNotCount] = useState<number>(0); // 메시지 읽지 않은 수
  const user = useRecoilValue<IUserAtom>(userState);
  const navigate = useNavigate();
  const location = useLocation();

  const socket = getSocket();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/login');
    }

    getReadNotCount();
    socket.on('receive_msg', () => setTimeout(getReadNotCount, 500));
    socket.on('read_count_apply', () => setTimeout(getReadNotCount, 500));
    return () => {
      socket.off('receive_msg', getReadNotCount);
      socket.off('read_count_apply', getReadNotCount);
    };
  }, []);

  async function getReadNotCount() {
    const result = await getReadNotCountAxios(user.user_id);
    setReadNotCount(Number(result.data.total_read_n_count));
  }

  return (
    <MainContainer>
      <Inner>
        <SideMenu readNotCount={readNotCount}></SideMenu>
        <ContentBox>
          <CloseBox>
            {/* <i className="xi-minus-thin"></i>
            <i className="xi-close-thin"></i> */}
          </CloseBox>
          <RouteBox>
            <Routes>
              <Route path="friends" element={<Friends socket={socket} />} />
              <Route path="chatList" element={<ChatList socket={socket} />} />
            </Routes>
          </RouteBox>
        </ContentBox>
      </Inner>
      <Banner></Banner>
    </MainContainer>
  );
}

export default Main;
