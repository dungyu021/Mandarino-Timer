from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

# =================== 全域狀態 ====================
timer_status = {
    "is_running": False,
    "start_time": None,
    "duration": None,
    "mode": None  # "work" or "rest"
}

tasks = []  # 儲存待辦事項清單
schedule = []  # 儲存今天的完成紀錄

# =================== API 區 =====================

@app.route("/")
def home():
    return jsonify({"message": "番茄鐘 Flask 後端運作中！"})

@app.route("/start_timer", methods=["POST"])
def start_timer():
    try:
        with open("log.txt", "a") as f:
            f.write("\n===== 新的請求 =====\n")
            f.write("原始資料： " + str(request.data) + "\n")

        data = request.get_json(force=True)

        with open("log.txt", "a") as f:
            f.write("收到的資料： " + str(data) + "\n")

        mode = data.get("mode")
        duration = data.get("duration")

        if not mode or not duration:
            return jsonify({"error": "請提供 mode 和 duration"}), 400

        timer_status["is_running"] = True
        timer_status["start_time"] = time.time()
        timer_status["duration"] = duration
        timer_status["mode"] = mode

        schedule.append({
            "mode": mode,
            "start_time": time.strftime("%H:%M:%S"),
            "duration": duration
        })

        return jsonify({"message": f"{mode} 模式開始倒數 {duration} 秒"})

    except Exception as e:
        print("❌ 發生錯誤：", e, flush=True)
        return jsonify({"error": str(e)}), 500

@app.route("/status", methods=["GET"])
def get_status():
    if not timer_status["is_running"]:
        return jsonify({"is_running": False})

    elapsed = time.time() - timer_status["start_time"]
    remaining = timer_status["duration"] - elapsed

    if remaining <= 0:
        timer_status["is_running"] = False
        return jsonify({"is_running": False, "message": "計時已結束"})

    return jsonify({
        "is_running": True,
        "mode": timer_status["mode"],
        "remaining_seconds": int(remaining)
    })

@app.route("/status", methods=["GET"])
def get_status():
    if not timer_status["is_running"]:
        return jsonify({"is_running": False})

    elapsed = time.time() - timer_status["start_time"]
    remaining = timer_status["duration"] - elapsed

    if remaining <= 0:
        timer_status["is_running"] = False
        return jsonify({"is_running": False, "message": "計時已結束"})

    return jsonify({
        "is_running": True,
        "mode": timer_status["mode"],
        "remaining_seconds": int(remaining)
    })

@app.route("/add_task", methods=["POST"])
def add_task():
    data = request.get_json(force=True)
    content = data.get("content")
    quadrant = data.get("quadrant")
    estimated_minutes = data.get("estimated_minutes")

    if not content or quadrant not in [1, 2, 3, 4]:
        return jsonify({"error": "請提供 content 和正確的 quadrant (1~4)"}), 400

    task = {
        "content": content,
        "quadrant": quadrant,
        "estimated_minutes": estimated_minutes,
        "deferred": False
    }

    tasks.append(task)
    return jsonify({"message": "任務已新增", "task": task})

@app.route("/get_schedule", methods=["GET"])
def get_schedule():
    return jsonify({"schedule": schedule})

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "✅ 成功連接後端！"})
# =============== 主程式啟動 ======================

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000, use_reloader=False)

