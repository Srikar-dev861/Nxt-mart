import './categoryitems.css'

function CategoryItems({productitems, onChangeCategoryId, categoryId}) {
  const scrollToCategory = id => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({behavior: 'smooth'})
    }
  }

  const renderCategoryButton = (id, label) => {
    const isActive = categoryId === id
    const activeClass = isActive ? 'clicked' : ''

    return (
      <li key={id} className="cat-li">
        <button
          type="button"
          className={`cat-btn ${activeClass}`}
          onClick={() => {
            onChangeCategoryId(id)
            scrollToCategory(label)
          }}
        >
          {label}
        </button>
      </li>
    )
  }

  return (
    <div className="category">
      <h1 className="cat-head">Categories</h1>
      <ul className="cat-ul">
        {renderCategoryButton('all', 'All')}
        {productitems.map(item =>
          renderCategoryButton(item.id || item.name, item.name),
        )}
      </ul>
    </div>
  )
}

export default CategoryItems
