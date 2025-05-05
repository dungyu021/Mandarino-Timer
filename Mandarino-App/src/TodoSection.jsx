import './TodoSection.css'
import AddTodo from './assets/AddTodo.svg'
import Delete1Todo from './assets/Delete1Todo.svg'
import Delete2Todo from './assets/Delete2Todo.svg'
import HideLeftSection from './assets/HideLeftSection.svg'
import { useState } from 'react'

export default function TodoSection() {
  // 使用 useState 來管理待辦事項的狀態
  const [todos, setTodos] = useState({
    urgent: [
      { id: 1, text: '寫微積分作業', disabled: false },
      { id: 2, text: '完成課堂報告 Ch.1', disabled: false },
      { id: 3, text: '準備期中考', disabled: false },
      { id: 4, text: '104投履歷', disabled: true }
    ],
    later: [
      { id: 5, text: '寄信給教授', disabled: false },
      { id: 6, text: '買洗衣精', disabled: false },
      { id: 7, text: '閱讀新書 30 頁', disabled: false }
    ]
  })

  // 切換待辦事項狀態的函數
  const toggleTodoStatus = (category, todoId) => {
    setTodos(prevTodos => ({
      ...prevTodos,
      [category]: prevTodos[category].map(todo =>
        todo.id === todoId
          ? { ...todo, disabled: !todo.disabled }
          : todo
      )
    }))
  }

  // 處理刪除按鈕點擊事件
  const handleDeleteClick = (e, category, todoId) => {
    e.stopPropagation(); // 防止觸發父元素的點擊事件
    // TODO: 實現刪除功能
  }

  return (
    <aside className="sidebar todo-section">
      <div className="sidebar-header">
        <span className="sidebar-title">待辦事項</span>
        <button className="sidebar-back-btn small">
          <img src={HideLeftSection} alt="返回" width={30} height={30} />
        </button>
      </div>
      <div className="todo-scroll-area custom-scroll">
        <div className="todo-category">
          <div className="todo-category-header">
            <span className="todo-category-title">優先處理</span>
            <button className="add-todo-btn">
              <img src={AddTodo} alt="新增" width={20} height={20} />
            </button>
          </div>
          {todos.urgent.map(todo => (
            <div
              key={todo.id}
              className={`todo-card ${todo.disabled ? 'disabled' : ''}`}
              onClick={() => toggleTodoStatus('urgent', todo.id)}
            >
              <span>{todo.text}</span>
              <button 
                className="delete-btn icon-btn"
                onClick={(e) => handleDeleteClick(e, 'urgent', todo.id)}
              >
                <img src={Delete1Todo} alt="刪除" width={20} height={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="todo-category">
          <div className="todo-category-header">
            <span className="todo-category-title">稍後處理</span>
            <button className="add-todo-btn">
              <img src={AddTodo} alt="新增" width={20} height={20} />
            </button>
          </div>
          {todos.later.map((todo, index) => (
            <div
              key={todo.id}
              className={`todo-card ${todo.disabled ? 'disabled' : ''} ${index === todos.later.length - 1 ? 'last' : ''}`}
              onClick={() => toggleTodoStatus('later', todo.id)}
            >
              <span>{todo.text}</span>
              <button 
                className="delete-btn icon-btn"
                onClick={(e) => handleDeleteClick(e, 'later', todo.id)}
              >
                <img src={Delete2Todo} alt="刪除" width={20} height={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
} 