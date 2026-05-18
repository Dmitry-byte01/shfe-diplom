import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import createRequest from '../api/createRequest.js';
import AddFilm from './popup/AddFilm.jsx';
import AddSeance from './popup/AddSeance.jsx';
import AddHall from './popup/AddHall.jsx';
import logoAdmin from '../assets/svg/logo_admin.svg';
import HallsManagement from './admin/HallsManagement.jsx';
import MoviesManagement from './admin/MoviesManagement.jsx';
import SeancesManagement from './admin/SeancesManagement.jsx';

const AdminPage = () => {
  // ========== ДОБАВИЛ: состояния для loading и error ==========
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // =============================================================

  const [data, setData] = useState({
    halls: [],
    films: [],
    seances: []
  });
  const [dataForSeance, setDataForSeance] = useState([]);
  const [hallConfigId, setHallConfigId] = useState('');
  const [hallRowsCount, setHallRowsCount] = useState(0);
  const [hallPlacesCount, setHallPlacesCount] = useState(0);
  const [hallConfig, setHallConfig] = useState([]);
  const [hallPriceId, setHallPriceId] = useState(0);
  const [hallPriceStandart, setHallPriceStandart] = useState(0);
  const [hallPriceVip, setHallPriceVip] = useState(0);
  const [dataSeances, setDataSeances] = useState([]);
  const [openSaleValue, setOpenSaleValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
      return;
    }

    // ДОБАВИЛ: начали загрузку
    setLoading(true);
    setError(null);

    createRequest({
      url: 'alldata',
      method: 'GET',
    })
      .then((response) => {
        // ДОБАВИЛ: проверка на ошибку в ответе
        if (response?.error) {
          setError(response.error);
          return;
        }

        if (response?.success) {
          setData(response.result);
          setHallRowsCount(response.result.halls[0]?.hall_rows ?? 0);
          setHallPlacesCount(response.result.halls[0]?.hall_places ?? 0);
          setHallConfig(response.result.halls[0]?.hall_config);
          setHallConfigId(response.result.halls[0]?.id);
          setHallPriceStandart(response.result.halls[0]?.hall_price_standart ?? 0);
          setHallPriceVip(response.result.halls[0]?.hall_price_vip ?? 0);
          setHallPriceId(response.result.halls[0]?.id ?? 0);
          setDataSeances(response.result?.seances);
          setOpenSaleValue(response.result.halls[0]?.hall_open);
        } else {
          setError('Не удалось загрузить данные');
        }
      })
      .catch((err) => {
        // ДОБАВИЛ: обработка ошибки сети
        setError(err.message || 'Ошибка подключения к серверу');
      })
      .finally(() => {
        // ДОБАВИЛ: закончили загрузку
        setLoading(false);
      });
  }, [navigate]);

  const onDataChange = (newData) => {
    setData((data) => ({ ...data, ...newData }));
  };

  const onDataHallChange = (newDataHall) => setData((data) => ({
    ...data,
    halls: data.halls.map(hall => {
      return hall.id === newDataHall.id ? newDataHall : hall;
    })
  }));

  const onDataHallValuesChange = (newDataHallValues) => {
    setHallRowsCount(newDataHallValues?.hall_rows ?? 0);
    setHallPlacesCount(newDataHallValues?.hall_places ?? 0);
    setHallConfig(newDataHallValues?.hall_config);
    setHallPriceStandart(newDataHallValues?.hall_price_standart ?? 0);
    setHallPriceVip(newDataHallValues?.hall_price_vip ?? 0);
    setOpenSaleValue(newDataHallValues?.hall_open ?? 0);
  };

  const onDataSeancesAdd = (newDataSeances) => setDataSeances((data) => ([...data, newDataSeances]));
  const onDataSeanceRemove = (id) => setDataSeances((data) => (data.filter(seance => seance.id !== id)));
  const onDataSeancesChange = (data) => setDataSeances(data.seances);
  const onDataForSeance = (newDataSeance) => setDataForSeance(newDataSeance);

  const root = document.querySelector(':root');
  if (root) {
    root.classList.add('root__admin');
  }

  // ========== ДОБАВИЛ: состояние загрузки ==========
  if (loading) {
    return (
      <div className="page">
        <header className="header">
          <Link to="/">
            <img src={logoAdmin} alt="home" />
          </Link>
        </header>
        <main className="admin-main">
          <div className="loading">Загрузка данных...</div>
        </main>
      </div>
    );
  }
  // ==================================================

  // ========== ДОБАВИЛ: состояние ошибки ==========
  if (error) {
    return (
      <div className="page">
        <header className="header">
          <Link to="/">
            <img src={logoAdmin} alt="home" />
          </Link>
        </header>
        <main className="admin-main">
          <div className="error">
            <p>⚠️ Ошибка: {error}</p>
            <button onClick={() => window.location.reload()}>Повторить</button>
          </div>
        </main>
      </div>
    );
  }
  // ==================================================

  return (
    <div className="page">
      <header className="header">
        <Link to="/">
          <img src={logoAdmin} alt="home" />
        </Link>
      </header>

      <main className="admin-main">
        <HallsManagement
          halls={data.halls}
          onDataChange={onDataChange}
          onDataHallChange={onDataHallChange}
          onDataHallValuesChange={onDataHallValuesChange}
          hallConfigId={hallConfigId}
          setHallConfigId={setHallConfigId}
          hallRowsCount={hallRowsCount}
          setHallRowsCount={setHallRowsCount}
          hallPlacesCount={hallPlacesCount}
          setHallPlacesCount={setHallPlacesCount}
          hallConfig={hallConfig}
          setHallConfig={setHallConfig}
          hallPriceId={hallPriceId}
          setHallPriceId={setHallPriceId}
          hallPriceStandart={hallPriceStandart}
          setHallPriceStandart={setHallPriceStandart}
          hallPriceVip={hallPriceVip}
          setHallPriceVip={setHallPriceVip}
          openSaleValue={openSaleValue}
          setOpenSaleValue={setOpenSaleValue}
        />

        <MoviesManagement
          films={data.films}
          onDataChange={onDataChange}
          onDataForSeance={onDataForSeance}
        />

        <SeancesManagement
          halls={data.halls}
          films={data.films}
          seances={data.seances}
          dataSeances={dataSeances}
          setDataSeances={setDataSeances}
          onDataChange={onDataChange}
          onDataSeanceRemove={onDataSeanceRemove}
          onDataSeancesChange={onDataSeancesChange}
        />
      </main>

      <AddFilm onDataChange={newData => onDataChange(newData)} />
      <AddSeance
        data={data}
        dataForSeance={dataForSeance}
        onDataSeancesAdd={onDataSeancesAdd}
      />
      <AddHall
        onDataChange={newData => onDataChange(newData)}
        onDataHallValuesChange={onDataHallValuesChange}
      />
    </div>
  );
};

export default AdminPage;