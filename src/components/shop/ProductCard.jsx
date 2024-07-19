const ProductCard = ({ product }) => {


  return (
    <div className="card">
      <img src={product.imgUrl} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>stock: {product.lot}</p>
      <p>{product.estado ? ('ACTIVO') : ('INACTIVO')}</p>
    </div>
  );
};

export default ProductCard;
