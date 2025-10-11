import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider';
import { requestAPI } from '../../api/requestAPI';

export function ApprovalForm() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { approvalNum } = useParams();
  // 글 등록 전용 다음 글번호
  const [nextNum, setNextNum] = useState();
  // 결재상태코드
  const [statusMap, setStatusMap] = useState([]);
  // 직급정보(원래는 쿼리 호출 필요..)
  const positions = [
    { positionCd: 'pg', positionName: '사원', level: 1 },
    { positionCd: 'aa', positionName: '대리', level: 2 },
    { positionCd: 'pl', positionName: '과장', level: 3 },
    { positionCd: 'pm', positionName: '부장', level: 4 },
  ];
  const [history, setHistory] = useState([]);
  const [viewInfo, setViewInfo] = useState(null);
  const titleRef = useRef();
  const contentRef = useRef();
  const viewType = approvalNum && Number(approvalNum) === 0 ? 'I' : 'V'; // 파라미터 0이면 등록페이지, 그 외 값이면 viewPage

  // 버튼(임시저장, 반려, 결재) 클릭
  const handleSubmit = (status) => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!title || !content) {
      alert('제목과 내용은 필수입니다.');
      return;
    }

    saveApproval({
      num: approvalNum,
      writerId: user.userId,
      title: title,
      content: content,
      statusCode: status,
      positionCd: user.positionCd,
      beforeStatusCode: Number(approvalNum) === 0 ? null : viewInfo?.statusCode,
    });
  };

  // 상태코드 가져오기
  const getStatus = async () => {
    const status = await requestAPI('/api/status');
    setStatusMap(status);
  };

  // 등록용 글번호 가져오기
  const getNextNum = async () => {
    const nextNum = await requestAPI('/api/approval/all-cnt');
    setNextNum(nextNum);
  };

  // 상세(현재 결재) 정보 가져오기
  const getDetail = async () => {
    const detail = await requestAPI(`/api/approval/detail?num=${Number(approvalNum)}`);
    setViewInfo(detail);
  };

  // 상태 표시용 이력 가져오기
  const getHistory = async () => {
    const approvalHistory = await requestAPI(`/api/approval/history?num=${Number(approvalNum)}`);
    setHistory(approvalHistory);
  };

  // 결재 상태 체크 여부 조회
  const calcChecked = (targetCode) => {
    // targetCode: 해당 체크박스의 status
    const targetLevel = statusMap.filter((item) => item.statusCode === targetCode)[0].num;
    const viewInfoLevel = statusMap.filter((item) => item.statusCode === viewInfo.statusCode)[0].num;

    return Number(targetLevel) <= Number(viewInfoLevel);
  };

  // '결재'버튼의 상태코드 계산
  // 사원 및 대리
  //  등록: 결재대기 / 상세보기: 권한 없음(버튼 숨김)
  // 과장
  //  등록/상세보기: 결재중으로 처리 가능
  // 부장
  //  등록/상세보기: 결제완료로 처리 가능
  const calcStatus = () => {
    const myLevel = positions.filter((item) => item.positionCd === user.positionCd)[0].level;
    if (Number(myLevel) < 3) {
      return 'PND';
    } else if (Number(myLevel) < 4) {
      return 'APR';
    } else {
      return 'CMP';
    }
  };

  // 글 등록
  const saveApproval = (formData) => {
    const submit = async () => {
      const save = await requestAPI('/api/approval', {
        method: 'POST',
        data: formData,
      });

      if (save.status === 'error') {
        alert(save.message);
      } else {
        alert('저장 되었습니다.');
        navigate('/approvalList');
      }
    };
    submit();
  };

  // 초기 실행
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }

    getStatus();

    if (approvalNum !== undefined) {
      if (viewType === 'I') {
        getNextNum();
      } else {
        getDetail();
        getHistory();
      }
    }
  }, [approvalNum]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/* 제목 */}
      <h1 className="mb-6 text-center text-2xl font-bold text-stone-900">
        {viewType === 'I' ? '결재 등록' : '결재 처리'}
      </h1>

      {/* 결재 상태 선택 (테이블) */}
      {viewInfo && (
        <div className="mb-8 rounded-xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-100 px-5 py-3">
            <h2 className="text-base font-semibold text-stone-900">결재 상태</h2>
          </div>

          <div className="overflow-x-auto px-5 py-5">
            <table className="min-w-full border-collapse border border-stone-200 text-center">
              <thead className="bg-stone-50">
                <tr>
                  <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">결재대기</th>
                  <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">결재중</th>
                  <th className="border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700">결재완료</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-stone-200 px-4 py-4">
                    <input
                      type="checkbox"
                      disabled
                      checked={calcChecked('PND')}
                      className="h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                    />
                  </td>
                  <td className="border border-stone-200 px-4 py-4">
                    <input
                      type="checkbox"
                      disabled
                      checked={calcChecked('APR')}
                      className="h-5 w-5 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-stone-200 px-4 py-4">
                    <input
                      type="checkbox"
                      disabled
                      checked={calcChecked('CMP')}
                      className="h-5 w-5 rounded border-stone-300 text-green-600 focus:ring-green-500"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 카드: 기본 정보 입력 */}
      <div className="mb-8 rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 px-5 py-3">
          <h2 className="text-base font-semibold text-stone-900">기본 정보</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 px-5 py-5">
          {/* 글번호 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">글번호</label>
            <input
              type="text"
              defaultValue={viewType === 'I' ? nextNum : viewInfo?.num}
              disabled
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700"
            />
          </div>

          {/* 작성자 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">작성자</label>
            <input
              type="text"
              value={viewType === 'I' ? user.empName : viewInfo?.empName}
              disabled
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 text-sm text-stone-700"
            />
          </div>

          {/* 제목 */}
          <div className="flex items-center gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600">제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              disabled={
                viewType === 'I' ||
                (viewType === 'V' && viewInfo?.statusCode === 'TMP') ||
                viewInfo?.statusCode === 'REJ'
                  ? false
                  : true
              }
              ref={titleRef}
              defaultValue={viewType === 'I' ? '' : viewInfo?.title}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-500 focus:outline-none"
            />
          </div>

          {/* 내용 */}
          <div className="flex items-start gap-4">
            <label className="w-28 shrink-0 text-sm text-stone-600 leading-7">내용</label>
            <textarea
              placeholder="내용을 입력하세요"
              rows={6}
              disabled={
                viewType === 'I' ||
                (viewType === 'V' && viewInfo?.statusCode === 'TMP') ||
                viewInfo?.statusCode === 'REJ'
                  ? false
                  : true
              }
              ref={contentRef}
              defaultValue={viewType === 'I' ? '' : viewInfo?.content}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:border-stone-500 focus:outline-none"
            ></textarea>
          </div>

          {/* 버튼 */}
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50"
              onClick={() => navigate('/approvalList')}
            >
              취소
            </button>
            {viewType === 'I' && (
              <button
                className="rounded-lg bg-red-900 px-4 py-2 text-sm text-white hover:opacity-90"
                onClick={() => handleSubmit('TMP')}
              >
                임시저장
              </button>
            )}
            {viewType === 'V' && user.positionLevel >= 3 && (
              <button
                className="rounded-lg bg-blue-900 px-4 py-2 text-sm text-white hover:opacity-90"
                onClick={() => handleSubmit('REJ')}
              >
                반려
              </button>
            )}
            {(viewType === 'I' || Number(user.positionLevel) >= 3 || viewInfo?.statusCode === 'REJ') && (
              <button
                className="rounded-lg bg-green-900 px-4 py-2 text-sm text-white hover:opacity-90"
                onClick={() => handleSubmit(calcStatus())}
              >
                결재
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 카드: 문서 상태 히스토리 */}
      <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 px-5 py-3">
          <h3 className="text-base font-semibold text-stone-900">문서상태</h3>
        </div>
        <div className="mt-3 pl-5 text-left text-xs text-stone-500 ">* 상태는 시간 순서대로 표시됩니다.</div>

        <div className="overflow-x-auto px-5 py-5">
          <table className="min-w-full border-collapse">
            <thead className="bg-stone-50">
              <tr className="text-left text-stone-700">
                <th className="px-4 py-3 text-sm font-semibold">번호</th>
                <th className="px-4 py-3 text-sm font-semibold">등록/결재자</th>
                <th className="px-4 py-3 text-sm font-semibold">직급</th>
                <th className="px-4 py-3 text-sm font-semibold">결재상태</th>
              </tr>
            </thead>
            <tbody className="[&>tr:hover]:bg-stone-50">
              {history && history.length > 0 ? (
                <>
                  {history.map((h, idx) => {
                    const classMap = {
                      TMP: 'bg-stone-100 text-stone-700 ring-stone-200',
                      PND: 'bg-amber-50 text-amber-700 ring-amber-200',
                      APR: 'bg-blue-50 text-blue-700 ring-blue-200',
                      CMP: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
                      REJ: 'bg-rose-50 text-rose-700 ring-rose-200',
                    };

                    return (
                      <tr className="border-t border-stone-200" key={h.hisNum}>
                        <td className="px-4 py-3 text-sm">{idx + 1}</td>
                        <td className="px-4 py-3 text-sm">{h.procName}</td>
                        <td className="px-4 py-3 text-sm">{h.positionName}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`rounded-md px-2 py-1 text-xs ring-1 ${classMap[h.statusCode]}`}>
                            {h.statusName}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr className="border-t border-stone-200">
                  <td colSpan={4} className="px-4 py-3 text-sm text-center">
                    문서 작성중...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
