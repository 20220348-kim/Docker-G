import { useEffect, useState } from 'react'

// 브라우저는 컨테이너 밖(내 PC)에서 돌기 때문에 여기서는 localhost가 맞습니다
const BACK_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:8080'

export default function App() {
  const [memos, setMemos] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  async function load() {
    try {
      const res = await fetch(`${BACK_URL}/api/memos`)
      if (!res.ok) throw new Error(`서버 응답 ${res.status}`)
      setMemos(await res.json())
      setStatus('ready')
      setError('')
    } catch (e) {
      setStatus('error')
      setError(e.message)
    }
  }

  useEffect(() => { load() }, [])

  async function addMemo() {
    if (!title.trim()) return
    await fetch(`${BACK_URL}/api/memos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    setTitle('')
    setContent('')
    load()
  }

  async function removeMemo(id) {
    await fetch(`${BACK_URL}/api/memos/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <main>
      <header>
        <h1>Docker-G 메모장</h1>
        <p className="path">
          front <span>→</span> back (Spring) <span>→</span> api (FastAPI) <span>→</span> db (Postgres)
        </p>
      </header>

      <section className="composer">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          rows={3}
        />
        <button onClick={addMemo} disabled={!title.trim()}>메모 저장</button>
      </section>

      {status === 'loading' && <p className="notice">불러오는 중입니다.</p>}

      {status === 'error' && (
        <p className="notice notice-error">
          백엔드에 연결하지 못했습니다 ({error}).
          <br />
          <code>docker compose ps</code> 로 back 서비스가 떠 있는지 확인하세요.
        </p>
      )}

      {status === 'ready' && memos.length === 0 && (
        <p className="notice">메모가 없습니다. 위에서 첫 메모를 저장해 보세요.</p>
      )}

      <ul className="memos">
        {memos.map((m) => (
          <li key={m.id}>
            <div>
              <h2>{m.title}</h2>
              {m.content && <p>{m.content}</p>}
              <time>{String(m.created_at).replace('T', ' ').slice(0, 16)}</time>
            </div>
            <button className="ghost" onClick={() => removeMemo(m.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
