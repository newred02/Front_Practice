import { useState, useEffect, useRef } from "react";
import "../App.css"; // 스타일 적용

function Timer() {
  const [time, setTime] = useState(1500); // 현재 타이머 시간 (초)
  const [percent, setPercent] = useState(0);
  const [mode, setMode] = useState("reading"); // "reading"(책 읽기) 또는 "break"(휴식)
  const [isPaused, setIsPaused] = useState(false); // 일시정지 상태
  const intervalRef = useRef(null); // 타이머 ref

  const [readingTime, setReadingTime] = useState(() => {
    return parseInt(localStorage.getItem("readingTime")) || 0; //localStroage에서 "readingTime"이라는 키를 가져옴
  });

  const [breakTime, setBreakTime] = useState(() => {
    return parseInt(localStorage.getItem("breakTime")) || 0;
  });

  useEffect(() => {
    if (time > 0 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setPercent((prevPercent) => prevPercent + 100 / time);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      if (mode === "reading") {
        setReadingTime((prevTotal) => {
          const newTotal = prevTotal + 1500;
          localStorage.setItem("readingTime", newTotal);
          return newTotal;
        });

        // 책 읽기가 끝나면 자동으로 10분(600초) 휴식 시작
        startBreakTimer(600);
      } else {
        setBreakTime((prevTotal) => {
          const newTotal = prevTotal + 600;
          localStorage.setItem("breakTime", newTotal);
          return newTotal;
        });

        // 휴식이 끝나면 기본 책 읽기 타이머(25분) 시작
        startReadingTimer(1500);
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [time, isPaused]);

  // 책 읽기 타이머 시작
  const startReadingTimer = (seconds) => {
    setMode("reading");
    setTime(seconds);
    setPercent(0);
    setIsPaused(false);
  };

  // 휴식 타이머 시작
  const startBreakTimer = (seconds) => {
    setMode("break");
    setTime(seconds);
    setPercent(0);
    setIsPaused(false);
  };

  // 타이머 일시정지 및 재개
  const pauseAndResume = () => {
    setIsPaused((prev) => !prev);
    if (!isPaused) {
      clearInterval(intervalRef.current);
    }
  };

  // 누적 시간 초기화
  const resetTotalTime = () => {
    setReadingTime(0);
    setBreakTime(0);
    localStorage.removeItem("readingTime");
    localStorage.removeItem("breakTime");
  };

  return (
    <div className="timer-container">
      <h1>뽀모도로 타이머</h1>
      <h2>현재 모드: {mode === "reading" ? "📖 책 읽기" : "☕ 휴식"}</h2>
      <div>
        남은 시간: {Math.floor(time / 60)}:
        {String(time % 60).padStart(2, "0")}
      </div>
      <div>📚 총 책 읽은 시간: {Math.floor(readingTime / 60)}분</div>
      <div>☕ 총 휴식한 시간: {Math.floor(breakTime / 60)}분</div>

      <div>시간 설정</div>
      <h3>📖 책 읽기</h3>
      <button onClick={() => startReadingTimer(1800)}>30분</button>
      <button onClick={() => startReadingTimer(2700)}>45분</button>
      <button onClick={() => startReadingTimer(3600)}>60분</button>

      <h3>☕ 휴식</h3>
      <button onClick={() => startBreakTimer(300)}>5분</button>
      <button onClick={() => startBreakTimer(600)}>10분</button>
      <button onClick={() => startBreakTimer(900)}>15분</button>
      <br />

      <button onClick={pauseAndResume}>{isPaused ? "RESUME" : "PAUSE"}</button>
      <button onClick={resetTotalTime}>누적 시간 초기화</button>

      <div className="timerContainer">
        <div className="timer"></div>
        <div
          style={{
            background: `conic-gradient(${mode === "reading" ? "#f44" : "#44f"} ${percent}%, #f2f2f2 ${percent}% 100%)`,
            transition: "background 1s linear",
          }}
          className="graph"
        ></div>
        <div className="centerCircle"></div>
      </div>
    </div>
  );
}

export default Timer;
