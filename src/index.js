import './css/styles.css';
import refs from './js/refs';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  e.preventDefault();
  const query = e.target.value.trim();
  console.log(query);

  if (!query) {
    resetMarkup(refs.countryList);
    resetMarkup(refs.countryInfo);
    return;
  }

  fetchCountries(query)
    .then(dataCountry => {
      if (dataCountry.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (dataCountry.length >= 2 && dataCountry.length <= 10) {
        resetMarkup(refs.countryList);
        createMarkupCountryList(dataCountry);
        resetMarkup(refs.countryInfo);
      } else {
        resetMarkup(refs.countryInfo);
        createMarkupCountryInfo(dataCountry);
        resetMarkup(refs.countryList);
      }
    })

    .catch(error => {
      if (error === 404) {
        throw new Error('Data fail!');
      }
      Notiflix.Notify.failure('Oops, there is no country with that name');
      resetMarkup(refs.countryList);
      resetMarkup(refs.countryInfo);
    });
}

function createMarkupCountryList(dataCountry) {
  const markup = dataCountry
    .map(
      ({ name, flags }) => `<li class="country-list-item">
        <img class="country-list-img" src="${flags.svg}" alt="flag" width= "100" heigth="100"/>
        <p class="country-list-text">${name.official}</p>
      </li>`
    )
    .join('');
  return refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function createMarkupCountryInfo(dataCountry) {
  const markup = dataCountry
    .map(
      ({ flags, name, capital, languages, population }) => `<li class="country">
      <div class="country-name">
        <img src="${flags.svg}" alt="flag" width= "300" heigth="300"/>
        <h1>"${name.official}"</h1>
      </div>
      <ul class="country-characteristics">
        <li class="country-characteristics-item">
          <p class="country-characteristics-header">Capital:</p>
          <span class="country-characteristics-value">"${capital}"</span>
        </li>
        <li class="country-characteristics-item">
          <p class="country-characteristics-header">Population:</p>
          <span class="country-characteristics-value">"${population}"</span>
        </li>
        <li class="country-characteristics-item">
          <p class="country-characteristics-header">Languages:</p>
          <span class="country-characteristics-value"
            >"${Object.values(languages).join(', ')}"</span
          >
        </li>
      </ul>
    </li>`
    )
    .join('');
  return refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function resetMarkup(el) {
  el.innerHTML = '';
}
