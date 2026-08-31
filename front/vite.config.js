import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // 컨테이너 밖에서 접속하려면 필수입니다
    port: 3000,
    watch: {
      usePolling: true // 도커 볼륨에서 파일 변경 감지가 안 될 때를 대비
    }
  }
})
