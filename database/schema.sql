-- 데이터베이스 문자셋 설정 (이모지 지원을 위해 utf8mb4 사용)
-- ALTER DATABASE chatchat_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 1. 사용자 (Users)
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       login_id VARCHAR(50) NOT NULL UNIQUE COMMENT '로그인 아이디',
                       password VARCHAR(255) NOT NULL COMMENT '비밀번호 (해시 암호화)',
                       nickname VARCHAR(50) NOT NULL COMMENT '채팅방에서 보여질 닉네임',
                       profile_image_url VARCHAR(255) COMMENT '프로필 이미지 경로 (로컬 스토리지)',
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. 채팅방 (Chat Rooms)
CREATE TABLE chat_rooms (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            title VARCHAR(100) NOT NULL COMMENT '채팅방 이름',
                            is_group_chat BOOLEAN DEFAULT FALSE COMMENT 'TRUE: 단체방, FALSE: 일대일방',
                            is_secret BOOLEAN DEFAULT FALSE COMMENT 'TRUE: 비밀방 (비밀번호 필요)',
                            password VARCHAR(255) COMMENT '비밀방 비밀번호 (해시 암호화, is_secret=true일 때만 사용)',
                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. 채팅방 참여자 (Chat Room Members) - 다대다(N:M) 관계 해소용 중간 테이블
CREATE TABLE chat_room_members (
                                   id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   room_id BIGINT NOT NULL,
                                   user_id BIGINT NOT NULL,
                                   joined_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '입장 시간',
                                   last_read_message_id BIGINT COMMENT '마지막으로 읽은 메시지 ID (안 읽은 메시지 수 계산 및 알림용)',
                                   FOREIGN KEY (room_id) REFERENCES chat_rooms(id) ON DELETE CASCADE,
                                   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                   UNIQUE KEY uk_room_user (room_id, user_id) -- 동일한 방에 중복 입장 방지
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. 채팅 메시지 (Messages)
CREATE TABLE messages (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          room_id BIGINT NOT NULL,
                          sender_id BIGINT NOT NULL,
                          content TEXT COMMENT '메시지 텍스트 내용',
                          message_type VARCHAR(20) NOT NULL COMMENT '메시지 타입 (ENTER, LEAVE, TEXT, IMAGE, FILE)',
                          file_url VARCHAR(255) COMMENT '파일/이미지 전송 시 저장된 로컬 경로',
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP (3) COMMENT '메시지 전송 시간 (밀리초 단위까지 저장)',
                          FOREIGN KEY (room_id) REFERENCES chat_rooms(id) ON DELETE CASCADE,
                          FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- [성능 최적화를 위한 인덱스 추가]
-- 1. 특정 채팅방의 과거 메시지를 시간순으로 빠르게 조회하기 위한 인덱스
CREATE INDEX idx_messages_room_id_created_at ON messages(room_id, created_at);

-- 2. 특정 사용자가 참여 중인 채팅방 목록을 빠르게 조회하기 위한 인덱스
CREATE INDEX idx_members_user_id_room_id ON chat_room_members(user_id, room_id);