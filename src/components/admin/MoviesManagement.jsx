import addFilm from '../../ui/btnPopupVisibility.js';
import onRemoveFilm from '../../ui/onRemoveFilm.js';
import onMovingFilmToAdd from '../../ui/onMovingFilmToAdd.js';
import getEndOfWord from '../../util/getEndOfWord.js';

const MoviesManagement = ({ films, onDataChange, onDataForSeance }) => {
  return (
    <section className="admin-section">
      <header className="admin-section__header">
        <h2 className="admin-section__title">Управление фильмами</h2>
      </header>

      <div className="admin-settings">
        <div className="admin-settings__item">
          <button className="btn_ok" type="button" onClick={event => addFilm(event)}>Добавить фильм</button>
        </div>

        <div className="admin-settings__movies">
          {films?.map(film => {
            return (
              <div
                className="admin-settings__movie-item"
                data-id={film.id}
                key={film.id}
              >
                <div
                  className="admin-settings__movie-container"
                  onMouseDown={event => { onMovingFilmToAdd(event, onDataForSeance) }}
                >
                  <img className="admin-settings__movie-img" src={film.film_poster} alt="poster" />
                  <div className="admin-settings__movie-description">
                    <div className="admin-settings__movie-title">
                      <p className="admin-settings__movie-name">{film.film_name}</p>
                      <p className="admin-settings__movie-duration" data-duration={film.film_duration}>
                        {film.film_duration} минут{getEndOfWord(film.film_duration, "минут")}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="admin-settings__btn-remove admin-settings__btn-remove_movie"
                  type="button"
                  onClick={event => { onRemoveFilm(event, film.id, onDataChange, film.film_name) }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoviesManagement;