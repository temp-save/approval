import { useEffect, useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../../api/requestAPI';

export function ApprovalList() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [aprvList, setAprvList] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const pageSize = 5;
  const totalPages = Math.ceil(totalCnt / pageSize);

  // 리스트 호출
  const getList = async (formData) => {
    const list = await requestAPI('/api/approval', {
      method: 'GET',
      data: formData,
    });
    setAprvList(list);
  };

  // 리스트 총 개수
  const getTotalCnt = async (formData) => {
    const cnt = await requestAPI('/api/approval/cnt', {
      method: 'GET',
      data: formData,
    });
    setTotalCnt(cnt);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      const formData = {
        page: curPage,
        size: pageSize,
        userId: user.userId,
        userLevel: user.positionLevel,
        offset: (curPage - 1) * pageSize,
      };
      getList(formData);
      getTotalCnt(formData);
    }
  }, [curPage]);

  return (
    <>
      {user && (
        <div className="mx-auto max-w-[1200px] p-6">
          {/* 환영 메세지 (왼쪽 정렬) */}
          <div className="mb-4 text-sm text-stone-600 text-left">
            <span className="font-semibold text-stone-800">
              {user.empName}({user.positionName})
            </span>
            님 환영합니다.
          </div>

          {/* h1 (가운데 정렬) */}
          <h1 className="text-2xl font-bold text-stone-900 mb-4 text-center">결재 목록</h1>

          {/* 테이블 */}
          {aprvList && aprvList.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-sm">
              <table className="w-full border-collapse bg-white">
                <thead className="bg-stone-50">
                  <tr className="text-stone-700">
                    <th className="px-4 py-3 text-sm font-semibold">글번호</th>
                    <th className="px-4 py-3 text-sm font-semibold">작성자</th>
                    <th className="px-4 py-3 text-sm font-semibold">제목</th>
                    <th className="px-4 py-3 text-sm font-semibold">등록일</th>
                    <th className="px-4 py-3 text-sm font-semibold">결재일</th>
                    <th className="px-4 py-3 text-sm font-semibold">결재자</th>
                    <th className="px-4 py-3 text-sm font-semibold">결재상태</th>
                  </tr>
                </thead>

                <tbody className="[&>tr:hover]:bg-stone-50 text-center">
                  {aprvList.map((item, idx) => {
                    const statusClassMap = [
                      { TMP: 'text-stone-700' },
                      { PND: 'text-amber-600' },
                      { APR: 'text-blue-600' },
                      { CMP: 'text-emerald-600' },
                      { REJ: 'text-rose-600' },
                    ];

                    return (
                      <tr
                        className="border-t border-stone-200"
                        key={item.num}
                        onClick={() => navigate(`/approvalForm/${item.num}`)}
                      >
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">{item.empName}</td>
                        <td className="px-4 py-3">{item.title}</td>
                        <td className="px-4 py-3">{item.regDate}</td>
                        <td className="px-4 py-3">{!item.apprDate ? '-' : item.appDate}</td>
                        <td className="px-4 py-3">
                          {!item.approverName ? '-' : `item.approverName(${item.positionName})`}
                        </td>
                        <td className={`px-4 py-3 ${statusClassMap[item.statusCode]}}`}>{item.statusName}</td>
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot className="bg-white border-t border-stone-200">
                  <tr>
                    <td colSpan={7} className="px-4 py-3 text-center text-sm">
                      <div className="flex justify-center gap-2 mt-4">
                        <button
                          onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
                          disabled={curPage === 1}
                          className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                          이전
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurPage(i + 1)}
                            className={`px-3 py-1 border rounded ${curPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                          >
                            {i + 1}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={curPage === totalPages}
                          className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                          다음
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="text-lg text-center mt-30">
              <div>작성된 글이 없습니다.</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
