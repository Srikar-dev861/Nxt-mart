import './home.css'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import Header from '../Header'
import CategoryItems from '../CategoryItems'
import Content from '../Content'
import Footer from '../Footer'
import CategorySmItem from '../CategorySmItem'

const API_STATUS = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

function Home() {
  const [productsData, setProductsData] = useState([])
  const [apiStatus, setApiStatus] = useState(API_STATUS.INITIAL)
  const [categoryId, setCategoryId] = useState('all')

  const onChangeCategoryId = id => {
    setCategoryId(id)
  }

  const fetchCategoryList = async () => {
    try {
      setApiStatus(API_STATUS.IN_PROGRESS)
      const apiUrl = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        setProductsData(data.categories)
        setApiStatus(API_STATUS.SUCCESS)
      } else {
        setApiStatus(API_STATUS.FAILURE)
      }
    } catch (error) {
      console.error(error)
      setApiStatus(API_STATUS.FAILURE)
    }
  }

  useEffect(() => {
    fetchCategoryList()
  }, [])

  const renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots height={80} width={80} color="#263868" />
    </div>
  )

  const onRetryBtn = () => {
    fetchCategoryList()
  }

  const renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dtc3rf1du/image/upload/v1718269991/nxtMart/eutnohgrrguctkbjqecr.png"
        alt="failure view"
        className="failure-img"
      />
      <h2 className="failure-head">Oops! Something Went Wrong</h2>
      <p className="failure-para">We are having some trouble</p>
      <button type="button" onClick={onRetryBtn} className="failure-btn">
        Retry
      </button>
    </div>
  )

  const renderSuccess = () => (
    <>
      <CategorySmItem
        onChangeCategoryId={onChangeCategoryId}
        categoryId={categoryId}
        productitems={productsData}
        className="fixed-top"
      />
      <div className="items">
        <CategoryItems
          onChangeCategoryId={onChangeCategoryId}
          categoryId={categoryId}
          productitems={productsData}
        />
        <Content productDetails={productsData} />
      </div>
      <Footer />
    </>
  )

  const renderSwitchOperation = () => {
    switch (apiStatus) {
      case API_STATUS.IN_PROGRESS:
        return renderLoading()
      case API_STATUS.SUCCESS:
        return renderSuccess()
      case API_STATUS.FAILURE:
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <div className="home-container1">
      <Header />
      {renderSwitchOperation()}
    </div>
  )
}

export default Home
