import ProductCard from "./products/components/ProductCard.jsx";

const productos = [
  {
    id: 1,
    image: "https://picsum.photos/300",
    title: "Perro",
    description: "Este es un perro",
    price: 100,
  },
  {
    id: 2,
    image: "https://picsum.photos/301",
    title: "Gato",
    description: "Este es un gato",
    price: 150,
  },
];

const Products = () => {
  return (
    <section>
      {productos.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default Products;