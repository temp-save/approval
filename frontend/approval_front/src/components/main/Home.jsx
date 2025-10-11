import { useEffect } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/approvalList');
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      <h2>전자 결재시스템 메인화면 입니다.</h2>
      <h4>로그인을 먼저 해주세요</h4>
    </div>
  );
}
