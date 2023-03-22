import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";
import './cart-icon.scss'

const CartIcon = ({ isCartOpen, setIsCartOpen}) => {
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    const { cartCount } = useContext(CartContext);
    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon;
