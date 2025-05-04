import './FocusSection.css'
import HideRightSection from './assets/HideRightSection.svg'

export default function FocusSection() {
  return (
    <aside className="sidebar focus-section">
      <div className="sidebar-header">
        <span className="sidebar-title">專注時刻</span>
        <button className="sidebar-back-btn">
          <img src={HideRightSection} alt="返回" width={48} height={48} />
        </button>
      </div>
      <div className="focus-summary">
        <span className="focus-summary-label">本日專注時間：</span>
        <span className="focus-summary-time">1小時30分</span>
      </div>
      <div className="focus-timeline">
        {/* 刻度 */}
        {[...Array(17)].map((_, i) => (
          <div className="timeline-hour" key={i}>
            <span className="timeline-label">{8 + i}</span>
            <div className="timeline-bar-bg"></div>
          </div>
        ))}
        {/* 條狀圖 */}
        <div className="timeline-bar" style={{ top: '1.5em', left: '3em', width: '60%', height: '2em' }}></div>
        <div className="timeline-bar" style={{ top: '7.5em', left: '3em', width: '60%', height: '2em' }}></div>
      </div>
    </aside>
  )
} 