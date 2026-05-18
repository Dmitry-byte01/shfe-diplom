/*import { Link, useLocation, Navigate } from 'react-router-dom';
import logo from '../assets/svg/logo.svg';
import DaysMenu from './DaysMenu.jsx';
import MoviesSection from './MoviesSection.jsx';

const HomePage = () => {
  const location = useLocation();
  const indexOfStartOfDay = location.pathname.lastIndexOf('/');
  const countOfDays = Number(location.pathname.slice(indexOfStartOfDay + 1));
  const invalidUrl = Number.isNaN(countOfDays);

  if (invalidUrl) {
    return <Navigate to={'/'} />;
  }

  const root = document.querySelector(':root');
  if (root) {
    root.classList.remove('root__admin');
  }

  return (
    <div className="page">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="home" />
        </Link>
        <Link to="/login">
          <button className="btn_ok btn_login" type="button">Войти</button>
        </Link>
      </header>

      <main className="client__main">
        <DaysMenu />
        <MoviesSection />
      </main>
    </div>
  );
};

export default HomePage;*/
import { Link, Navigate, useParams } from 'react-router-dom'; // изменён импорт
import logo from '../assets/svg/logo.svg';
import DaysMenu from './DaysMenu.jsx';
import MoviesSection from './MoviesSection.jsx';

const HomePage = () => {
  // ✅ Новый способ (как советует преподаватель)
  const { id } = useParams();
  const daysOffset = Number(id) || 0;
  
  // Проверка на некорректный URL (если id не число и не undefined)
  const invalidUrl = id !== undefined && isNaN(Number(id));

  if (invalidUrl) {
    return <Navigate to="/" />;
  }

  const root = document.querySelector(':root');
  if (root) {
    root.classList.remove('root__admin');
  }

  return (
    <div className="page">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="home" />
        </Link>
        <Link to="/login">
          <button className="btn_ok btn_login" type="button">Войти</button>
        </Link>
      </header>

      <main className="client__main">
        <DaysMenu />
        <MoviesSection />
      </main>
    </div>
  );
};

export default HomePage;