import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./Pages/Search";
import Timer from "./Pages/Timer";
import Login from "./Pages/Login";
import AuthCallback from "./Pages/AuthCallback";


const App = () => {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/time" element={<Timer />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
