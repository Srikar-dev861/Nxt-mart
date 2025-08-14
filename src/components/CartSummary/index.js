import './cartsummary.css'
import {useReactContext} from '../../context/ReactContext' // ✅ modern hook

function CartSummary({toggleCheckout}) {
  const {cartList} = useReactContext()

  const renderPrice = () => {
    const totalAmount = cartList.reduce(
      (acc, item) => acc + Number(item.price.slice(1)) * item.count,
      0,
    )
    return totalAmount
  }

  return (
    <div className="summary-div">
      <h1 className="summaary-p">Total ({cartList.length} items) :</h1>
      <p className="price-total" data-testid="total-price">
        {`total order cost ₹ ${renderPrice()}`}
      </p>

      <button type="button" onClick={toggleCheckout} className="checkout">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
