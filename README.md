# 카카오톡 구현하기

- react와 ts 학습과 백엔드를 직접 구축 해보고 싶은 마음과 socket.io에 대한 흥미로 이 프로젝트를 시작하게 되었습니다.
- 실제 카카오톡을 실행해보며 실제 구현 불가한 부분(페이, 쇼핑몰 등)은 커스터마이징하고 모두 스스로 제작하였습니다.

## 시작 가이드

### 요구사항

- Node.js 16.20.2
- Npm 8.19.4

### 설치 및 실행

- 프론트엔드

  ```
  $cd client
  $npm run start
  ```

- 백엔드

  ```
  $cd server
  $npm run dev
  ```

## 기술 스택
<div align=center> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> 
  <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">
</div>

## ERD (ERD Cloud)
- https://www.erdcloud.com/d/rFyZbfuc4uZFQDGys
  
## API (Swagger)
- (server path)/api-docs/

## 프로젝트 구조

```plaintext
📦kakao-talk
 ┣ 📂client
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜manifest.json
 ┃ ┃ ┗ 📜robots.txt
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┃ ┣ 📜chatting.ts
 ┃ ┃ ┃ ┣ 📜friends.ts
 ┃ ┃ ┃ ┣ 📜profile.ts
 ┃ ┃ ┃ ┗ 📜upload.ts
 ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┣ 📂banner
 ┃ ┃ ┃ ┃ ┗ 📜banner_1.png
 ┃ ┃ ┃ ┗ 📂images
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜Banner.tsx
 ┃ ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┃ ┗ 📜SideMenu.tsx
 ┃ ┃ ┣ 📂recoil
 ┃ ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┃ ┗ 📜atom.ts
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┣ 📜ChatList.tsx
 ┃ ┃ ┃ ┣ 📜ChattingRoom.tsx
 ┃ ┃ ┃ ┣ 📜Friends.tsx
 ┃ ┃ ┃ ┣ 📜Join.tsx
 ┃ ┃ ┃ ┣ 📜Login.tsx
 ┃ ┃ ┃ ┗ 📜Main.tsx
 ┃ ┃ ┣ 📂sockets
 ┃ ┃ ┃ ┗ 📜socket.ts
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📜App.tsx
 ┃ ┃ ┣ 📜babel.config.js
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜react-app-env.d.ts
 ┃ ┃ ┗ 📜Router.tsx
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┗ 📜tsconfig.json
 ┣ 📂server
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┣ 📜bg.png
 ┃ ┃ ┃ ┗ 📜profile.jpg
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┣ 📜config.json
 ┃ ┃ ┃ ┗ 📜mysql.js
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📜authController.js
 ┃ ┃ ┃ ┣ 📜chattingController.js
 ┃ ┃ ┃ ┣ 📜friendsController.js
 ┃ ┃ ┃ ┣ 📜profileController.js
 ┃ ┃ ┃ ┣ 📜socketController.js
 ┃ ┃ ┃ ┗ 📜uploadController.js
 ┃ ┃ ┣ 📂migrations
 ┃ ┃ ┃ ┣ 📜20241118063328-create-account.js
 ┃ ┃ ┃ ┣ 📜20241118064623-create-profile.js
 ┃ ┃ ┃ ┣ 📜20241118064914-create-chat_participant.js
 ┃ ┃ ┃ ┣ 📜20241118065138-create-chatting-room.js
 ┃ ┃ ┃ ┣ 📜20241118065358-create-chatting.js
 ┃ ┃ ┃ ┣ 📜20241118065510-create-msg-read-user.js
 ┃ ┃ ┃ ┗ 📜20241118065637-create-friends.js
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📜Account.js
 ┃ ┃ ┃ ┣ 📜Chatting.js
 ┃ ┃ ┃ ┣ 📜Chatting_room.js
 ┃ ┃ ┃ ┣ 📜Chat_participant.js
 ┃ ┃ ┃ ┣ 📜Friends.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜Msg_read_user.js
 ┃ ┃ ┃ ┗ 📜Profile.js
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┃ ┣ 📜chatting.js
 ┃ ┃ ┃ ┣ 📜friends.js
 ┃ ┃ ┃ ┣ 📜profile.js
 ┃ ┃ ┃ ┗ 📜upload.js
 ┃ ┃ ┣ 📂seeders
 ┃ ┃ ┣ 📂sockets
 ┃ ┃ ┃ ┗ 📜socket.js
 ┃ ┃ ┣ 📂swagger
 ┃ ┃ ┃ ┗ 📜swagger.js
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┣ 📜authUtils.js
 ┃ ┃ ┃ ┗ 📜dateUtil.js
 ┃ ┃ ┗ 📜server.js
 ┃ ┣ 📂uploads
 ┃ ┃ ┗ 📂profile
 ┃ ┣ 📜.env
 ┃ ┣ 📜babel.config.js
 ┃ ┣ 📜nodemon.json
 ┃ ┣ 📜package-lock.json
 ┃ ┗ 📜package.json
 ┣ 📜.gitignore
 ┣ 📜ca.crt
 ┣ 📜ca.key
 ┣ 📜cert.crt
 ┣ 📜cert.key
 ┗ 📜README.md
