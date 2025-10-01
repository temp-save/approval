import { Link, NavLink, Route, Routes } from "react-router-dom";
import { ApprovalList } from "./components/approval/ApprovalList";
import { ApprovalForm } from "./components/approval/ApprovalForm";
import { Home } from "./components/main/home";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <div>
        <nav className="bg-gray-600 text-white px-6 py-3 shadow-md">
          <ul className="flex justify-center space-x-6 text-3xl">
            <li onClick={() => setShowLogin(true)} className="cursor-pointer">
              로그인
            </li>
            <li>로그아웃</li>
            <li>
              <Link to="/approvalList">결재목록</Link>
            </li>
            <li>
              <Link to="/approvalForm">결재등록</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/approvalList" element={<ApprovalList />}></Route>
          <Route path="/approvalForm" element={<ApprovalForm />}></Route>
          <Route path="*" element={<div>Not found 404</div>}></Route>
        </Routes>
      </div>

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
            {/* 모달 타이틀 */}
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              로그인
            </h2>

            {/* 입력 영역 */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="아이디"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => alert("로그인 실패")}
                className="w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                로그인
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className="w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
