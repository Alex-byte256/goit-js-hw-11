import axios from 'axios';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.visibility = 'hidden';

let numPage = 1;

let photoName = '';

console.log(refs.formEl);

const API_KEY = '32190831-932b1a3f6204f940916e3fe08';

function makeMarkup(arr) {
  arr.forEach(el => {
    refs.galleryEl.insertAdjacentHTML(
      'beforeend',
      `
		<div class="photo-card">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${el.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${el.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${el.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${el.downloads}</b>
    </p>
  </div>
</div>
		`
    );
  });
}

async function fetchImg(photoName, nPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const queryParams = {
    params: {
      key: API_KEY,
      q: photoName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: nPage,
    },
  };

  return await axios
    .get(`${BASE_URL}`, queryParams)
    .then(res => makeMarkup(res.data.hits));
}

refs.formEl.addEventListener('submit', e => {
  refs.loadMoreBtn.style.visibility = 'visible';
  refs.galleryEl.innerHTML = '';

  e.preventDefault();

  const formElement = e.currentTarget.elements;
  photoName = formElement.searchQuery.value;

  fetchImg(photoName, numPage);
});

refs.loadMoreBtn.addEventListener('click', () => {
  fetchImg(photoName, numPage + 1);
});
