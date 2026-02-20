// Importando el hook, context y el componente cartContext
import { useContext } from "react";
import { CartContext } from '../context/CartContext.jsx';

const useCart = () => useContext( CartContext );

export default useCart;