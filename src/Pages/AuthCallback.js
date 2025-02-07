import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("id_token");

    if (accessToken) {
      // 백엔드로 토큰 전송
      // fetch("http://localhost:5000/oauth/google", {
      fetch("https://janghong.asia//oauth/google", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("token", data.token); // 토큰 저장
            navigate("/"); // 홈 화면으로 이동
          } else {
            console.error("Login failed:", data.message);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>로그인 중입니다...</p>
    </div>
  );
};

export default AuthCallback;
