const BASE_URL =
  'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

const cache = {};

async function request(url) {
  if (cache[url]) {
    return cache[url];
  }

  const res = await fetch(url);

  if (res.ok) {
    const result = await res.json();
    cache[url] = result;
    return result;
  }

  throw new Error('API 호출에 실패했습니다.');
}

const api = {
  searchKeyword: (keyword) => {
    return request(`${BASE_URL}/languages?keyword=${keyword}`);
  },
};

export default api;
