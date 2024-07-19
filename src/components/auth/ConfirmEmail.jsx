import React from 'react';

export const CheckEmail = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>¡Registro Exitoso!</h2>
      <p style={styles.message}>Hemos enviado un correo de confirmación a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para confirmar tu cuenta.</p>
      <p style={styles.message}>Puedes acceder a tu correo electrónico utilizando uno de los siguientes enlaces:</p>
      <div style={styles.linksContainer}>
        <a style={styles.link} href="https://outlook.live.com" target="_blank" rel="noopener noreferrer">Outlook</a>
        <a style={styles.link} href="https://mail.google.com" target="_blank" rel="noopener noreferrer">Gmail</a>
        <a style={styles.link} href="mailto:">Correo Predeterminado</a>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#fff',
    },
    message: {
      fontSize: '16px',
      marginBottom: '20px',
      color: '#e6e6e6',
      textAlign: 'center',
    },
    linksContainer: {
      display: 'flex',
      gap: '20px',
    },
    link: {
      fontSize: '16px',
      color: '#5979a4',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
  };