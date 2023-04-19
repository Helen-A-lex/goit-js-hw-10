import './css/styles.css';
import refs from './js/refs';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', onInputSearch);

function onInputSearch(e) {
  e.preventDefault();
  const query = e.currentTarget.value.trim();
  console.log(query);

  fetchCountries('Sweden')
    .then(data => console.log(createMarkup(data)))
    .catch(error => console.log(error));
}

function createMarkup(arr) {
  //   const marKup =
  return arr
    .map(
      ({ flags: svg, name: official, capital, languages, population }) => `<li>
        <h1>"${official}"</h1>
        <img src="${svg}" alt="${official}" />
        <p>"${capital}"</p>
        <p>"${languages}"</p>
        <p>"${population}"</p>
      </li>`
    )
    .join('');
  //   countryList.innerAdjacentHTML('beforeend', marKup);
}
