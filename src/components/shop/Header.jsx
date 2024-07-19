// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
//import { CartContext } from './Context';
//import Cart from './Cart';
//import './Header.css';

const Header = () => {
    //cartVisible: estado para mostrar el carrito
    const [cartVisible, setCartVisible] = useState(false);
    //deleteItemCart: estado para renderizar el cambio de la lista de productos 
    const [deleteItemCart, setDeleteItemCart] = useState(false);

    useEffect(() => {
        listItems();
    }, []);
    //verificar si existe la lista de productos en el localStorage
    const verifyList = () => {
        if (localStorage.getItem('listCart') === null) {
            localStorage.setItem('listCart', JSON.stringify([]));
        }
    }
    //eliminar todos los productos de la lista
    const deleteAll = () => {
        localStorage.setItem('listCart', JSON.stringify([]));
        //valor para que se pueda renderizar el cambio
        setDeleteItemCart(false);
        //valor para que se pueda renderizar el cambio luego de 10ms
        setTimeout(() => {
            setDeleteItemCart(true);
        }, 10);
    }
    
    //obtener la lista de productos
    const getList = () => {
        verifyList();
        return JSON.parse(localStorage.getItem('listCart'));
    }

    const listItems = () => {
        verifyList();
        const lista = JSON.parse(localStorage.getItem('listCart'));
        return lista.length;
    }

    const handleSelect = (event) => {
        event.preventDefault();
        //mostrar el carrito
        setCartVisible(!cartVisible);
        //valor para que se pueda renderizar el cambio
        setDeleteItemCart(true);
    }

    const deleteItem = (index) => {
        const cart = JSON.parse(localStorage.getItem('listCart'));
        cart.splice(index, 1);
        localStorage.setItem('listCart', JSON.stringify(cart));
        //valor para que se pueda renderizar el cambio
        setDeleteItemCart(false);
        //valor para que se pueda renderizar el cambio luego de 10ms
        setTimeout(() => {
            setDeleteItemCart(true);
        }, 10);
    }

    return (
        <div className="header-container">
            <h1>Shopping Cart</h1>
            <button onClick={handleSelect}>
                List: {listItems()}
            </button>
            <div>
                {cartVisible ? (
                    <div>
                        <h3>Cart</h3>
                        {getList().length > 0 ? (deleteItemCart ? (getList().map((product, index) => (
                            <div key={index} >
                                <p>{product.name}</p>
                                <button onClick={(index) => deleteItem(index)}>delete</button>
                            </div>
                        ))) : (
                            <div>Cargando...</div>
                        )) : (
                            <p>No hay productos</p>
                        )
                        }
                        <button onClick={deleteAll}>delete all</button>
                        <button>pay products</button>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default Header;
