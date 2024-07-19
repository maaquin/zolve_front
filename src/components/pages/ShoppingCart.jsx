import React, { useEffect, useState } from 'react';
import mapa from '../../assets/whatZolve/mapa.png';
import { useNavigate } from 'react-router-dom';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en kilómetros
};

export const Cart = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [distance, setDistance] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceD, setPriceD] = useState(0);

    useEffect(() => {
        const storedLocation = JSON.parse(localStorage.getItem('selectedLocation'));
        const storedStore = JSON.parse(localStorage.getItem('selectedStore'));
        const storedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

        setSelectedLocation(storedLocation);
        setSelectedStore(storedStore);
        setSelectedOptions(storedOptions);

        console.log(selectedStore)

        if (storedLocation && storedStore) {
            const storeCoords = storedStore.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
            const distance = calculateDistance(storedLocation[0], storedLocation[1], storeCoords[0], storeCoords[1]);
            setDistance(distance);

            const distanceCost = distance * 1.5; // Supongamos que el precio es $1.5 por kilómetro
            setPriceD(distanceCost);
            const optionsCost = storedOptions ? storedOptions.reduce((total, option) => total + option.price, 0) : 0;
            setPrice(distanceCost + optionsCost);
        }
    }, []);

    const removeOption = (id) => {
        const updatedOptions = selectedOptions.filter(option => option.id !== id);
        setSelectedOptions(updatedOptions);
        localStorage.setItem('selectedOptions', JSON.stringify(updatedOptions));

        const optionsCost = updatedOptions.reduce((total, option) => total + option.price, 0);
        const distanceCost = distance * 1.5;
        setPrice(distanceCost + optionsCost);
    };

    return (
        <div className="shopping-cart">
            <h1>Shopping Cart</h1>
            <div className="cart-details">
                <li className="cart-item">
                    <div className="item-img">
                        <img src={mapa} alt="Mapa" />
                    </div>
                    <div className="item-details">
                        <span className='name'>Mechanic store: {selectedStore ? selectedStore.name : 'you must select a store'}</span>
                        <span className='description'>Distance: {distance.toFixed(2)} km</span>
                    </div>
                    <div className='remove-box'>
                        <span className="item-price">$ {priceD.toFixed(2)}</span>
                    </div>
                </li>
                <h2>Problems</h2>
                {selectedOptions && selectedOptions.length > 0 ? (
                    <ul className="cart-items">
                        {selectedOptions.map(option => (
                            <li key={option.id} className="cart-item">
                                <div className="item-img">
                                    <img src={option.img} alt={option.id} />
                                </div>
                                <div className="item-details">
                                    <span className='name'>{option.id}</span>
                                    <span className='description'>{option.description}</span>
                                </div>
                                <div className='remove-box'>
                                    <span className="item-price">${option.price.toFixed(2)}</span>
                                    <button onClick={() => removeOption(option.id)} className="remove-btn">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You do not have selected products/services</p>
                )}
                <div className="cart-summary">
                    <h3 className="total-price">Total: ${price.toFixed(2)}</h3>
                    <button
                        className="checkout-btn"
                        disabled={!selectedStore}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};