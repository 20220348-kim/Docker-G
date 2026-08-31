FROM python:3.11-slim

WORKDIR /app

# 의존성 파일을 먼저 복사해야 코드 수정 시 pip install 단계가 캐시됩니다
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# 0.0.0.0 으로 열어야 컨테이너 밖에서 접속됩니다
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
