CREATE TABLE IF NOT EXISTS memos (
    id         SERIAL PRIMARY KEY,
    title      VARCHAR(200) NOT NULL,
    content    TEXT         NOT NULL DEFAULT '',
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

INSERT INTO memos (title, content) VALUES
    ('첫 번째 메모', 'compose up 한 번으로 4개 서비스가 함께 뜹니다.'),
    ('컨테이너 통신', '서비스끼리는 localhost가 아니라 서비스 이름으로 부릅니다.'),
    ('데이터 보존', '볼륨을 붙여두면 컨테이너를 지워도 이 행이 남습니다.');
