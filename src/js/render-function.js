import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function initGallery() {
  const galleryEl = document.querySelector('.gallery');
  if (!galleryEl) {
    console.error('Gallery element not found');
    return;
  }
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  return {
    galleryEl,
    loaderEl: document.querySelector('.loader'),
    loadMoreBtn: document.querySelector('.load-more')
  };
}

export function createGallery(images) {
  const { galleryEl } = initGallery();
  if (!galleryEl) return;

  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="gallery-info">
          <div class="gallery-info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </div>
          <div class="gallery-info-item">
            <b>Views</b>
            <span>${views}</span>
          </div>
          <div class="gallery-info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </div>
          <div class="gallery-info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </div>
        </div>
      </li>
    `).join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  const { galleryEl } = initGallery();
  if (galleryEl) galleryEl.innerHTML = '';
}

export function showLoader() {
  const { loaderEl } = initGallery();
  if (loaderEl) loaderEl.style.display = 'block';
}

export function hideLoader() {
  const { loaderEl } = initGallery();
  if (loaderEl) loaderEl.style.display = 'none';
}

export function showLoadMoreButton() {
  const { loadMoreBtn } = initGallery();
  if (loadMoreBtn) loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const { loadMoreBtn } = initGallery();
  if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
}