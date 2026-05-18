import createHall from '../../ui/btnPopupVisibility.js';
import onRemoveHall from '../../ui/onRemoveHall.js';
import onCancelHallConfig from '../../ui/onCancelHallConfig.js';
import onChangeHallConfig from '../../ui/onChangeHallConfig.js';
import onCancelHallPrice from '../../ui/onCancelHallPrice.js';
import onChangeHallPrice from '../../ui/onChangeHallPrice.js';
import onOpenSale from '../../ui/onOpenSale.js';
import HallInList from '../HallInList.jsx';
import HallGraphic from '../HallGraphic.jsx';
import multiplication from '../../assets/svg/x.svg';
import chair from '../../assets/svg/chair.svg';
import chairVip from '../../assets/svg/chair-vip.svg';
import chairNone from '../../assets/svg/chair-none.svg';

const HallsManagement = ({ 
  halls, 
  onDataChange, 
  onDataHallChange, 
  onDataHallValuesChange,
  hallConfigId,
  setHallConfigId,
  hallRowsCount,
  setHallRowsCount,
  hallPlacesCount,
  setHallPlacesCount,
  hallConfig,
  setHallConfig,
  hallPriceId,
  setHallPriceId,
  hallPriceStandart,
  setHallPriceStandart,
  hallPriceVip,
  setHallPriceVip,
  openSaleValue,
  setOpenSaleValue
}) => {
  return (
    <>
      {/* Управление залами (список + создание) */}
      <section className="admin-section">
        <header className="admin-section__header">
          <h2 className="admin-section__title">Управление залами</h2>
        </header>

        <div className="admin-settings admin-settings_create-hall">
          <div className="admin-settings__item">
            <p className="admin-settings__title">Доступные залы:</p>
            {halls?.map(hall => (
              <div className="admin-settings__hall-name" key={hall.id}>
                <span>- {hall.hall_name}</span>
                <button
                  className="admin-settings__btn-remove"
                  type="button"
                  onClick={(event) => onRemoveHall(event, hall.id, hall.hall_name, onDataChange, onDataHallValuesChange)}
                />
              </div>
            ))}
          </div>
          <div className="actions actions_create-hall">
            <button className="btn_ok" onClick={event => createHall(event)}>Создать зал</button>
          </div>
        </div>
      </section>

      {/* Конфигурация залов (схема зала) */}
      <section className="admin-section">
        <header className="admin-section__header">
          <h2 className="admin-section__title">Конфигурация залов</h2>
        </header>

        <form
          className="admin-settings"
          onSubmit={(event) => {
            onChangeHallConfig(event, onDataHallChange, setHallConfig);
          }}
        >
          <div className="admin-settings__item">
            <p className="admin-settings__title">Выберите зал для конфигурации:</p>
            <div className="halls__list">
              {halls?.map((hall, index) => (
                <HallInList
                  hall={hall}
                  index={index}
                  key={hall.id}
                  idName="hall-configuration"
                  onClickFunc={() => {
                    setHallConfigId(hall.id);
                    setHallRowsCount(hall.hall_rows);
                    setHallPlacesCount(hall.hall_places);
                    setHallConfig(hall.hall_config);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="admin-settings__item">
            <p className="admin-settings__title">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div className="hall-size">
              <label className="admin__label hall-size__label">
                Рядов, шт
                <input
                  className="admin__input hall-size__input"
                  type="number"
                  name="rowCount"
                  value={hallRowsCount}
                  onChange={event => {
                    const rowCountValue = Number(event.currentTarget.value);
                    if (rowCountValue > 0) setHallRowsCount(rowCountValue);
                  }}
                  placeholder="10"
                  required
                />
              </label>

              <img className="admin__multiply" src={multiplication} alt="multiply" />

              <label className="admin__label hall-size__label">
                Мест, шт
                <input
                  className="admin__input hall-size__input"
                  type="number"
                  name="placeCount"
                  value={hallPlacesCount}
                  onChange={event => {
                    const placeCountValue = Number(event.currentTarget.value);
                    if (placeCountValue > 0) setHallPlacesCount(placeCountValue);
                  }}
                  placeholder="8"
                  required
                />
              </label>
            </div>
          </div>

          <div className="admin-settings__item">
            <p className="admin-settings__title">Теперь вы можете указать типы кресел на схеме зала:</p>
            <div className="chair-types">
              <span className="chair-types__item"><img src={chair} alt="chair" />— обычные кресла</span>
              <span className="chair-types__item"><img src={chairVip} alt="chair-vip" />— VIP кресла</span>
              <span className="chair-types__item"><img src={chairNone} alt="chair-none" />— заблокированные (нет кресла)</span>
            </div>
            <p className="chair-types__description">
              Чтобы изменить вид кресла, нажмите по нему{(window.innerWidth >= 1199) ? " левой кнопкой мыши" : ""}
            </p>

            <HallGraphic
              hallRowsCount={hallRowsCount}
              hallPlacesCount={hallPlacesCount}
              hallConfig={hallConfig}
              setHallConfig={newHallConfig => setHallConfig(newHallConfig)}
              isAdminPage={true}
            />
          </div>

          <div className="actions actions_halls-configuration">
            <button
              className="btn_cancel"
              type="button"
              onClick={event => onCancelHallConfig(event, { halls }, hallConfigId, setHallRowsCount, setHallPlacesCount, setHallConfig, hallConfig)}
            >
              Отмена
            </button>
            <button className="btn_ok btn_save">Сохранить</button>
          </div>
        </form>
      </section>

      {/* Конфигурация цен */}
      <section className="admin-section">
        <header className="admin-section__header">
          <h2 className="admin-section__title">Конфигурация цен</h2>
        </header>

        <form
          className="admin-settings"
          onSubmit={(event) => {
            onChangeHallPrice(event, onDataHallChange, setHallPriceStandart, setHallPriceVip);
          }}
        >
          <div className="admin-settings__item">
            <p className="admin-settings__title">Выберите зал для конфигурации:</p>
            <div className="halls__list">
              {halls?.map((hall, index) => (
                <HallInList
                  hall={hall}
                  index={index}
                  key={hall.id}
                  idName="price-configuration"
                  onClickFunc={() => {
                    setHallPriceId(hall.id);
                    setHallPriceStandart(hall.hall_price_standart);
                    setHallPriceVip(hall.hall_price_vip);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="admin-settings__item">
            <p className="admin-settings__title">Установите цены для типов кресел:</p>
            <div className="seat-price">
              <label className="admin__label seat-price__label">
                Цена, рублей
                <div className="seat-price__item">
                  <input
                    className="admin__input seat-price__input"
                    type="number"
                    name="priceStandart"
                    value={hallPriceStandart}
                    onChange={(event) => {
                      const priceStandartValue = Number(event.currentTarget.value);
                      if (priceStandartValue >= 0) {
                        setHallPriceStandart(priceStandartValue);
                      } else {
                        setHallPriceStandart(0);
                      }
                    }}
                    placeholder="0"
                    required
                  />
                  <span className="seat-price__type"> за <img src={chair} alt="chair" /> обычные кресла</span>
                </div>
              </label>

              <label className="admin__label seat-price__label">
                Цена, рублей
                <div className="seat-price__item">
                  <input
                    className="admin__input seat-price__input"
                    type="number"
                    name="priceVip"
                    value={hallPriceVip}
                    onChange={(event) => {
                      const priceVipValue = Number(event.currentTarget.value);
                      if (priceVipValue >= 0) {
                        setHallPriceVip(priceVipValue);
                      } else {
                        setHallPriceVip(0);
                      }
                    }}
                    placeholder="0"
                    required
                  />
                  <span className="seat-price__type">за <img src={chairVip} alt="chair-vip" /> VIP кресла</span>
                </div>
              </label>
            </div>
          </div>

          <div className="actions actions_price-configuration">
            <button
              className="btn_cancel"
              type="button"
              onClick={event => onCancelHallPrice(event, { halls }, hallPriceId, setHallPriceStandart, setHallPriceVip)}>
              Отмена
            </button>
            <button className="btn_ok btn_save">Сохранить</button>
          </div>
        </form>
      </section>

      {/* Открыть продажи */}
      <section className="admin-section">
        <header className="admin-section__header">
          <h2 className="admin-section__title">Открыть продажи</h2>
        </header>

        <form
          className="admin-settings"
          onSubmit={(event) => {
            onOpenSale(event, onDataChange, openSaleValue, setOpenSaleValue);
          }}
        >
          <div className="admin-settings__item">
            <p className="admin-settings__title admin-settings__title_open-sale">
              Выберите зал для открытия/закрытия продаж:
            </p>

            <div className="halls__list">
              {halls?.map((hall, index) => (
                <HallInList
                  hall={hall}
                  index={index}
                  key={hall.id}
                  idName="open-sale"
                  onClickFunc={() => {
                    setOpenSaleValue(hall.hall_open);
                  }}
                />
              ))}
            </div>
          </div>

          <p className="admin-settings__description">
            {openSaleValue === 0 ? "Всё готово к открытию" : ""}
          </p>
          <div className="actions actions_open-sale">
            <button className="btn_ok">
              {openSaleValue === 0 ? "Открыть продажу билетов" : "Приостановить продажу билетов"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default HallsManagement;