import './headerlg.css'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiLogOut} from 'react-icons/bi'
import {CiHome, CiShoppingCart} from 'react-icons/ci'
import {useReactContext} from '../../context/ReactContext' // ✅ Modern hook

function Header() {
  const navigate = useNavigate()
  const {activeTab, setNewTab} = useReactContext() // ✅ Clean modern context access

  const homeTab = activeTab === 'Home' ? 'green-color' : ''
  const cartTab = activeTab === 'Cart' ? 'green-color' : ''

  const onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <header className="header-desktop">
      <nav className="nav-container-lg">
        <Link to="/" className="links abc" onClick={() => setNewTab('Home')}>
          <img
            src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269995/nxtMart/fkvjpdhfywcpdzngq2le.png"
            alt="website logo"
            className="logo-size"
          />
        </Link>
        <ul className="ul-nav-lg">
          <li className="li-nav-lg">
            <Link to="/" className="links" onClick={() => setNewTab('Home')}>
              <span className="icons-sm">
                <CiHome />
              </span>
              <button type="button" className={`btn-header ${homeTab} abc`}>
                Home
              </button>
            </Link>
          </li>
          <li className="li-nav-lg">
            <Link
              to="/cart"
              className="links"
              onClick={() => setNewTab('Cart')}
            >
              <span className="icons-sm">
                <CiShoppingCart />
              </span>
              <button type="button" className={`btn-header ${cartTab} abc`}>
                Cart
              </button>
            </Link>
          </li>
          <li className="li-nav-lg">
            <button
              onClick={onLogoutBtn}
              className="icons-sm"
              type="button"
              aria-label="Logout"
            >
              <BiLogOut />
            </button>
            <button
              type="button"
              className="btn-header abc"
              onClick={onLogoutBtn}
            >
              Logout
              <BiLogOut />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
