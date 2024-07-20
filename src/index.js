import { getBreeds, getBreedsId } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.selectEl.addEventListener('change', creatCat);

onSelectedBreeds();

function onSelectedBreeds(data) {
  getBreeds(data).then(data => {
    refs.loader.classList.replace('loader', 'is-hidden');

    let markSelect = data.map(({ name, id }) => {
      return `<option value="${id}">${name}</option>`;
    });
    refs.selectEl.insertAdjacentHTML('beforeend', markSelect);
    new SlimSelect({
      select: refs.selectEl,
    });
  });
}

function creatCat(e) {
  e.preventDefault();

  refs.loader.classList.replace('is-hidden', 'loader');
  refs.selectEl.classList.add('is-hidden');
  refs.catInfo.classList.add('is-hidden');

  const idCat = e.currentTarget.value;

  getBreedsId(idCat)
    .then(data => {
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.selectEl.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      refs.catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError() {
  refs.selectEl.classList.remove('is-hidden');
  refs.loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
