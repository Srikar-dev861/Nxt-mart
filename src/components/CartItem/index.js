import './cartitem.css'
import {useReactContext} from '../../context/ReactContext'

function CartItem({product}) {
  const {
    decrementCartItem,
    incrementCartItem,
    removeCartItem,
  } = useReactContext()
  const {name, price, weight, image, count: quantity} = product

  const onIncrement = () => {
    incrementCartItem(product)
  }

  const onDecrement = () => {
    if (quantity > 1) {
      decrementCartItem(product)
    } else {
      removeCartItem(product.id)
    }
  }

  return (
    <li data-testid="cartItem" className="cart-list">
      <div className="cart-li">
        <div className="cart-details">
          <img src={image} alt={name} className="cart-img" />
          <div className="cart-name-details">
            <p className="cart-name">{name}</p>
            <p className="cart-weight">{weight}</p>
            <p className="cart-price">{price}</p>
          </div>
        </div>
        <div className="cart-btn-container">
          <button
            type="button"
            data-testid="decrement-quantity"
            onClick={onDecrement}
            className="btn"
          >
            -
          </button>
          <div className="quantity" data-testid="item-quantity">
            {quantity}
          </div>
          <button
            type="button"
            data-testid="increment-quantity"
            onClick={onIncrement}
            className="btn"
          >
            +
          </button>
        </div>
      </div>
      <hr />
    </li>
  )
}

export default CartItem
