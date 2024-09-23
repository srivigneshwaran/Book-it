/* eslint-disable react/prop-types */
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useState, useEffect } from 'react';

function Header({ onSelect , activetab }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onTouch = (val) => {
    onSelect(val);
    setMenuOpen(false); // Close menu on selection
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => {
      const newState = !prevMenuOpen;
      console.log("Toggling menu. Previous state:", prevMenuOpen, "New state:", newState);
      return newState;
    });
  };

  useEffect(() => {
    console.log("Menu open state has changed:", menuOpen);
  }, [menuOpen]);

  if (!user || user.message) {
    return (
      <header className='header'>
        <div className="logo">
          <Link to='/'> <Logo width='70px' /> </Link>
        </div>
        <div className='head-register'>
          <h1>Register</h1>
        </div>
        <Link to='/login'>
          <div className='login-button'>
            <FaSignInAlt />Login
          </div>
        </Link>
      </header>
    );
  }

  if (user) {
    const { role } = user;
    return (
      <header className='header'>
        <div className="logo">
          <Link to='/'> <Logo width='70px' /> </Link>
        </div>
        <button className='menu-toggle' onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <ul className='nav-items'>
            {role === 'admin' ? (
              <>
                <li>
                  <button className={`tab ${activetab == 1 && 'underline'}`}  onClick={() => onTouch(1)}> Home</button>
                </li>
                <li>
                  <button className={`tab ${activetab == 2 && 'underline'}`}onClick={() => onTouch(2)}>Events</button>
                </li>
                <li>
                  <button className={`tab ${activetab == 3 && 'underline'}`}onClick={() => onTouch(3)}>Halls</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className={`tab ${activetab == 4 && 'underline'}`} onClick={() => onTouch(4)}>Reserve</button>
                </li>
                <li>
                  <button className={`tab ${activetab == 2 && 'underline'}`} onClick={() => onTouch(2)}>Events</button>
                </li>
                <li>
                  <button className={`tab ${activetab == 5 && 'underline'}`} onClick={() => onTouch(5)}>Bookings</button>
                </li>
              </>
            )}
          </ul>
          <button className='btn' onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </header>
    );
  }
}

export default Header;
