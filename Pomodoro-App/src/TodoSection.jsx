import './TodoSection.css'
import AddTodo from './assets/AddTodo.svg'
import Delete1Todo from './assets/Delete1Todo.svg'
import Delete2Todo from './assets/Delete2Todo.svg'
import HideLeftSection from './assets/HideLeftSection.svg'

export default function TodoSection() {
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
          {/* 優先處理卡片（模擬資料） */}
          <div className="todo-card urgent"><span>寫微積分作業</span><button className="delete-btn icon-btn"><img src={Delete1Todo} alt="刪除" width={20} height={20} /></button></div>
          <div className="todo-card urgent"><span>完成課堂報告 Ch.1</span><button className="delete-btn icon-btn"><img src={Delete1Todo} alt="刪除" width={20} height={20} /></button></div>
          <div className="todo-card urgent"><span>準備期中考</span><button className="delete-btn icon-btn"><img src={Delete1Todo} alt="刪除" width={20} height={20} /></button></div>
          {/* 失效項目 */}
          <div className="todo-card disabled"><span>104投履歷</span></div>
        </div>
        <div className="todo-category">
          <div className="todo-category-header">
            <span className="todo-category-title">稍後處理</span>
            <button className="add-todo-btn">
              <img src={AddTodo} alt="新增" width={20} height={20} />
            </button>
          </div>
          {/* 稍後處理卡片（模擬資料） */}
          <div className="todo-card later"><span>寄信給教授</span><button className="delete-btn icon-btn"><img src={Delete2Todo} alt="刪除" width={20} height={20} /></button></div>
          <div className="todo-card later"><span>買洗衣精</span><button className="delete-btn icon-btn"><img src={Delete2Todo} alt="刪除" width={20} height={20} /></button></div>
          <div className="todo-card later last"><span>閱讀新書 30 頁</span><button className="delete-btn icon-btn"><img src={Delete2Todo} alt="刪除" width={20} height={20} /></button></div>
        </div>
      </div>
    </aside>
  )
} 