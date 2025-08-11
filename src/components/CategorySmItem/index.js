import './categorySmItem.css'
import {CiShoppingCart} from 'react-icons/ci'

function CategorySmItem({productitems, onChangeCategoryId, categoryId}) {
  const renderCategory = (id, name) => {
    const isActive = categoryId === id
    const bgClass = isActive ? 'btn-color' : ''
    const iconClass = isActive ? 'icon-color' : ''
    const textClass = isActive ? 'category-p-color' : ''

    return (
      <li key={id} className="cat-sm-li" onClick={() => onChangeCategoryId(id)}>
        <button
          aria-label={`Category ${name}`}
          type="button"
          className={`btn-icon ${bgClass}`}
        >
          <CiShoppingCart size={20} className={iconClass} />
        </button>
        <p className={`category-p-sm ${textClass}`}>{name}</p>
      </li>
    )
  }

  return (
    <nav className="bg-categ-sm">
      <ul className="ul-cat-sm">
        {renderCategory('all', 'ALL')}
        {productitems.map(item =>
          renderCategory(item.id || item.name, item.name),
        )}
      </ul>
    </nav>
  )
}

export default CategorySmItem
