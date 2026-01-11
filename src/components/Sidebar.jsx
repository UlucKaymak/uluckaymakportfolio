import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Sidebar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isProjectsPage = location.pathname === '/projects';

  useEffect(() => {
    if (isProjectsPage) {
      setIsDropdownOpen(true);
    }
  }, [isProjectsPage]);

  const toggleDropdown = () => {
    if (!isProjectsPage) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <aside className="left-sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item">
            <Link to="/" className="nav-link">UluçKaymak</Link>
          </li>
          <li
            className={`nav-item nav-item-with-dropdown ${isDropdownOpen ? 'open' : ''}`}
            onMouseEnter={() => !isProjectsPage && setIsDropdownOpen(true)}
            onMouseLeave={() => !isProjectsPage && setIsDropdownOpen(false)}
          >
            <Link to="/projects" className="nav-link">#AllProjects</Link>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/projects?filter=AlbumCoverArt"
                  className="dropdown-link"
                >
                  #AlbumCoverArts
                </Link>
              </li>
              <li>
                <Link
                  to="/projects?filter=VideoGame"
                  className="dropdown-link"
                >
                  #VideoGames
                </Link>
              </li>
              <li>
                <Link
                  to="/projects?filter=Soundtrack"
                  className="dropdown-link"
                >
                  #Soundtracks
                </Link>
              </li>
              <li>
                <Link
                  to="/projects?filter=ArtPiece"
                  className="dropdown-link"
                >
                  #ArtPieces
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/aboutme" className="nav-link">AboutMe</Link>
          </li>
          <li className="nav-item">
            <a href="https://linktr.ee/UlucKaymak" className="nav-link">🔗 MyLinks</a>
          </li>
          <li className="nav-item">
            <a href="https://uluckaymak.github.io" className="nav-link">🔗 Uluc98.exe</a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>&copy; 2026 UluçKaymak</p>
      </div>
    </aside>
  );
}

export default Sidebar;
