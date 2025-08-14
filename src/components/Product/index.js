import './product.css'
import {useState} from 'react'
import {useReactContext} from '../../context/ReactContext' // ✅ modern context hook

function Product({details}) {
  const [quantity, setQuantity] = useState(0)
  const {decrementCartItem, incrementCartItem} = useReactContext() // ✅ no useContext(ReactContext) anymore

  const {name, price, weight, image} = details

  const onDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      decrementCartItem(details, newQuantity)
    }
  }

  const onIncrement = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    incrementCartItem(details, newQuantity)
  }

  return (
    <li className="li-items" data-testid="product">
      <img src={image} alt={name} className="img-size" />
      <div className="overflow-name">
        <p className="product-name">{name}</p>
      </div>
      <div className="product-details">
        <div className="details">
          <p className="weight">{weight}</p>
          <p className="price">{price}</p>
        </div>

        {quantity === 0 ? (
          <button
            type="button"
            data-testid="add-button"
            onClick={onIncrement}
            className="add-btn"
          >
            Add
          </button>
        ) : (
          <div className="quantity-container1">
            <button
              type="button"
              data-testid="decrement-count"
              onClick={onDecrement}
              className="btm"
            >
              -
            </button>
            <button
              type="button"
              className="count1 btm"
              data-testid="active-count"
            >
              {quantity}
            </button>
            <button
              type="button"
              data-testid="increment-count"
              className="btm"
              onClick={onIncrement}
            >
              +
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default Product
