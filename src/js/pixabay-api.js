import axios from 'axios';

const API_KEY = '43966863-3e3d2a956fed7cb918868d7e8';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}