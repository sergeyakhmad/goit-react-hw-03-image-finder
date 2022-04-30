const API_KEY = '26096950-b7ccd800d39d8bd425d23bde0';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImage(search, page) {
  const url = `${BASE_URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No results were found for ${search}`));
  });
}

const api = { fetchImage };

export default api;
