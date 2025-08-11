import './content.css'
import Product from '../Product'

function Content({productDetails}) {
  return (
    <ul className="ul-content">
      {productDetails.map(item => (
        <li key={item.id || item.name} id={item.name} className="li-content">
          <p className="name1">
            {item.name} {'>'}
          </p>
          <ul className="ul-items">
            {item.products.map(product => (
              <Product key={product.id} details={product} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default Content
