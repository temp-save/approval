import { Link, Route, Routes } from 'react-router-dom';
import { ApprovalList } from './components/approval/ApprovalList';
import { ApprovalForm } from './components/approval/ApprovalForm';
import { Home } from './components/main/home';
import { useState, useRef } from 'react';
import { useAuth } from './provider/AuthProvider';

function App() {
  const { login, isLoggedIn, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const idRef = useRef();
  const pwRef = useRef();

  // 로그인 핸들러
  const handleLogin = (event) => {
    event.preventDefault();

    const id = idRef.current.value;
    const pw = pwRef.current.value;

    if (!id || !pw) {
      alert('로그인 정보를 확인하세요');
      return;
    }

    setShowLogin(false);
    login({ userId: id, userPw: pw });
  };

  return (
    <div>
      <div>
        <nav className="bg-gray-600 text-white px-6 py-3 shadow-md">
          <ul className="flex justify-center space-x-6 text-3xl">
            {isLoggedIn ? (
              <>
                <li onClick={() => logout()}>로그아웃</li>
                <li>
                  <Link to="/approvalList">결재목록</Link>
                </li>
                <li>
                  <Link to="/approvalForm/0">결재등록</Link>
                </li>
              </>
            ) : (
              <li onClick={() => setShowLogin(true)} className="cursor-pointer">
                로그인
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/approvalList" element={<ApprovalList />}></Route>
          <Route path="/approvalForm/:approvalNum" element={<ApprovalForm />}></Route>
          <Route path="*" element={<div>Not found 404</div>}></Route>
        </Routes>
      </div>

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
            {/* 모달 타이틀 */}
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">로그인</h2>

            {/* 입력 영역 */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="아이디"
                ref={idRef}
                defaultValue="aa111"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="비밀번호"
                ref={pwRef}
                defaultValue="s1234"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleLogin}
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
