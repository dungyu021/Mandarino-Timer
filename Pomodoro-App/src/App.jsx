import { useState, useEffect } from 'react'
import axios from 'axios'
import TodoSection from './TodoSection'
import FocusSection from './FocusSection'

function formatTime(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0')
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${min}:${sec}`
}

function App() {
  const [message, setMessage] = useState("")
  const [remaining, setRemaining] = useState(null)
  const [intervalId, setIntervalId] = useState(null)

  const startTimer = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/start_timer", {
        mode: "work",
        ////////為了測試先改成10秒鐘////////
        duration: 10
      })
      setMessage(response.data.message)
      fetchRemainingTime() // 立即抓一次
      const id = setInterval(fetchRemainingTime, 1000) // 每秒更新
      setIntervalId(id)
    } catch (error) {
      setMessage("發送失敗：" + error.message)
    }
  }

  const fetchRemainingTime = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/status")
      if (response.data.is_running) {
        setRemaining(response.data.remaining_seconds)
      } else {
        setRemaining(0)
        clearInterval(intervalId)
      }
    } catch (error) {
      console.error("取得剩餘時間失敗", error)
    }
  }

  return (
    <div className="app-root">
      <TodoSection />
      <main className="main-section timer-section">
        <div className="timer-display">
          <span className="timer-time">{remaining !== null ? formatTime(remaining) : '25:00'}</span>
        </div>
        <button className="timer-btn" onClick={startTimer}>開始專注</button>
        {/* 動畫區塊預留 */}
        <div className="timer-animation-placeholder"></div>
        {message && <p>{message}</p>}
      </main>
      <FocusSection />
    </div>
  )
}

export default App
