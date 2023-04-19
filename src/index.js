import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  submitBtn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// elements.input.addEventListener('input', value);

// function value() {
// 	console.log(elements.input.value)
// }

const axionsResponse = async () => {
  try {
    const axiosGet = await axios.get(
      'https://pixabay.com/api/?key=33554575-45cab0a8c05f9f75d0922c149&q=yellow+flowers&image_type=photo'
    );
    console.log(axiosGet.data.hits);
  } catch (error) {
    console.log(error);
  }
};
axionsResponse();
