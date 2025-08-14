import './login.css'
import {useNavigate, Navigate} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {CgProfile} from 'react-icons/cg'
import {RiRotateLockLine} from 'react-icons/ri'
import {useReactContext} from '../../context/ReactContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {setNewTab} = useReactContext()
  const navigate = useNavigate()

  const bgColor = username && password ? 'login-green' : 'login-ash'

  const renderSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    setNewTab('Home')
    navigate('/', {replace: true})
  }

  const onSubmit = async event => {
    event.preventDefault()
    setErrMsg('')
    try {
      const userDetails = {username, password}
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const loginApiUrl = 'https://apis.ccbp.in/login'
      const response = await fetch(loginApiUrl, options)
      const data = await response.json()
      setPassword('')
      setUsername('')
      if (response.ok) {
        renderSuccess(data.jwt_token)
      } else {
        setErrMsg(data.error_msg)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-bg-container">
      <form className="form-container" onSubmit={onSubmit}>
        <img
          src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269995/nxtMart/fkvjpdhfywcpdzngq2le.png"
          alt="login website logo"
          className="login-logo"
        />
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <div className="input-container">
          <CgProfile />
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="input"
          />
        </div>

        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <div className="input-container">
          <RiRotateLockLine />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password"
            className="input"
          />
        </div>

        <div>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(prev => !prev)}
            id="checkbox"
          />
          <label htmlFor="checkbox" className="label">
            Show Password
          </label>
        </div>

        <button
          type="submit"
          disabled={!username || !password}
          className={`login-btn ${bgColor}`}
        >
          Login
        </button>
        {errMsg && <p className="error-msg">{errMsg}</p>}
      </form>
    </div>
  )
}

export default Login
