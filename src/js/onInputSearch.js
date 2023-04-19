export function onInputSearch(e) {
  e.preventDefault();
  const query = e.currentTarget.value;
  console.log(query);
}
