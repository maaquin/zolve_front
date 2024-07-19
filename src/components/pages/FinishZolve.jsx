import React, { useEffect, useState } from 'react';
import mapa from '../../assets/whatZolve/mapa.png';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Modal from "react-modal";
import DropIn from 'braintree-web-drop-in-react';
import Factura from '../shop/Factura';
import { PDFDownloadLink } from '@react-pdf/renderer';

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

export const FinishZolve = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [distance, setDistance] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceD, setPriceD] = useState(0);
    const [clientToken, setClientToken] = useState(null);
    const [instance, setInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethodNonce, setPaymentMethodNonce] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).user : null;

    useEffect(() => {
        Modal.setAppElement('#root');
        fetch('/api/braintree/getToken')
            .then(response => response.json())
            .then(data => setClientToken(data.clientToken));
    }, []);

    useEffect(() => {
        if (modalIsOpen && clientToken) {
            const container = document.getElementById('dropin-container');
            if (container) {
                DropIn.create({
                    authorization: clientToken,
                    container: '#dropin-container'
                }, (err, dropinInstance) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    setInstance(dropinInstance);
                });
            }
        }
    }, [modalIsOpen, clientToken]);

    useEffect(() => {
        if (!modalIsOpen && instance) {
            instance.teardown((err) => {
                if (err) {
                    console.error('Error al cerrar la instancia de dropin:', err);
                }
                setInstance(null);
            });
        }
    }, [modalIsOpen]);

    useEffect(() => {
        const storedLocation = JSON.parse(localStorage.getItem('selectedLocation'));
        const storedStore = JSON.parse(localStorage.getItem('selectedStore'));
        const storedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

        setSelectedLocation(storedLocation);
        setSelectedStore(storedStore);
        setSelectedOptions(storedOptions);

        if (storedLocation && storedStore) {
            const storeCoords = storedStore.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
            const distance = calculateDistance(storedLocation[0], storedLocation[1], storeCoords[0], storeCoords[1]);
            setDistance(distance);

            const distanceCost = distance * 1.5; // Supongamos que el precio es $1.5 por kilómetro
            setPriceD(distanceCost);
            const optionsCost = storedOptions.reduce((total, option) => total + option.price, 0);
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

    const navigate = useNavigate();

    const goBack = () => {
        localStorage.removeItem('selectedStore');
        localStorage.removeItem('selectedLocation');
        localStorage.removeItem('selectedOptions');
        navigate("/");
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        const data = {
            date: new Date().toLocaleDateString(),
            clientName: user,
            amount: price.toFixed(2),
            items: selectedOptions.map(option => ({
                name: option.id,
                price: option.price
            }))
        };
        console.log('data ', data);
        setInvoiceData(data);
        console.log('invoice data: ',invoiceData)
    }, [selectedOptions]);

    useEffect(() => {
        if (invoiceData) {
            console.log('Invoice Data Updated:', invoiceData);
        }
    }, [invoiceData]);    

    const handlePayment = async () => {
        if (!instance) {
            console.error('Braintree instance not initialized');
            return;
        }

        setIsLoading(true);

        instance.requestPaymentMethod(async (err, payload) => {
            if (err) {
                console.error('Error al solicitar el método de pago:', err);
                setIsLoading(false);
                return;
            }

            setPaymentMethodNonce(payload.nonce);

            try {
                const response = await fetch('/api/braintree/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        paymentMethodNonce: payload.nonce,
                        amount: price
                    })
                });

                if (response.ok) {
                    closeModal();
                    navigate('/wait');
                } else {
                    console.log('recorcholis, hubo error en el pago :(');
                }
            } catch (error) {
                console.error('Ocurrió un error al procesar el pago', error);
            } finally {
                setIsLoading(false);
            }
        });
    };

    const handleCashPayment = () => {
        closeModal();
        navigate('/wait');
    };

    return (
        <>
            <div className="shopping-cart">
                <h1>Shopping Cart</h1>
                <div className="cart-details">
                    <li className="cart-item">
                        <div className="item-img">
                            <img src={mapa} alt={mapa} />
                        </div>
                        <div className="item-details">
                            <span className='name'>Mechanic store: {selectedStore ? selectedStore.name : 'Not selected'}</span>
                            <span className='description'>Distance: {distance.toFixed(2)} km</span>
                        </div>
                        <div className='remove-box'>
                            <span className="item-price">$ {priceD.toFixed(2)}</span>
                        </div>
                    </li>
                    <h2>Problems</h2>
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
                    <div className="cart-summary">
                        <h3 className="total-price">Total: ${price.toFixed(2)}</h3>
                        <button
                            className="cancel-btn"
                            onClick={goBack}
                        >
                            Cancel
                        </button>
                        <button
                            className="checkout-btn"
                            onClick={openModal}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Checkout"
                className="modal"
                overlayClassName="Overlay"
            >
                <div className='modal-content'>
                    <div className='modal-body'>
                        <h2>Payment Options</h2>
                        <PayPalScriptProvider options={{ 'client-id': 'AedhfXtM0qKwftY6xlggtP9i-WdsHVRYp0hZfekokGm4bhBeF4vZy0bbaIUZLtDW8MqGgvSNMSIr_fdK', currency: 'USD' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: {
                                                    value: price.toFixed(2)
                                                }
                                            }]
                                        });
                                    }}
                                    onApprove={async (data, actions) => {
                                        return actions.order.capture().then(async (details) => {
                                            console.log('Transaction completed by ' + details.payer.name.given_name);
                                            const invoiceData = {
                                                date: new Date().toLocaleDateString(),
                                                clientName: user,
                                                amount: price.toFixed(2),
                                                items: selectedOptions.map(option => ({
                                                    name: option.id,
                                                    price: option.price
                                                }))
                                            };
                                            setInvoiceData(invoiceData); // Guardar datos de la factura
                                            closeModal();
                                            navigate('/wait');
                                        });
                                    }}
                                />
                            </div>
                        </PayPalScriptProvider>
                        {clientToken && (
                            <div className="braintree-option">
                                <div id="dropin-container"></div>
                                <button onClick={handlePayment} disabled={isLoading}>
                                    {isLoading ? 'Processing...' : 'Pay with Credit Card'}
                                </button>
                            </div>
                        )}
                        <button
                            className="cash-payment-btn"
                            onClick={handleCashPayment}
                        >
                            Pay in Cash
                        </button>

                        Please, first dowload your invoice

                        {invoiceData && (
                            <PDFDownloadLink
                                document={<Factura invoiceData={invoiceData} />}
                                fileName="invoice.pdf"
                                className='pdf-download-button'
                            >
                                {({ loading }) => (loading ? 'Generating PDF...' : 'Download Invoice')}
                            </PDFDownloadLink>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};