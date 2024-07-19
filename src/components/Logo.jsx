import logo from '../assets/logo.png'

export const Logo = ({ text }) => {
    return (
        <div className='auth-form-logo-container' style={{ textAlign: 'center' }}>
            <img src={logo} alt='Logo' style={{ width: '200px', height: 'auto' }} />
            <span className='logo-text'>{text}</span>
        </div>
    )
}
