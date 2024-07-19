import { useUserDetails } from "../../shared/hooks";

import carro from '../../assets/home/coche.png'
import grua from '../../assets/home/camion-de-remolque.png'
import pc from '../../assets/home/computadora.png'
import phone from '../../assets/home/marketing.png'
import { useNavigate } from "react-router-dom";

const ImgPreview = ({ src, height, alt }) => {
    const defaultImageUrl =
        "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";

    const img = src ? src : defaultImageUrl;

    return (
        <div className="image" style={{ height }}>
            <img
                src={img}
                className="img-home"
                alt={alt}
                style={{ objectFit: "cover" }}
            />
        </div>
    );
};


const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 11) {
        return "Good Morning";
    } else if (hours >= 11 && hours < 13) {
        return "Good Midday";
    } else if (hours >= 13 && hours < 18) {
        return "Good Afternoon";
    } else if (hours >= 18 && hours < 22) {
        return "Good Evening";
    } else if (hours >= 22 || hours < 1) {
        return "Good Night";
    } else {
        return "Good Midnight";
    }
};

export const Home = () => {
    const { isLogged, user } = useUserDetails();

    const navigate = useNavigate();

    const handleUserTypeSelection = (userType) => {
        if (userType === "me") {
          navigate("/you");
        } else {
          navigate("/someone");
        }
      };


    return (
        <div className="home-container">
            {!isLogged ? (
                <div>
                    <div className="container-no-login">

                        <section id="about" className="section">
                            <div className="text">
                                <h2>Vehicle emergency?</h2>
                                <p>Request a zolve, receive assistance quickly and be on your way</p>
                            </div>
                            <ImgPreview src={grua} alt="Emergencia vehicular" height="%100" />
                        </section>

                        <section id="services" className="section">
                            <div className="text">
                                <h2>Drive without worries</h2>
                                <p>Create peace of mind in your own time with our automotive assistance services. You can rest assured that you will always have help on hand, whether you use your own car or a rental vehicle.</p>
                            </div>
                            <ImgPreview src={carro} alt="Servicios automotrices" height="%100" />
                        </section>

                        <section id="how-it-works" className="section">
                            <div className="text">
                                <h2>How does it work</h2>
                                <p>We developed a mobile application to request quick automotive assistance in emergencies, regardless of the user's location or insurance. We partner with local automotive service businesses to guarantee efficient responses and strengthen the business community</p>
                            </div>
                            <ImgPreview src={phone} alt="Cómo funciona la aplicación" height="%100" />
                        </section>

                        <section id="contact" className="section">
                            <div className="mails">
                                <h2>Contact</h2>
                                <p>For more information, contact us at:</p>
                                <ul>
                                    <li><i className="fa-solid fa-at"></i><a href="mailto:theonezolve@hotmail.com">Email</a></li>
                                    <li><i className="fa-brands fa-google"></i><a href="https://mail.google.com/mail/?view=cm&fs=1&to=theonezolve@hotmail.com" target="_blank">Gmail</a></li>
                                    <li><i className="fa-brands fa-microsoft"></i><a href="https://outlook.office.com/mail/deeplink/compose?to=theonezolve@hotmail.com" target="_blank">Outlook</a></li>
                                </ul>
                            </div>
                            <ImgPreview src={pc} alt="Contacto" height="%100" />
                        </section>

                    </div>
                    <footer>
                        <p>&copy; 2024 Zolve. Todos los derechos reservados.</p>
                    </footer>
                </div>
            ) : (
                <>
                    <div className="welcome">
                        <h1>{getGreeting()}, {user.user}</h1>
                    </div>
                    <h5 className="welcome-text">Ask for a zolve</h5>
                    <div className="btns">
                        <button className="btn-user zolve-btn" onClick={() => handleUserTypeSelection("me")}>
                            for me
                        </button>
                        <button className="btn-user zolve-btn" onClick={() => handleUserTypeSelection("someone")}>
                            for someone else
                        </button>
                    </div>
                </>
            )}
        </div >
    );
};