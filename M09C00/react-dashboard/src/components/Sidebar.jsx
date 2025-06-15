import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const {pathname} = useLocation();
  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon">
          <img
            className="w-100"
            src="assets/images/logo-DH.png"
            alt="Digital House"
          />
        </div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <a className="nav-link" href="/">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard - DH movies</span>
        </a>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Actions</div>
      <li className={`nav-item ${pathname==="/" && 'active'}`}>
        <Link className="nav-link collapsed" to="/">
          <i className="fas fa-fw fa-folder" />
          <span>HOME</span>
        </Link>
      </li>

      <li className={`nav-item ${pathname==="/movies" && 'active'}`}>
        <Link className="nav-link" to="/movies">
          <i className="fas fa-fw fa-film" />
          <span>PELICULAS</span>
        </Link>
      </li>

      <li className={`nav-item ${pathname==="/actors/list" && 'active'}`}>
        <Link className="nav-link" to="/actors/list">
          <i className="fas fa-fw fa-users" />
          <span>ACTORES</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default Sidebar;
