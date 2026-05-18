/*const getFilmColor = (filmId) => {
  const filmsArr = document.querySelectorAll('.admin-settings__movie-item');
  const currentFilmItem = Array.from(filmsArr).find(filmItem => +filmItem.dataset.id === filmId);
  const currentFilmDescription = currentFilmItem?.querySelector('.admin-settings__movie-description');
  const filmComputedStyle = currentFilmDescription ? getComputedStyle(currentFilmDescription) : {};
  return filmComputedStyle.backgroundColor;
};

export default getFilmColor;*/

const getFilmColor = (films, filmId) => {
  return films.find(film => film.id === filmId)?.color;
};

export default getFilmColor;