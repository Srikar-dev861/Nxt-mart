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

  // ✅ Add or increase product count
  const incrementCartItem = product => {
    setCartList(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? {...item, count: item.count + 1} : item,
        )
      }
      return [...prev, {...product, count: 1}]
    })
  }

  // ✅ Decrease count, and remove if count is 0
  const decrementCartItem = product => {
    setCartList(prev =>
      prev
        .map(item =>
          item.id === product.id ? {...item, count: item.count - 1} : item,
        )
        .filter(item => item.count > 0),
    )
  }

  // Optional: direct remove
  const removeCartItem = id => {
    setCartList(prev => prev.filter(item => item.id !== id))
  }

  const value = useMemo(
    () => ({
      cartList,
      incrementCartItem,
      decrementCartItem,
      removeCartItem,
      setCartList,
      activeTab,
      setNewTab,
    }),
    [cartList, activeTab],
  )

  return <ReactContext.Provider value={value}>{children}</ReactContext.Provider>
}

// Custom hook
export function useReactContext() {
  const context = useContext(ReactContext)
  if (!context) {
    throw new Error('useReactContext must be used within a ReactProvider')
  }
  return context
}
