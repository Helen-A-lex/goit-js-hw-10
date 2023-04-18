import './css/styles.css';
import refs from './js/refs';
import { onInputSearch } from './js/onInputSearch';
const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', onInputSearch);
