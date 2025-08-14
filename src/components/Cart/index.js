import './cart.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {IoCheckmarkCircleOutline} from 'react-icons/io5'

import {useReactContext} from '../../context/ReactContext'
import Footer from '../Footer'
import Header from '../Header'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'

function Cart() {
  const {cartList, setNewTab} = useReactContext()
  const navigate = useNavigate()
  const [isCheckOut, setCheckOut] = useState(false)

  const toggleCheckout = () => {
    setCheckOut(true)
  }

  const onReturnHome = () => {
    setNewTab('Home')
    navigate('/')
  }

  const renderSuccess = () => (
    <div className="checkout-bg">
      <IoCheckmarkCircleOutline color="green" size={30} />
      <h1 className="checkout-head">Payment Successful</h1>
      <p className="thank-you">Thank you for ordering</p>
      <p className="thank-you">Your Payment is successfully completed.</p>
      <button className="btn-return" onClick={onReturnHome} type="button">
        Return to Homepage
      </button>
    </div>
  )

  const renderCartItems = () => (
    <div className="cart-success">
      <h1 className="items-head">Items</h1>
      <h1 className="mobile-items-head">Items({cartList.length})</h1>
      <div className="cart-container">
        <ul className="cart-ul">
          {cartList.map(item => (
            <CartItem key={item.id} product={item} />
          ))}
        </ul>
        <CartSummary toggleCheckout={toggleCheckout} />
      </div>
    </div>
  )

  const renderEmptyCart = () => (
    <div className="empty-cart">
      <img
        src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269990/nxtMart/ybmj9lvlw4hayzbwyy6x.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1 className="cart-h1">Your cart is empty</h1>
      <button type="button" onClick={onReturnHome} className="return-home">
        Return to Homepage
      </button>
    </div>
  )

  let content = null
  if (cartList.length === 0) {
    content = renderEmptyCart()
  } else if (isCheckOut) {
    content = renderSuccess()
  } else {
    content = renderCartItems()
  }

  return (
    <div className="home-container1">
      <div className="header-lg">
        <Header />
      </div>

      {content}

      <Footer />

      <div className="header-sm">
        <Header />
      </div>
    </div>
  )
}

export default Cart
