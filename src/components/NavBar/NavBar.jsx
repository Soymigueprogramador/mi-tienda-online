import { Link } from "react-router-dom"
import CartWidget from '../CartWidget/CartWidget.jsx'
import style from './NavBar.module.scss'

const NavBar = () => {
  return (
    <header>
      <Link to='/' className={ style.logo }>
        Tienda online
      </Link>

      <nav className={ style.nav }>
        <Link to='/shop'>
          Shop
        </Link>
      </nav>

      <CartWidget />
    </header>
  )
}

export default NavBar
