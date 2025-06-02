import { getImagesByQuery } from './pixabay-api.js';
import { renderGallery, clearGallery, showLoader, hideLoader } from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  currentQuery = e.target.elements.searchQuery.value.trim();
  
  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  showLoader();
  clearGallery();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    
    renderGallery(data.hits);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message || 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});