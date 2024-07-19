import { useListProduct, useProductById } from "../../shared/hooks/";
import { useEffect, useState } from "react";
import Header from './Header.jsx';
import ProductCard from './ProductCard.jsx';

export const ListProduct = () => {
    const { products, loading, listProducts } = useListProduct();
    const [cartListVisible, setCartListVisible] = useState(false);
    //addCart es para saber si se agrego un producto al carrito
    const [addCart, setAddCart] = useState(false);

    //verificar si existe la lista de productos en el localStorage y si no existe crearla
    //si ya existe, lo toma y le agrega el producto
    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('listCart'));
        cart.push(product);
        localStorage.setItem('listCart', JSON.stringify(cart));
        setAddCart(!addCart);
    }

    useEffect(() => {
        listProducts();
    }, [addCart]);

    return (
        <div>{Array.isArray(products) ? (
            <div>
                <div>{cartListVisible ? (<Header />) : (<Header />)}</div>
                {products.map((product) => (
                    <div key={product._id} >
                        <ProductCard product={product} />
                        <button onClick={() => addToCart(product)}>Add to cart</button>
                    </div>
                ))}
            </div>
        ) : ('no es')}
        </div>
    )
}
