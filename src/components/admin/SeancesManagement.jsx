import onChangeSeance from '../../ui/onChangeSeance.js';
import onMovingFilmToRemove from '../../ui/onMovingFilmToRemove.js';
import calcSeanceTimeInGrid from '../../util/calcSeanceTimeInGrid.js';
import getFilmColor from '../../util/getFilmBgColor.js';
import calcWidthInPercent from '../../util/calcWidthInPercent.js';

const SeancesManagement = ({
  halls,
  films,
  seances,
  dataSeances,
  setDataSeances,
  onDataChange,
  onDataSeanceRemove,
  onDataSeancesChange
}) => {
  return (
    <section className="admin-section">
      <header className="admin-section__header">
        <h2 className="admin-section__title">Сетка сеансов</h2>
      </header>

      <form
        className="admin-settings admin-settings_grid"
        onSubmit={event => onChangeSeance(event, { halls, films }, onDataChange, dataSeances, onDataSeancesChange)}
      >
        <div className="admin-settings__halls-grid">
          {halls?.map(hall => {
            return (
              <div className="admin-settings__hall-item" key={hall.id}>
                <div className="admin-settings__hall-title">{hall.hall_name}</div>
                <div className="admin-settings__hall-grid">
                  {seances.map(seance => {
                    if (seance.seance_hallid === hall.id) {
                      const filmId = seance.seance_filmid;
                      const film = films?.find(film => film.id === filmId);
                      const filmName = film?.film_name || '';
                      const seanceTimeInGrid = calcSeanceTimeInGrid(seance.seance_time);
                      const bgColor = getFilmColor(films, filmId);
                      const widthInPercent = calcWidthInPercent(filmId);

                      return (
                        <div
                          className="admin-settings__movie-in-grid"
                          onMouseDown={event => { onMovingFilmToRemove(event, onDataSeanceRemove, seance.id, { halls, films }) }}
                          style={{ left: seanceTimeInGrid + "%", backgroundColor: bgColor, width: widthInPercent + "%" }}
                          data-id={filmId}
                          key={seance.id}
                        >
                          <div className="admin-settings__movie-text">{filmName}</div>
                          <div className="admin-settings__movie-mark" data-content={seance.seance_time} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="actions actions_seance-grid">
          <button className="btn_cancel" type="button" onClick={() => setDataSeances(seances)}>Отмена</button>
          <button className="btn_ok btn_save">Сохранить</button>
        </div>
      </form>
    </section>
  );
};

export default SeancesManagement;