// src/context/ReactContext.js
import {createContext, useContext, useState, useEffect, useMemo} from 'react'

const ReactContext = createContext()

export function ReactProvider({children}) {
  const [cartList, setCartList] = useState([])
  const [activeTab, setNewTab] = useState('Home')

  // Load from localStorage on mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartData')) || []
    setCartList(storedCartItems)

    const storedActiveId =
      JSON.parse(localStorage.getItem('activeId')) || 'Home'
    setNewTab(storedActiveId)
  }, [])

  // Save to localStorage whenever data changes
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
    setCartList(prev =>
      prev
        .map(item =>
          item.id === product.id ? {...item, count: quantity} : item,
        )
        .filter(item => item.count > 0),
    )
  }

  // useMemo prevents re-creating the context object every render
  const value = useMemo(
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

  return <ReactContext.Provider value={value}>{children}</ReactContext.Provider>
}

// Custom hook for easy usage
export function useReactContext() {
  const context = useContext(ReactContext)
  if (!context) {
    throw new Error('useReactContext must be used within a ReactProvider')
  }
  return context
}
