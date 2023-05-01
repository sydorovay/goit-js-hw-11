// Імпортуємо модулі:
import { Notify } from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { API_KEY, BASE_URL, createImageCardMarkup } from './js/config';

//  Отримуємо посилання на елементи DOM
const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.getElementById('search-form');
const loadMoreBtnEl = document.querySelector('.load-more');

// Ініціалізуємо змінні:
let searchQuery = '';
let page = 1;
let lightbox;

// приховуємо кнопку loadMore
loadMoreBtnEl.style.display = 'none';

//  Обробляємо надсилання форми
const handleSearchFormSubmit = event => {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  galleryEl.innerHTML = '';
  renderImageCards();
  loadMoreBtnEl.style.display = 'none';
};

// Обробляємо подію 'Click' кнопки 'LoadMore', збільшуємо номер сторінки 
const handleLoadMoreBtnClick = async () => {
  page += 1;
  await renderImageCards();
  scrollToNewCards();
};

	//  Обчислюємо позицію прокрутки, щоб показати щойно завантажені картки
const scrollToNewCards = () => {
  const { height: cardHeight } =
    galleryEl.lastElementChild.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetScrollTop = scrollTop + cardHeight * 2;
  window.scroll({ top: targetScrollTop, behavior: 'smooth' });
};

// Визначаємо функцію для візуалізації карток зображень:
const renderImageCards = async () => {
  try {
    const response = await getImagesFromAPI();
    const { hits, totalHits } = response.data;

    if (!hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const imageCardsMarkup = hits
      .map(hit => createImageCardMarkup(hit))
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', imageCardsMarkup);

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {});
    } else {
      lightbox.refresh();
    }

    if (hits.length < 40) {
      loadMoreBtnEl.style.display = 'none';
      Notify.info(
        `Hooray! We found ${totalHits} images. We're sorry, but you've reached the end of search results.`
      );
    } else {
      loadMoreBtnEl.style.display = 'block';
      Notify.success(
        `Hooray! We found ${totalHits} images. Showing results ${
          (page - 1) * 40 + 1
        }-${(page - 1) * 40 + hits.length}.`
      );
    }
  } catch (error) {
    console.log(error);
    Notify.failure('Oops! Something went wrong. Please try again.');
  }
};

const getImagesFromAPI = async () => {
  return axios.get(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
};

// Додаємо прослуховувач подій до форми пошуку
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
// Додаємо прослуховувач подій до кнопки 'LoadMore'
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
