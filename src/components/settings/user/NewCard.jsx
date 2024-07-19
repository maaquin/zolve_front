import React, { useEffect } from 'react';
import { useNewCard } from '../../../shared/hooks';
import Modal from 'react-modal';

export const AddCardModal = ({ isOpen, onRequestClose }) => {
    const { instance, isLoading, newCard, modalIsOpen, setModalIsOpen } = useNewCard();

    useEffect(() => {
        if (modalIsOpen && instance === null) { // Verifica si el modal está abierto y el instance no está inicializado
            console.log('Fetching client token...');
            // No es necesario hacer nada aquí, la lógica de obtener el token se maneja en useNewCard
        }
    }, [modalIsOpen, instance]);

    useEffect(() => {
        if (instance) {
            console.log('Braintree instance loaded');
        }
    }, [instance]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Agregar Tarjeta"
            className="modal"
            overlayClassName="Overlay"
        >
            <div className='modal-content'>
                <div className='modal-body'>
                    <h2>Agregar nueva tarjeta</h2>
                    <div id="dropin-container"></div>
                    <button onClick={newCard} disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar tarjeta'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};