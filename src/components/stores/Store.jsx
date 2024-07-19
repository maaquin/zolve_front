import { useNavigate } from "react-router-dom";
import { StoreCard } from "./StoreCard.jsx";
import { useState } from "react";

export const Stores = ({ stores = [] }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const handleNavigateToStore = (id) => {
        navigate(`/store/${id}`);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="channels-container">
            <span className="title-supreme">Stores</span>
            <div className="buscador-box">
                <input
                    type="text"
                    name="buscador"
                    placeholder="Buscar..."
                    className="buscar"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            {filteredStores.length > 0 ? (
                filteredStores.map((s) => (
                    <StoreCard
                        key={s.id}
                        _id={s._id}
                        name={s.name}
                        direction={s.direction}
                        score={s.score}
                        imgUrl={s.imgUrl}
                        handleNavigateToStore={handleNavigateToStore}
                    />
                ))
            ) : (
                <div className='nono'>No stores for this name :(</div>
            )}
        </div>
    );
}
