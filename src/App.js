import './App.css'
import {useState, useEffect, useMemo} from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ReactContext from './context/ReactContext'

function App() {
  const [cartList, setCartList] = useState([])
  const [activeTab, setNewTab] = useState('Home')

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartData')) || []
    setCartList(storedCartItems || [])

    const returnActiveId = JSON.parse(localStorage.getItem('activeId')) || ''
    setNewTab(returnActiveId)
  }, [])

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
    localStorage.setItem('activeId', JSON.stringify(activeTab))
  }, [cartList, activeTab])

  const incrementCartItem = (product, quantity) => {
    const isAlreadyExists = cartList.find(item => item.id === product.id)

    if (!isAlreadyExists) {
      const newProduct = {...product, count: quantity}
      setCartList(prev => [...prev, newProduct])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.id === product.id ? {...item, count: quantity} : item,
        ),
      )
    }
  }

  const decrementCartItem = (product, quantity) => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.id === product.id ? {...item, count: quantity} : item,
        )
        .filter(item => item.count > 0),
    )
  }

  // Wrap the context value in useMemo to prevent re-creating the object every render
  const contextValue = useMemo(
    () => ({
      cartList,
      incrementCartItem,
      decrementCartItem,
      setCartList,
      activeTab,
      setNewTab,
    }),
    [cartList, activeTab],
  )

  return (
    <ReactContext.Provider value={contextValue}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ReactContext.Provider>
  )
}

export default App
