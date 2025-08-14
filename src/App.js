import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import {ReactProvider} from './context/ReactContext' // ✅ Modern Provider

function App() {
  return (
    <ReactProvider>
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
    </ReactProvider>
  )
}

export default App
