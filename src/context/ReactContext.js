import React from 'react'

const ReactContext = React.createContext({
  cartList: [],
  incrementCartItem: () => {},
  decrementCartItem: () => {}, // fixed spelling
})

export default ReactContext
