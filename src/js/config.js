export const API_KEY = '33554575-45cab0a8c05f9f75d0922c149';
export const BASE_URL = 'https://pixabay.com/api/';

export function createImageCardMarkup(hit) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = hit;
  return `
    <a href="${largeImageURL}" class="gallery__link">
      <div class="gallery-item" data-source="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="280">
				<div class="info">
          <p class="info-item"> 
            <b>Likes</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${views}
          </p>

          <p class="info-item"> 
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item"> 
            <b>Downloads</b> ${downloads}
          </p>
				</div>
      </div>
    </a>
  `;
};
