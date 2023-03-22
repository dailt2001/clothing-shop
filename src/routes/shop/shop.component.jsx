import ProductCard from "../../components/product-card/product-card.component"
import SHOP_DATA from "../../shop-data"
import './shop.scss';

const Shop = () => {
  return (
    <div className="products-container">
      {SHOP_DATA[1].items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Shop