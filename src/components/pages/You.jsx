import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import { useStores } from '../../shared/hooks';
import { userPin } from "./pins/UserPin";
import { storePin } from "./pins/StorePin";

const saveLocationToLocalStorage = (location) => {
    localStorage.setItem('selectedLocation', JSON.stringify(location));
};

const saveStoreToLocalStorage = (store) => {
    localStorage.setItem('selectedStore', JSON.stringify(store));
};

export const You = () => {
    const { getStores, isFetching, allStores } = useStores();
    const [userLocation, setUserLocation] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [stores, setStores] = useState([]);
    const [executions, setExecutions] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (executions < 2) {
            getStores();
            setExecutions(executions + 1);
        }
    }, [executions, getStores]);

    useEffect(() => {
        if (allStores.length > 0) {
            const processedStores = allStores.map(store => {
                const { name, coordenadas } = store;
                return { name, coordenadas };
            });
            setStores(processedStores);
        }
    }, [allStores]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    saveLocationToLocalStorage([latitude, longitude]);
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                }
            );
        } else {
            console.error("Geolocalización no es compatible en este navegador.");
        }
    }, []);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        setUserLocation(null);
        saveLocationToLocalStorage([lat, lng]);
    };

    function MapClickHandler() {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }

    function SetViewOnUserLocation({ location }) {
        const map = useMap();

        useEffect(() => {
            if (location) {
                map.setView(location, 13);
            }
        }, [location, map]);

        return null;
    }

    const handleUserTypeSelection = () => {
        navigate("/whatProblem?");
    };

    const goBack = () => {
        localStorage.removeItem('selectedStore')
        localStorage.removeItem('selectedLocation')
        navigate("/");
    };

    const handleStoreSelection = (store) => {
        saveStoreToLocalStorage(store);
        // Aquí puedes agregar cualquier lógica adicional que necesites para el manejo de la selección de la tienda
    };

    return (
        <div className="home-container">
            <div>
                <form className="buscar-box">
                    <span className="buscar-text">Where you are?</span>
                    <br />
                    <span>Please, first choose one store and later place or adjust your location</span>
                    <br></br>
                    <span>Your location will be obtained automatically through geolocation, this may take a few minutes. But you can adjust it by clicking the map</span>
                </form>
            </div>

            <div className="map-box">
                <MapContainer
                    id="map"
                    center={userLocation || [14.64072, -90.51327]}
                    zoom={10}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer
                        className="tile-layer"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler />
                    {userLocation && (
                        <Marker position={userLocation} icon={userPin}>
                            <Popup>User location</Popup>
                        </Marker>
                    )}
                    {markerPosition && (
                        <Marker position={markerPosition} icon={userPin}>
                            <Popup>User location</Popup>
                        </Marker>
                    )}
                    <SetViewOnUserLocation location={userLocation} />
                    {stores.map((store, index) => (
                        <Marker
                            key={index}
                            position={store.coordenadas.split(',').map(coord => parseFloat(coord.trim()))}
                            icon={storePin}
                            eventHandlers={{
                                click: () => {
                                    handleStoreSelection(store);
                                },
                            }}
                        >
                            <Popup>Store: {store.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <div className="btns">
                <button 
                    className="btn-user zolve-btn" 
                    onClick={handleUserTypeSelection}
                    disabled={!localStorage.getItem('selectedStore') || !localStorage.getItem('selectedLocation')}
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