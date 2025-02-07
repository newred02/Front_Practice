import { useState, useEffect, useRef } from "react";
import "../App.css";

function PracticeTimer(){
    const [time,setTime] = useState(1500); //타이머 시간 변수가 있어야됨됨
    const [percent,setPercent]=useState(0); //타이머 시간이 얼마나 돌아갔는지 알기 위해 있어야됨됨
    const [mode,setMode] = useState("reading"); //reading모드인지 rest모드인지 알아야됨됨
    const [isPaused,setIsPaused] = useState(false) //중지된 상태인지 알아야됨
    const intervalRef = useRef(null); //원래 있는 함수인 setInterval의 id를 저장해야됨->intervalRef.current를 사용하지 않는다면 타이머 중지를 못함

    const [readingTime,setReadingTime] = useState(()=>{
        return parseInt(localStorage.getItem("readingTime")) || 0;
    });

    const [breakTime,setBreakTime] = useState(()=>{
        return parseInt(localStorage.getItem("breakTime")) || 0;
    });

    useEffect(()=>{
        if(time >0 && !isPaused){
            
        }
    })




}

export default PracticeTimer;