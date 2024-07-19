import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import dropin from 'braintree-web-drop-in';
import axios from 'axios';
import { useListCards, useDeleteCard } from '../../../shared/hooks';
import { LoadingSpinner } from '../../LoadingSpinner';

export const Cards = () => {
    const { cards, isFetching } = useListCards();
    const { deleteCard, isLoading: isLoadingDelete } = useDeleteCard();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [instance, setInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clientToken, setClientToken] = useState(null);

    useEffect(() => {
        if (modalIsOpen) {
            const fetchClientToken = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:3000/zolve/v1/settings/token');
                    setClientToken(response.data.clientToken);
                    console.log(response.data.clientToken);
                } catch (error) {
                    console.error('Error al obtener el token del cliente:', error);
                }
            };
            fetchClientToken();
        }
    }, [modalIsOpen]);

    useEffect(() => {
        if (modalIsOpen && clientToken) {
            const container = document.getElementById('dropin-container');
            if (container) {
                dropin.create({
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

    const handleDelete = (token) => {
        deleteCard(token);
    };

    const handleNewCard = async () => {
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

            try {
                const response = await axios.post('http://127.0.0.1:3000/zolve/v1/settings/newCard', {
                    customerId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null,
                    paymentMethodNonce: payload.nonce
                });

                if (response.error) {
                    console.error(response.error?.message || 'Ocurrió un error, inténtalo de nuevo');
                } else {
                    console.log('Nueva tarjeta añadida exitosamente');
                }
            } catch (error) {
                console.error('Ocurrió un error, inténtalo de nuevo');
            } finally {
                setIsLoading(false);
            }
        });
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    if (isFetching) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div>
                <ul>
                    {cards.map(card => (
                        <li key={card.token}>
                            {card.cardType} **** {card.last4}
                            <button onClick={() => handleDelete(card.token)} disabled={isLoadingDelete}>
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
                <button type="submit" className="save-btn" onClick={openModal}>
                    Nueva forma de pago
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Agregar Tarjeta"
                className="modal"
                overlayClassName="Overlay"
            >
                <div className='modal-content'>
                    <div className='modal-body'>
                        <h2>Agregar nueva tarjeta</h2>
                        <div id="dropin-container"></div>
                        <button onClick={handleNewCard} disabled={isLoading}>
                            {isLoading ? 'Guardando...' : 'Guardar tarjeta'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};