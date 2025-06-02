import { getImagesByQuery } from './js/pixabay-api';
import {
  initGallery,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  setupEventListeners();
});

function setupEventListeners() {
  const searchForm = document.getElementById('search-form');
  const loadMoreBtn = document.querySelector('.load-more');

  if (!searchForm || !loadMoreBtn) {
    console.error('Required elements not found');
    return;
  }

  let currentQuery = '';
  let currentPage = 1;
  let totalHits = 0;

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    
    currentQuery = event.target.searchQuery.value.trim();
    currentPage = 1;
    
    if (!currentQuery) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query',
        position: 'topRight',
      });
      return;
    }
    
    try {
      showLoader();
      hideLoadMoreButton();
      clearGallery();
      
      const data = await getImagesByQuery(currentQuery, currentPage);
      totalHits = data.totalHits;
      
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      
      createGallery(data.hits);
      
      if (currentPage * 15 < totalHits) {
        showLoadMoreButton();
      } else {
        showEndMessage();
      }
      
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${totalHits} images.`,
        position: 'topRight',
      });
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    
    try {
      showLoader();
      hideLoadMoreButton();
      
      const data = await getImagesByQuery(currentQuery, currentPage);
      createGallery(data.hits);
      
      smoothScroll();
      
      if (currentPage * 15 >= totalHits) {
        showEndMessage();
      } else {
        showLoadMoreButton();
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    } finally {
      hideLoader();
    }
  });

  function smoothScroll() {
    const galleryItem = document.querySelector('.gallery-item');
    if (!galleryItem) return;
    
    const { height: cardHeight } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  function showEndMessage() {
    hideLoadMoreButton();
    const endMessage = document.createElement('p');
    endMessage.classList.add('end-message');
    endMessage.textContent = "We're sorry, but you've reached the end of search results.";
    document.querySelector('.gallery-container').appendChild(endMessage);
  }
}