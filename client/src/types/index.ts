export interface IUser {
  user_email: string;
  password: string;
  password2: string;
  user_name: string;
  refresh_token: string;
  access_token: string;
}

export interface IUserAtom {
  user_id: number;
  user_email: string;
  user_name: string;
  access_token: string;
  profile_img_url: string;
  bg_img_url: string;
  state_msg: string;
}

export interface IModal {
  children: React.ReactNode;
}

export interface ChatRoom {
  room_id: number; // 채팅방 ID
  last_message: string | null; // 마지막 메시지
  last_message_created_at: string | null; // 마지막 메시지 생성 시간
  images: string[]; // 참여자의 프로필 이미지 URL 목록
  names: string[]; // 참여자 이름 목록
}
