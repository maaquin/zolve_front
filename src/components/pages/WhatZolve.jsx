import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import aceite from '../../assets/whatZolve/aceite.png';
import agua from '../../assets/whatZolve/agua.png';
import bateria from '../../assets/whatZolve/bateria.png';
import carro from '../../assets/whatZolve/carro.png';
import choque from '../../assets/whatZolve/choque.png';
import gasolina from '../../assets/whatZolve/gasolina.png';
import llanta from '../../assets/whatZolve/llanta.png';
import moto from '../../assets/whatZolve/moto.png';

const options = [
    { id: 'aceite', name: 'Lack of oil', img: aceite, price: 50, description: 'This covers the cost of the oil and the labor required to refill or change the oil.' },
    { id: 'agua', name: 'Lack of water in engine', img: agua, price: 30, description: 'This is usually a minor problem that requires refilling the coolant or radiator water.' },
    { id: 'bateria', name: 'Dead battery', img: bateria, price: 80, description: 'Includes emergency jump start service or battery replacement if necessary.' },
    { id: 'carro', name: 'Something in the car', img: carro, price: 100, description: 'This is a generic problem and could vary, but assumes a minor or moderate problem requiring diagnosis and repair.' },
    { id: 'choque', name: 'Vehicle collision', img: choque, price: 150, description: 'Vehicle collision may require additional time and effort to evaluate and possibly tow the vehicle, as well as minor repairs.' },
    { id: 'gasolina', name: 'Out of fuel', img: gasolina, price: 40, description: 'This price covers the cost of fuel assuming you have an empty tank.' },
{ id: 'llanta', name: 'Flat tire', img: llanta, price: 60, description: 'Includes on-site tire repair or replacement.' },
    { id: 'moto', name: 'Something in the motorcycle', img: moto, price: 70, description: 'Similar to the generic car problem, but specific to motorcycles, and could involve minor repairs.' }
];

const saveSelectedOptionsToLocalStorage = (selectedOptions) => {
    const selectedOptionsWithPrices = selectedOptions.map(id => {
        const option = options.find(option => option.id === id);
        return { id: option.name, price: option.price, img: option.img, description: option.description };
    });
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptionsWithPrices));
};

export const WhatZolve = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelect = (id) => {
        setSelectedOptions(prevSelected => {
            const newSelected = prevSelected.includes(id) 
                ? prevSelected.filter(optionId => optionId !== id) 
                : [...prevSelected, id];
            saveSelectedOptionsToLocalStorage(newSelected);
            return newSelected;
        });
    };    

    const navigate = useNavigate();
    const handleUserTypeSelection = () => {
        navigate("/finalPage");
    };

    const goBack = () => {
        localStorage.removeItem('selectedStore')
        localStorage.removeItem('selectedLocation')
        localStorage.removeItem('selectedOptions')
        navigate("/");
    };

    return (
        <div className="home-container">
            <span className="buscar-text">What's the problem?</span>
            <br></br>
            <l>Please select from this list the possible problems your vehicle is experiencing, you can select several options</l>
            <div className="what-zolve-container">
                {options.map(option => (
                    <div
                        key={option.id}
                        className={`option-item ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
                        onClick={() => handleSelect(option.id)}
                    >
                        <img src={option.img} alt={option.name} />
                        <p>{option.name}</p>
                    </div>
                ))}
            </div>
            <div className="btns">
                <button 
                    className="btn-user zolve-btn" 
                    onClick={handleUserTypeSelection}
                    disabled={selectedOptions.length === 0}
                >
                    Continue
                </button>
                <button 
                    className="btn-user zolve-btn" 
                    onClick={goBack}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};