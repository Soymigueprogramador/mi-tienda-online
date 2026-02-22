import Button from '../../components/Button/Button.jsx';

const NavBar = ({ onCartClick }) => {
  return (
    <div>
      <p> Barra de navegacion </p>
      <Button onClick={onCartClick}>Carrito</Button>
    </div>
  );
};

export default NavBar;
