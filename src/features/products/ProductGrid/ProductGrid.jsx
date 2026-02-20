import style from './ProductGrid.module.scss';
import ProductsCard from '../components/ProductCard.jsx';
import useProducts from '../hooks/useProducts.jsx';

const ProductGrid = () => {
  const { products, loading } = useProducts();

  if( loading ) return <p> Cargando productos... </p>;

    return (
    <>
        <section className={ style.grid }>
            {
                products.map(( product ) => {
                    <ProductsCard
                        hey={ product.id }
                        product={ product }
                    />
                })
            }
        </section>
    </>
  )
}

export default ProductGrid;