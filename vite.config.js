import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mangorassy.github.io/', 
})
2.  **進捗を確認する**
GitHubリポジトリの上部にある **「Actions」** タブをクリックしてください。黄色い丸（進行中）や緑のチェック（成功）が表示されているはずです。
