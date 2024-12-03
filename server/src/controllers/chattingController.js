import db from '../models';
import database from '../config/mysql';

//채팅방 리스트 조회
export async function getChattingList(req, res) {
  const { userId } = req.body;

  try {
    const [result] = await database.query(
      'SELECT chat_participant.room_id, chat_participant.friend_id, chatting_room.last_message, chatting_room.last_message_created_at FROM chat_participant LEFT JOIN chatting_room ON chat_participant.room_id = chatting_room.room_id WHERE chat_participant.user_id = ?',
      [userId]
    );

    if (result.length === 0) {
      return res.status(204).json({ message: '정보가 존재하지 않습니다.' });
    }

    const groupedData = {};

    // `result` 순회
    for (const item of result) {
      if (!groupedData[item.room_id]) {
        groupedData[item.room_id] = {
          room_id: item.room_id,
          last_message: item.last_message,
          last_message_created_at: item.last_message_created_at,
          images: [],
          names: [],
        };
      }

      // 각 friend_id에 대해 프로필 정보 조회
      const [result2] = await database.query(
        'SELECT friends.friend_name, profile.profile_img_url FROM friends LEFT JOIN profile ON friends.friend_id = profile.user_id WHERE friends.friend_id = ?',
        [item.friend_id]
      );

      const friendData = result2[0] || {};
      groupedData[item.room_id].images.push(friendData.profile_img_url || null);
      groupedData[item.room_id].names.push(friendData.friend_name || null);
    }

    // `Object.values`로 데이터 배열로 변환
    const groupedDataArray = Object.values(groupedData);

    return res
      .status(200)
      .json({ message: '채팅 리스트 조회 성공', data: groupedDataArray });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류' });
  }
}
