import { useState } from 'react'
import { LogoRegister } from './LogoRegister'
import { Input } from './Input'
import {
    validationEmail,
    validatePassword,
    validateUsername,
    validateConfirmPassword
} from '../shared/validators'
import { useRegister } from '../shared/hooks'

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        passwordConfirm: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
    })

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsModalOpen, setTermsModalOpen] = useState(false);
    const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'email':
                isValid = validationEmail(value)
                break

            case 'password':
                isValid = validatePassword(value)
                break

            case 'passwordConfirm':
                isValid = validateConfirmPassword(formState.password.value, value)
                break

            case 'username':
                isValid = validateUsername(value)
                break

            default:
                break
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    };

    const handleRegister = (event) => {
        event.preventDefault()

        if (termsAccepted) {
            register(formState.username.value, formState.password.value, formState.email.value);
        } else {
            alert("You must accept the terms and conditions & privacy policy to register.");
        }
    };

    const isSubmitButtonDisable = isLoading || !formState.username.isValid || !formState.email.isValid || 
    !formState.password.isValid || !formState.passwordConfirm.isValid || !termsAccepted;

    return (
        <div className="register-container">
            <LogoRegister text={'Register'} />
            <form className='auth-form'>
                <div className="input-box">
                    <Input
                        field='email'
                        placeholder='Email'
                        className='login-input'
                        value={formState.email.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="input-box">
                    <Input
                        field='username'
                        placeholder='User name'
                        className='login-input'
                        value={formState.username.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="input-box">
                    <Input
                        field='password'
                        placeholder='Password'
                        className='login-input'
                        value={formState.password.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    <i className="fa-solid fa-key"></i>
                </div>
                <div className="input-box">
                    <Input
                        field='passwordConfirm'
                        placeholder='Password Confirmation'
                        className='login-input'
                        value={formState.passwordConfirm.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    <i className="fa-solid fa-lock"></i>
                </div>
                <div className="terms-and-conditions">
                    <label className='check-box'>
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                        />
                        I accept the
                    </label>
                    <span
                        onClick={() => setTermsModalOpen(true)}
                        style={{ color: '#810000', cursor: 'pointer' }}
                    >
                        Terms and Conditions
                    </span>
                    &
                    <span
                        onClick={() => setPrivacyModalOpen(true)}
                        style={{ color: '#810000', cursor: 'pointer' }}
                    >
                        Privacy Policy
                    </span>
                </div>
                <button onClick={handleRegister} disabled={isSubmitButtonDisable}>
                    Register
                </button>
            </form>
            <span onClick={switchAuthHandler} className="auth-form-switch-label">
                Already have you an account? log in now!
            </span>
            {termsModalOpen && (
                <div className="terms-modal-overlay">
                    <div className="terms-modal">
                        <h2>Terms and Conditions</h2>
                        <p>Terms and Conditions of Use of the Application
                            Welcome to our application. By using our services, you agree to comply with the following terms
                            and conditions:
                            <br></br>
                            1. Service Description Our application acts as an intermediary between users and
                            mechanic shops. We provide a platform where users can find nearby mechanic services
                            in case of vehicular emergencies.
                            <br></br>
                            2. Limitation of Liability We are limited to providing a platform for connecting users with
                            mechanic service providers. We are not responsible for any damage, theft, assault, or
                            any other type of incident that may occur during the provision of mechanic services.
                            Users agree that any claims must be directed to the service provider.
                            <br></br>
                            3. Credit Card Usage<br></br>
                            ○ Users can register and use their credit cards to pay for services through our
                            application.
                            <br></br>
                            ○ We use Stripe to process payments. Stripe securely stores and handles payment
                            information.
                            <br></br>
                            ○ We do not store sensitive credit card information in our database.
                            <br></br>
                            ○ Users agree that processing fees may apply and will be added to the total service
                            cost.
                            <br></br>
                            4. Fees
                            <br></br>
                            ○ Fees for using our application and services provided by mechanics will be clearly
                            specified before completing a transaction.
                            <br></br>
                            ○ We reserve the right to modify the fees at any time, with prior notice to users.
                            <br></br>
                            5. User Conduct<br></br>
                            ○ Users must behave respectfully and appropriately during interactions with service
                            providers.
                            <br></br>
                            ○ Any inappropriate, violent, or illegal behavior may result in the suspension or
                            termination of the user's account.
                            <br></br>
                            6. Privacy
                            <br></br>
                            ○ We respect your privacy and handle your personal information in accordance
                            with our Privacy Policy.
                            <br></br>
                            ○ For more details, please refer to our Privacy Policy available on our website.
                            <br></br>
                            7. Modifications
                            <br></br>
                            ○ We reserve the right to modify these terms and conditions at any time.
                            <br></br>
                            ○ We will notify users of any significant changes through the application or by
                            email.
                            <br></br>
                            8. Governing Law
                            <br></br>
                            ○ These terms and conditions are governed by the laws of the country where our
                            company is registered.
                            <br></br>
                            ○ Any disputes will be resolved in the competent courts of that jurisdiction.
                            <br></br>
                            If you have any questions about these terms and conditions, please contact us through our
                            customer service</p>
                        <button onClick={() => {
                            setTermsAccepted(true);
                            setTermsModalOpen(false);
                        }}>
                            Accept
                        </button>
                    </div>
                </div>
            )}
            {privacyModalOpen && (
                <div className="terms-modal-overlay">
                    <div className="terms-modal">
                        <h2>Privacy Policy</h2>
                        <p>At Zolve, we are committed to protecting your privacy and ensuring that your personal information 
                            is secure. This privacy policy describes how we collect, use, and protect your information.
                            <br></br>
                            1. Information Collected<br></br>
                            ○ Personal Information: We collect personal information that you provide to us when registering 
                            on our application, such as your name, email address, phone number, and payment details.
                            <br></br>
                            ○ Usage Information: We collect information about your use of the application, such as location, 
                            requested services, and preferences.
                            <br></br>
                            ○ Device Information: We collect information about the device you use to access our application, 
                            including device type, operating system, and IP address.
                            <br></br>
                            2. Use of Information<br></br>
                            ○ We use your personal information to provide our services, including connecting you with mechanic 
                            service providers and managing payments.
                            <br></br>
                            ○ We use usage and device information to improve our application, personalize your experience, and 
                            perform performance analyses.
                            <br></br>
                            3. Password Security<br></br>
                            ○ User passwords are encrypted using advanced encryption methods. Only the user knows their password.
                             We do not store passwords in plain text.
                             <br></br>
                            ○ We use Stripe to process payments. Stripe securely stores and handles payment
                            information.
                            <br></br>
                            ○ In case of a forgotten password, we provide a secure process to reset it.
                            <br></br>
                            4. Credit Card Handling<br></br>
                            ○ We use Stripe to process payments. Stripe securely handles and stores all credit card information.
                            <br></br>
                            ○ We do not store sensitive credit card information on our servers. Payment details are managed by 
                            Stripe in accordance with their strict security protocols.
                            <br></br>
                            5.Information Sharing<br></br>
                            ○ We do not share your personal information with third parties except when necessary to provide our 
                            services, comply with legal obligations, or with your consent.
                            <br></br>
                            ○ We share information with mechanic service providers only when necessary to complete a service request.
                            <br></br>
                            6. User Rights<br></br>
                            ○ You have the right to access, update, and delete your personal information stored in our application.
                            <br></br>
                            ○ You can request the deletion of your account and all your personal data by sending us a request through 
                            our customer service.
                            <br></br>
                            7. Changes to the Privacy Policy<br></br>
                            ○ We reserve the right to modify this privacy policy at any time. We will notify users of any significant
                             changes through the application or by email.
                             <br></br>
                            ○ Continuing to use our application after changes have been posted signifies your acceptance of the changes.
                            <br></br>
                            8. Contact<br></br>
                            ○ If you have any questions or concerns about our privacy policy, please contact us through our customer service at theonezolve@hotmail.com.</p>
                        <button onClick={() => {
                            setTermsAccepted(true);
                            setPrivacyModalOpen(false);
                        }}>
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}