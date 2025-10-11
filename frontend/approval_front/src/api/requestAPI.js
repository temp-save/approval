// 원래 작성하는것이 맞으나 현재 cors에러 때문에 vite.config.js에서 컨트롤 중.
// const BASE_URL = "http://localhost:8081";

export async function requestAPI(path, { method = 'GET', data } = {}) {
  let url = path;
  let body = undefined;

  if (method === 'GET' && data) {
    // null, undefined, 빈 문자열 제거
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    const queryString = new URLSearchParams(filteredData).toString();
    url = `${path}${queryString ? '?' + queryString : ''}`;
  } else if (data) {
    body = JSON.stringify(data);
  }

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body,
  });

  // 응답 본문을 먼저 확보(텍스트 → JSON 시도)
  const ct = res.headers.get('content-type') || '';
  const raw = await (ct.includes('application/json') ? res.json() : res.text());

  if (!res.ok) {
    const msg = typeof raw === 'string' ? raw : raw?.message || raw?.error || `HTTP ${res.status}`;
    throw new Error(msg); // <- 여기서 서버가 보낸 원인(Invalid credentials 등)이 보임
  }

  return raw;
}
